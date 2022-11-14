package com.findJob.datn_be.model;

import com.google.api.client.util.DateTime;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comments_id_seq")
    @SequenceGenerator(name = "comments_id_seq", sequenceName = "comments_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private Long studentId;
    private Long jobId;
    private String content;
    private DateTime time;
    private Integer status;
}
