package com.findJob.datn_be.model.job;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "job_times")
public class JobTime {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_times_id_seq")
    @SequenceGenerator(name = "job_times_id_seq", sequenceName = "job_times_id_seq", initialValue = 4, allocationSize = 1)
    private Long id;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    private Integer dayOfWeek;

    private Long jobId;

    public JobTime() {

    }

    public JobTime(Long id, Long jobId, LocalTime startTime, LocalTime endTime, Integer dayOfWeek) {
        this.id = id;
        this.jobId = jobId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
    }
}
