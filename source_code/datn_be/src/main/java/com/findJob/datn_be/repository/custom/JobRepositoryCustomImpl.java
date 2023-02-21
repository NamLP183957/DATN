package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.request.JobSearchRequest;
import com.findJob.datn_be.dto.response.JobResponse;
import com.findJob.datn_be.dto.response.JobTimeResponse;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JobRepositoryCustomImpl implements JobRepositoryCustom{
    private final EntityManager entityManager;

    @Override
    public List<JobResponse> getAllJob() {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOB_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("WHERE j.STATUS = 1;");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> getApplyingJob(Long studentId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOB_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("INNER JOIN applies a ON a.JOB_ID = j.ID \n");
        sql.append("WHERE j.STATUS = 1 AND a.STUDENTCVID =:STUDENT_ID AND a.STATUS =:STATUS");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("STUDENT_ID", studentId)
                .setParameter("STATUS", Constants.APPLYING)
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> getAppliedJob(Long studentId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOB_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("INNER JOIN applies a ON a.JOB_ID = j.ID \n");
        sql.append("WHERE j.STATUS = 1 AND a.STUDENTCVID =:STUDENT_ID AND a.STATUS =:STATUS");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("STUDENT_ID", studentId)
                .setParameter("STATUS", Constants.SUCCESS_APPLY)
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> getJobDetail(String jobCode, Long studentId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOV_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME, \n");
        sql.append("a.STATUS as APPLY_STATUS \n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("LEFT JOIN applies a ON j.ID = a.JOB_ID \n");
        sql.append("WHERE j.STATUS = 1 and j.JOB_CODE =:JOB_CODE and a.studentcvid =:STUDENTCVID");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("JOB_CODE", jobCode)
                .setParameter("STUDENTCVID", studentId)
                .getResultList();

        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                JobResponse jobResponse = getJobResponseFromObject(obj);
                // apply status
                if (obj[13] == null) {
                    jobResponse.setApplyStatus(Constants.NOT_APPLY_STUDENT);
                } else {
                    Integer applyStatus = Integer.parseInt(obj[13].toString());
                    if (applyStatus == Constants.APPLYING) {
                        jobResponse.setApplyStatus(Constants.APPLYIING_STUDENT);
                    } else {
                        jobResponse.setApplyStatus(Constants.APPLIED_STUDENT);
                    }
                }

                lstResponse.add(jobResponse);
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> getBusinessJobDetail(String jobCode) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOV_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME \n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID \n");
        sql.append("WHERE j.STATUS = 1 and j.JOB_CODE =:JOB_CODE ");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("JOB_CODE", jobCode)
                .getResultList();

        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                JobResponse jobResponse = getJobResponseFromObject(obj);

                lstResponse.add(jobResponse);
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> getAllJobWidthCondition(String condition) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("WHERE j.STATUS = 1 ");
        if (StringUtils.isNotEmpty(condition)) {
            sql.append(condition);
        }
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> getAllJobBelongBusiness(Long businessId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("WHERE j.STATUS = 1 AND j.BUSINESS_ID =:BUSINESS_ID");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("BUSINESS_ID", businessId)
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> searchJob(JobSearchRequest request) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOB_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("WHERE j.STATUS = 1 ");
        sql.append("AND bd.name IN (:BUSINESS_NAME) ");
        sql.append("AND jc.name IN (:JOB_CATEGORY)");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("BUSINESS_NAME", request.getLstBusinessName())
                .setParameter("JOB_CATEGORY", request.getLstCategoryName())
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
    }

    @Override
    public List<JobResponse> searchBusinessJob(JobSearchRequest request, Long businessId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT j.ID as JOB_ID, j.JOB_CODE, j.JOB_NAME,j.description, j.REQUIREMENT, j.WORK_ADDRESS,\n");
        sql.append("j.SALARY, j.STATUS, j.NOTE, j.RANGE_DAY, jc.ID as JOB_CATEGORY_ID, jc.NAME, bd.LOGO_FILE_NAME\n");
        sql.append( "FROM jobs j\n");
        sql.append("LEFT JOIN job_categories jc ON j.JOB_CATEGORY_ID = jc.ID\n");
        sql.append("LEFT JOIN business_descriptions bd ON bd.BUSINESS_ID = j.BUSINESS_ID\n");
        sql.append("WHERE j.STATUS = 1 ");
        sql.append("AND jc.name IN (:JOB_CATEGORY) ");
        sql.append("AND j.BUSINESS_ID =:BUSINESS_ID");
        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("JOB_CATEGORY", request.getLstCategoryName())
                .setParameter("BUSINESS_ID", businessId)
                .getResultList();
        List<JobResponse> lstResponse = new ArrayList<>();
        if (objs != null && objs.size() > 0){
            for (Object[] obj : objs) {
                lstResponse.add(getJobResponseFromObject(obj));
            }
        }
        return lstResponse;
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
}
