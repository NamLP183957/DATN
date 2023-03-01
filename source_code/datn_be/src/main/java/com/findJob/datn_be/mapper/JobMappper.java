package com.findJob.datn_be.mapper;

import com.findJob.datn_be.dto.request.JobRequest;
import com.findJob.datn_be.dto.request.JobTimeRequest;
import com.findJob.datn_be.dto.request.JobTimeRequest2;
import com.findJob.datn_be.dto.response.JobResponse;
import com.findJob.datn_be.model.job.Job;
import com.findJob.datn_be.model.job.JobTime;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
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
        jobDB.setJobName(jobRequest.getJobName());
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

//    public List<JobTime> convertJobTimesToLstEntity(Long jobId, List<JobTimeRequest> jobTimeRequest) {
//        return jobTimeRequest.stream()
//                .map(req -> this.convertJobTimeToEntity(jobId, req))
//                .collect(Collectors.toList());
//    }

    public JobTime convertToJobTimeEntity(Long jobId, JobTimeRequest2 jobTimeRequest2) {
        LocalTime startTime = LocalTime.of(jobTimeRequest2.getStartTimeHour(), jobTimeRequest2.getStartTimeMin());
        LocalTime endTime = LocalTime.of(jobTimeRequest2.getEndTimeHour(), jobTimeRequest2.getEndTimeMin());
        return new JobTime(jobTimeRequest2.getId(), jobId, startTime, endTime, jobTimeRequest2.getDayOfWeek());
    }

    public void convertToJobTimeEntity(Long jobId, JobTime jobTimeDB, JobTimeRequest2 jobTimeRequest) {
        LocalTime startTime = LocalTime.of(jobTimeRequest.getStartTimeHour(), jobTimeRequest.getStartTimeMin());
        LocalTime endTime = LocalTime.of(jobTimeRequest.getEndTimeHour(), jobTimeRequest.getEndTimeMin());

        if (jobTimeRequest.getId() != null && jobTimeRequest.getId() != 0) {
            jobTimeDB.setId(jobTimeRequest.getId());
        }
        jobTimeDB.setStartTime(startTime);
        jobTimeDB.setEndTime(endTime);
        jobTimeDB.setJobId(jobId);
        jobTimeDB.setDayOfWeek(jobTimeRequest.getDayOfWeek());
    }

//    public List<JobTime> convertJobTimesToLstEntity(Long jobId, List<JobTimeRequest2> jobTimeRequest2s) {
//        return jobTimeRequest2s.stream()
//                .map(req -> this.convertToJobTimeEntity(jobId, req))
//                .collect(Collectors.toList());
//    }

    public JobResponse convertEntityToResponse(Job job, List<JobTime> lstJobTime) {
        JobResponse jobResponse = new JobResponse();
        jobResponse.setId(job.getId().toString());
        jobResponse.setJobCode(job.getJobCode());
        jobResponse.setJobName(job.getJobName());
        jobResponse.setDescription(job.getDescription());
        jobResponse.setRequirement(job.getRequirement());
        jobResponse.setWorkAddress(job.getWorkAddress());
        jobResponse.setSalary(jobResponse.getSalary());
        jobResponse.setStatus(jobResponse.getStatus());
        jobResponse.setDescFileName(job.getDescFileName());
        jobResponse.setNote(job.getNote());
        jobResponse.setRangeDay(job.getRangeDay().toString());
        jobResponse.setJobCategoryId(job.getJobCategoryId().toString());
        jobResponse.setBusinessId(job.getBusinessId().toString());
        return jobResponse;
    }
}
