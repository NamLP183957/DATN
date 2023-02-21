import { JobTimeResponse } from "./JobTimeReponse"

export type JobResponse = {
    id: string,

    jobCode: string,
    jobName: string,
    description: string,
    requirement: string,
    workAddress: string,
    // Tính bằng VND
    salary: string,
    status: string,
    descFileName: string,
    note: string,

    // Tính bằng ngày
    rangeDay: string,
    jobCategoryId: string,
    businessId: string,

    jobCategoryName: string,
    businessLogoLink: string,

    applyStatus: number

    lstJobTime: JobTimeResponse[]
}