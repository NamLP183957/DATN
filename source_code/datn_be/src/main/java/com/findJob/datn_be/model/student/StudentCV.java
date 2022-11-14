package com.findJob.datn_be.model.student;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "student_cvs")
public class StudentCV {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_cvs_id_seq")
    @SequenceGenerator(name = "student_cvs_id_seq", sequenceName = "student_cvs_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    private String firstName;
    private String surName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String prize;
    private String certificate;
    // học vấn
    private String study;
    private String talent;
    private String weakness;
    private String hobby;
    private String avatarFileName;
    private String additional;

    private Long studentId;
}
