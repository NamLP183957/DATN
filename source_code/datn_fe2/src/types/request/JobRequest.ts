import { JobTimeRequest2 } from "./JobTimeRequest2"

export type JobRequest = {
    id: number,
    jobCode: string,
    jobName: string,
    description: string,
    requirement: string,
    workAddress: string,
    // Tính bằng VND
    salary: number,
    status: number,
    note: string,

    // Tính bằng ngày
    rangeDay: number,
    jobCategoryId: number,
    businessId: number,

    lstJobTimeReq: JobTimeRequest2[]

    // monStartTimeHour: number,
    // monStartTimeMin: number,
    // monEndTimeHour: number,
    // monEndTimeMin: number,

    // tueStartTimeHour: number,
    // tueStartTimeMin: number,
    // tueEndTimeHour: number,
    // tueEndTimeMin: number,

    // wedStartTimeHour: number,
    // wedStartTimeMin: number,
    // wedEndTimeHour: number,
    // wedEndTimeMin: number,

    // thuStartTimeHour: number,
    // thuStartTimeMin: number,
    // thuEndTimeHour: number,
    // thuEndTimeMin: number,

    // friStartTimeHour: number,
    // friStartTimeMin: number,
    // friEndTimeHour: number,
    // friEndTimeMin: number,
}