package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.response.BusinessDescriptionResponse;
import com.findJob.datn_be.model.Role;
import com.findJob.datn_be.model.business.BusinessDescription;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BusinessRepositoryCustomImpl implements BusinessRepositoryCustom{
    private final EntityManager entityManager;

    @Override
    public List<BusinessDescriptionResponse> getAllBusiness() {
        List<BusinessDescriptionResponse> lstBusiness = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT bd.* \n");
        sql.append("FROM user_accounts acc \n");
        sql.append("INNER JOIN user_role rol ON acc.id = rol.user_id \n");
        sql.append("INNER JOIN business_descriptions bd ON bd.business_id = acc.id \n");
        sql.append("WHERE rol.roles = :BUSINESS_ROLE");

        List<Object[]> objs = entityManager.createNativeQuery(sql.toString())
                .setParameter("BUSINESS_ROLE", Role.Business.toString())
                .getResultList();

        if (objs != null && objs.size() > 0) {
            for (Object[] obj : objs) {
                BusinessDescriptionResponse bd = new BusinessDescriptionResponse();
                bd.setId(obj[0] == null ? 0 : Long.parseLong(obj[0].toString()));
                bd.setBusinessId(obj[1] == null ? 0 : Long.parseLong(obj[1].toString()));
                bd.setDescription(obj[2] == null ? "" : obj[2].toString());
                bd.setLogoFileName(obj[3] == null ? "" : obj[3].toString());
                bd.setName(obj[4] == null ? "" : obj[4].toString());
                lstBusiness.add(bd);
            }
        }
        return lstBusiness;
    }
}
