package com.findJob.datn_be.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "appriciates")
public class Appriciate {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "appriciates_id_seq")
    @SequenceGenerator(name = "appriciates_id_seq", sequenceName = "appriciates_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private Long applyId;
    private String content;
    private Double rate;
    private String fileName;

    public Appriciate(Long applyId, String content, Double rate, String fileName) {
        this.applyId = applyId;
        this.content = content;
        this.rate = rate;
        this.fileName = fileName;
    }
}
