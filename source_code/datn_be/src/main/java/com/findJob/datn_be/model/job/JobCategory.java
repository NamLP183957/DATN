package com.findJob.datn_be.model.job;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "job_categories")
public class JobCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_categories_id_seq")
    @SequenceGenerator(name = "job_categories_id_seq", sequenceName = "job_categories_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private String code;
    private String name;
    private Integer status;
}
