import { JobRequest } from "../../types/request/JobRequest";
import { JobResponse } from "../../types/response/JobResponse";

class Mapper {
    convertToJobRequest = (jobResponse: Partial<JobResponse>): Partial<JobRequest> => {
        let jobRequest: Partial<JobRequest> = {};
        jobRequest.id = Number(jobResponse.id);
        jobRequest.jobCode = jobResponse.jobCode;
        jobRequest.jobName = jobResponse.jobName;
        jobRequest.description = jobResponse.description;
        jobRequest.requirement = jobResponse.requirement;
        jobRequest.workAddress = jobResponse.workAddress;
        jobRequest.salary = Number(jobResponse.salary);
        jobRequest.status = Number(jobResponse.status);
        jobRequest.note = jobResponse.note;
        jobRequest.rangeDay = Number(jobResponse.rangeDay);
        jobRequest.jobCategoryId = Number(jobResponse.jobCategoryId);
        jobRequest.businessId = Number(jobResponse.businessId);

        var lstJobTimeReq = [];
        var startTimeHour;
        var startTimeMin;
        var endTimeHour;
        var endTimeMin;
        if (jobResponse.lstJobTime) {
            jobResponse.lstJobTime.forEach(anJobTime => {
                
            });
        }
        
        return jobRequest;
    }
}

export default new Mapper();

