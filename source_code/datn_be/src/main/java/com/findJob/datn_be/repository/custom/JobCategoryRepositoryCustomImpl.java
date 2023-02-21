package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.model.job.JobCategory;
import com.findJob.datn_be.service.JobCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JobCategoryRepositoryCustomImpl implements JobCategoryRepositoryCustom {
    private final EntityManager entityManager;

    @Override
    public List<JobCategory> getBusinessJobCategory(Long businessId) {
        List<JobCategory> lstJobCategory = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT * FROM job_categories\n");
        sql.append("WHERE id in \n");
        sql.append("(SELECT DISTINCT jc.id \n");
        sql.append("  FROM job_categories jc \n");
        sql.append("  LEFT JOIN jobs j ON j.job_category_id = jc.id \n");
        sql.append("  WHERE j.business_id =:BUSINESS_ID and jc.STATUS = 1 \n");
        sql.append(")");

        List<Object[]> lstObjs = entityManager.createNativeQuery(sql.toString())
                .setParameter("BUSINESS_ID", businessId)
                .getResultList();

        if (lstObjs != null && lstObjs.size() > 0) {
            for (Object[] obj : lstObjs) {
                JobCategory jc = new JobCategory();
                jc.setId(obj[0] == null ? 0 : Long.parseLong(obj[0].toString()));
                jc.setCode(obj[1] == null ? "" : obj[1].toString());
                jc.setName(obj[2] == null ? "" : obj[2].toString());
                jc.setStatus((obj[3] == null ? 1 : Integer.parseInt(obj[3].toString())));
                lstJobCategory.add(jc);
            }
        }

        return lstJobCategory;
    }
}
