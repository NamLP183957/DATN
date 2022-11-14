package com.findJob.datn_be.model.student;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "student_free_times")
public class StudentFreeTime {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_free_times_id_seq")
    @SequenceGenerator(name = "student_free_times_id_seq", sequenceName = "student_free_times_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    private Long studentId;
}