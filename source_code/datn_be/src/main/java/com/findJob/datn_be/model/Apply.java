package com.findJob.datn_be.model;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "applies")
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "applies_id_seq")
    @SequenceGenerator(name = "job_times_id_seq", sequenceName = "applies_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private Long studentCVId;
    private Long jobId;
    private Date startTime;
    private Date endTime;
    private Integer status;

    private Long appriciateId;
}
