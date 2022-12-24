package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.response.ApplicantResponse;
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
}
