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
}