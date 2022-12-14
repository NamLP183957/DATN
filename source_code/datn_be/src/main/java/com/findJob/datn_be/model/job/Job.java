package com.findJob.datn_be.model.job;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobs_id_seq")
    @SequenceGenerator(name = "jobs_id_seq", sequenceName = "jobs_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private String jobCode;
    private String jobName;
    private String description;
    private String requirement;
    private String workAddress;
    // Tính bằng VND
    private Integer salary;
    private Integer status;
    private String descFileName;
    private String note;

    // Tính bằng ngày
    private Integer rangeDay;
    private Long jobCategoryId;
    private Long businessId;
}
