import { JobRequest } from "../../types/request/JobRequest";
import { JobResponse } from "../../types/response/JobResponse";
import { JobTimeRequest2 } from "../../types/request/JobTimeRequest2";
import { JobTimeResponse } from "../../types/response/JobTimeReponse";

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

        var lstJobTimeReq: JobTimeRequest2[] = [];
        // var startTimeHour;
        // var startTimeMin;
        // var endTimeHour;
        // var endTimeMin;
        if (jobResponse.lstJobTime) {
            for (var i = 2; i <= 6; i++) {
                var anJobTime: JobTimeResponse = {
                    id: "",
                    startTime: "",
                    endTime: "",
                    dayOfWeek: ""
                };
                var exist = false;
                for (var j = 0; j < jobResponse.lstJobTime.length; j++) {
                    if (jobResponse.lstJobTime[j].dayOfWeek == i.toString()) {
                        anJobTime = jobResponse.lstJobTime[j];
                        exist = true;
                    }
                }
                // jobResponse.lstJobTime.forEach(jobTime => {
                //     if (jobTime.dayOfWeek == i.toString()) {
                //         anJobTime = jobTime;
                //         exist = true;
                //     }
                // })
                // console.log("anJobTime: ", anJobTime);
                if (exist) {
                    lstJobTimeReq.push({
                        id: anJobTime.id,
                        startTimeHour: this.convertTimeStrToHour(anJobTime.startTime),
                        startTimeMin: this.convertTimeStrToMin(anJobTime.startTime),
                        endTimeHour: this.convertTimeStrToHour(anJobTime.endTime),
                        endTimeMin: this.convertTimeStrToMin(anJobTime.endTime),
                        dayOfWeek: i
                    })
                } else {
                    lstJobTimeReq.push({
                        id: "0",
                        startTimeHour: 0,
                        startTimeMin: 0,
                        endTimeHour: 0,
                        endTimeMin: 0,
                        dayOfWeek: i
                    })
                }
            }

            // jobResponse.lstJobTime.forEach(anJobTime => {
            //     for (var i = 2; i <= 6; i++) {
            //         if (i.toString() == anJobTime.dayOfWeek) {
            //             lstJobTimeReq.push({
            //                 startTimeHour: this.convertTimeStrToHour(anJobTime.startTime),
            //                 startTimeMin: this.convertTimeStrToMin(anJobTime.startTime),
            //                 endTimeHour: this.convertTimeStrToHour(anJobTime.endTime),
            //                 endTimeMin: this.convertTimeStrToMin(anJobTime.endTime),
            //                 dayOfWeek: i
            //             }) 
            //         } else {
            //             lstJobTimeReq.push({
            //                 startTimeHour: 0,
            //                 startTimeMin: 0,
            //                 endTimeHour: 0,
            //                 endTimeMin: 0,
            //                 dayOfWeek: i
            //             })
            //         }
            //     }
            // });
        }

        // console.log("lstJobTime: ", lstJobTimeReq);
        jobRequest.lstJobTimeReq = lstJobTimeReq;
        
        return jobRequest;
    }

    convertTimeStrToHour = (timeStr: string): number => {
        return parseInt(timeStr.substring(0, 2));
    }

    convertTimeStrToMin = (timeStr: string): number => {
        return parseInt(timeStr.substring(3, 5));
    }
}

export default new Mapper();

