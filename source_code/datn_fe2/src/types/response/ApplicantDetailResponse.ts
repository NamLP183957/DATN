import { JobResponse } from "./JobResponse"
import { StudentCV } from "./StudentCV"

export type ApplicantDetailResponse = {
    applyId: number,
    businessId: number,
    studentEmail: string,
    applyStatus: number,

    jobResponse: JobResponse,
    studentCV: StudentCV,
}