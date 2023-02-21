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
    @SequenceGenerator(name = "applies_id_seq", sequenceName = "applies_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;
    private Long studentCVId;
    private Long jobId;
    private Date startTime;
    private Date endTime;
    private Integer status; // 0: bi huy, 1: thanh cong, 2: dang cho duyet

    private Long appriciateId;

    public Apply(Long studentCVId, Long jobId, Date startTime, Integer status) {
        this.studentCVId = studentCVId;
        this.jobId = jobId;
        this.startTime = startTime;
        this.status = status;
    }
}
