package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.response.ApplicantDetailResponse;
import com.findJob.datn_be.dto.response.ApplicantResponse;
import com.findJob.datn_be.dto.response.JobResponse;
import com.findJob.datn_be.dto.response.JobTimeResponse;
import com.findJob.datn_be.model.student.StudentCV;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ApplyRepositoryCustomImpl implements ApplyRepositoryCustom{
    private final EntityManager entityManager;

    @Override
    public List<ApplicantResponse> getLstApplicant(Long businessId) {
        List<ApplicantResponse> lstApplicantResponse = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.JOB_CODE, j.JOB_NAME, stu.email\n");
        sql.append("    , apl.ID as apply_id, stu.ID as student_id, j.ID as job_id, bus.ID as business_id\n");
        sql.append("FROM applies apl\n");
        sql.append("LEFT JOIN user_accounts stu ON apl.STUDENTCVID = stu.ID\n");
        sql.append("LEFT JOIN jobs j ON apl.JOB_ID = j.ID\n");
        sql.append("LEFT JOIN user_accounts bus ON j.BUSINESS_ID = bus.ID\n");
        sql.append("WHERE apl.STATUS = 2 AND bus.ID =:BUSINESS_ID");

        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("BUSINESS_ID", businessId)
                .getResultList();
        if (objs != null && objs.size() > 0) {
            for (Object[] obj : objs) {
                ApplicantResponse applicantResponse = new ApplicantResponse();
                applicantResponse.setJobCode(obj[0] == null ? "" : obj[0].toString());
                applicantResponse.setJobName(obj[1] == null ? "" : obj[1].toString());
                applicantResponse.setEmail(obj[2] == null ? "" : obj[2].toString());
                applicantResponse.setApplyId(obj[3] == null ? 0 : Long.parseLong(obj[3].toString()));
                applicantResponse.setStudentId(obj[4] == null ? 0 : Long.parseLong(obj[4].toString()));
                applicantResponse.setJobId(obj[5] == null ? 0 : Long.parseLong(obj[5].toString()));
                applicantResponse.setBusinessId(obj[6] == null ? 0 : Long.parseLong(obj[6].toString()));
                lstApplicantResponse.add(applicantResponse);
            }
        }
        return lstApplicantResponse;
    }

    @Override
    public ApplicantDetailResponse getApplicantDetail(Long businessId, String jobCode, Long studentId) {
        List<ApplicantDetailResponse> lstDetail = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        // get Job info (index: 0 - 12)
        sql.append("SELECT j.ID as JOB_ID, j.JOB_CODE, j.JOB_NAME, j.DESCRIPTION, j.REQUIREMENT, j.WORK_ADDRESS, ");
        sql.append("    j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, j.JOB_CATEGORY_ID, jc.NAME as JOB_CATEGORY_NAME, bd.LOGO_FILE_NAME, ");
        // get Student info (index: 13-26)
        sql.append("    stu.EMAIL, stu_cv.ID, stu_cv.FIRST_NAME, stu_cv.SUR_NAME, stu_cv.LAST_NAME, stu_cv.PHONE_NUMBER, ");
        sql.append("    stu_cv.ADDRESS, stu_cv.PRIZE, stu_cv.CERTIFICATE, stu_cv.STUDY, stu_cv.TALENT, stu_cv.WEAKNESS, ");
        sql.append("    stu_cv.HOBBY, stu_cv.AVATAR_FILE_NAME, ");
        // get apply info (index: 27-29)
        sql.append("    apl.ID as APPLY_ID, bus.ID as BUSINESS_ID, apl.STATUS as APPLY_STATUS ");

//        sql.append("SELECT j.JOB_CODE, j.JOB_NAME, stu.email\n");
//        sql.append("    , apl.ID as apply_id, stu.ID as student_id, j.ID as job_id, bus.ID as business_id\n");
        sql.append("FROM applies apl\n");
        sql.append("LEFT JOIN user_accounts stu ON apl.STUDENTCVID = stu.ID\n");
        sql.append("LEFT JOIN student_cvs stu_cv on stu.id = stu_cv.STUDENT_ID \n");
        sql.append("LEFT JOIN jobs j ON apl.JOB_ID = j.ID\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID \n");
        sql.append("LEFT JOIN user_accounts bus ON j.BUSINESS_ID = bus.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bus.ID = bd.BUSINESS_ID \n");
        sql.append("WHERE bus.ID =:BUSINESS_ID \n");
        sql.append(" AND stu.ID =:STUDENT_ID \n");
        sql.append(" AND j.JOB_CODE =:JOB_CODE");

        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("BUSINESS_ID", businessId)
                .setParameter("STUDENT_ID", studentId)
                .setParameter("JOB_CODE", jobCode)
                .getResultList();

        for (Object[] obj : objs) {
            ApplicantDetailResponse detailResponse = new ApplicantDetailResponse();
            detailResponse.setApplyId(obj[27] == null ? 0 : Long.parseLong(obj[27].toString()));
            detailResponse.setBusinessId(obj[28] == null ? 0 : Long.parseLong(obj[28].toString()));
            detailResponse.setStudentEmail(obj[13] == null ? "" : obj[13].toString());
            detailResponse.setApplyStatus(obj[29] == null ? 0 : Integer.parseInt(obj[29].toString()));
            detailResponse.setJobResponse(getJobResponseFromObject(obj));
            detailResponse.setStudentCV(getStudentCVFromObject(obj));
            lstDetail.add(detailResponse);
        }

        return lstDetail.get(0);
    }

    private JobResponse getJobResponseFromObject(Object[] obj) {
        JobResponse jobResponse = new JobResponse();
        jobResponse.setId(obj[0] == null ? "" : obj[0].toString());
        jobResponse.setJobCode(obj[1] == null ? "" : obj[1].toString());
        jobResponse.setJobName(obj[2] == null ? "" : obj[2].toString());
        jobResponse.setDescription(obj[3] == null ? "" : obj[3].toString());
        jobResponse.setRequirement(obj[4] == null ? "" : obj[4].toString());
        jobResponse.setWorkAddress(obj[5] == null ? "" : obj[5].toString());
        jobResponse.setSalary(obj[6] == null ? "" : obj[6].toString());
        jobResponse.setStatus(obj[7] == null ? "" : obj[7].toString());
        jobResponse.setNote(obj[8] == null ? "" : obj[8].toString());
        jobResponse.setRangeDay(obj[9] == null ? "" : obj[9].toString());
        jobResponse.setJobCategoryId(obj[10] == null ? "" : obj[10].toString());
        jobResponse.setJobCategoryName(obj[11] == null ? "" : obj[11].toString());
        jobResponse.setBusinessLogoLink(obj[12] == null ? "" : obj[12].toString());

        StringBuilder sql = new StringBuilder();
        if (obj[0] != null) {
            sql.append("SELECT jt.ID, jt.START_TIME, jt.END_TIME, jt.DAY_OF_WEEK FROM job_times jt WHERE jt.JOB_ID =:ID");
            List<Object[]> lstTimeObj = entityManager.createNativeQuery(sql.toString())
                    .setParameter("ID", Long.parseLong(obj[0].toString()))
                    .getResultList();
            List<JobTimeResponse> lstJobTime = new ArrayList<>();
            if (lstTimeObj != null && lstTimeObj.size() > 0) {
                for (Object[] timeObj : lstTimeObj) {
                    JobTimeResponse jobTimeResponse = new JobTimeResponse();
                    jobTimeResponse.setId(timeObj[0] == null ? "" : timeObj[0].toString());
                    jobTimeResponse.setStartTime(timeObj[1] == null ? "" : timeObj[1].toString());
                    jobTimeResponse.setEndTime(timeObj[2] == null ? "" : timeObj[2].toString());
                    jobTimeResponse.setDayOfWeek(timeObj[3] == null ? "" : timeObj[3].toString());
                    lstJobTime.add(jobTimeResponse);
                }
            }
            jobResponse.setLstJobTime(lstJobTime);
        }
        return jobResponse;
    }

    private StudentCV getStudentCVFromObject(Object[] obj) {
        StudentCV studentCV = new StudentCV();
        studentCV.setId(obj[14] == null ? 0 : Long.parseLong(obj[14].toString()));
        studentCV.setFirstName(obj[15] == null ? "" : obj[15].toString());
        studentCV.setSurName(obj[16] == null ? "" : obj[16].toString());
        studentCV.setLastName(obj[17] == null ? "" : obj[17].toString());
        studentCV.setPhoneNumber(obj[18] == null ? "" : obj[18].toString());
        studentCV.setAddress(obj[19] == null ? "" : obj[19].toString());
        studentCV.setPrize(obj[20] == null ? "" : obj[20].toString());
        studentCV.setCertificate(obj[21] == null ? "" : obj[21].toString());
        studentCV.setStudy(obj[22] == null ? "" : obj[22].toString());
        studentCV.setTalent(obj[23] == null ? "" : obj[23].toString());
        studentCV.setWeakness(obj[24] == null ? "" : obj[24].toString());
        studentCV.setHobby(obj[25] == null ? "" : obj[25].toString());
        studentCV.setAvatarFileName(obj[26] == null ? "" : obj[26].toString());
        return studentCV;
    }
}
