package com.findJob.datn_be.model.business;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "business_descriptions")
public class BusinessDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "business_descriptions_id_seq")
    @SequenceGenerator(name = "business_descriptions_id_seq", sequenceName = "business_descriptions_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private String name;
    private String description;
    private String logoFileName;

    private Long businessId;
}
