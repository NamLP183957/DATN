package com.findJob.datn_be.mapper;

import com.findJob.datn_be.dto.request.JobRequest;
import com.findJob.datn_be.dto.request.JobTimeRequest;
import com.findJob.datn_be.model.job.Job;
import com.findJob.datn_be.model.job.JobTime;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JobMappper {

    private final ModelMapper modelMapper;

    public void convertToEntity(Job jobDB, JobRequest jobRequest) {
        if (jobDB.getId() != null) {
            jobDB.setId(jobRequest.getId());
        }
        jobDB.setJobCode(jobRequest.getJobCode());
        jobDB.setDescription(jobRequest.getDescription());
        jobDB.setRequirement(jobRequest.getRequirement());
        jobDB.setWorkAddress(jobRequest.getWorkAddress());
        jobDB.setSalary(jobRequest.getSalary());
        jobDB.setStatus(jobRequest.getStatus());
        jobDB.setNote(jobRequest.getNote());
        jobDB.setRangeDay(jobRequest.getRangeDay());
        jobDB.setJobCategoryId(jobDB.getJobCategoryId());

    }

    public JobTime convertJobTimeToEntity(Long jobId, JobTimeRequest jobTimeRequest) {
        JobTime jobTime = modelMapper.map(jobTimeRequest, JobTime.class);
        jobTime.setJobId(jobId);
        return jobTime;
    }

    public List<JobTime> convertJobTimesToLstEntity(Long jobId, List<JobTimeRequest> jobTimeRequest) {
        return jobTimeRequest.stream()
                .map(req -> this.convertJobTimeToEntity(jobId, req))
                .collect(Collectors.toList());
    }
}
