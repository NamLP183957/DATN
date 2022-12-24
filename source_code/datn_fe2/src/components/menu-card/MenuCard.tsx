import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { JobResponse } from '../../types/response/JobResponse'
import JobCardItem from '../job-card-item/JobCardItem'
import PaginationItem from '../pagination/Pagination'
import usePagination from '../pagination/usePagination'
import Spinner from '../spinner/Spinner'

type PropsType = {
    data: Array<JobResponse>
    loading: boolean
    itemsPerPage: number
    startFrom?: number
    searchByData: Array<{ label: string, value: string }>
}

const MenuCard: FC<PropsType> = ({ data, loading, itemsPerPage, startFrom, searchByData }) => {
    const {
        slicedData,
        pagination,
        prevPage,
        nextPage,
        changePage,
        setFilteredData,
        setSearching
    } = usePagination({ itemsPerPage, data, startFrom });

    return (
        <div className="container">
            <div className="container-fluid mt-3 ml-2">
                <div className="row">
                    <div className="col-md-6">
                        <PaginationItem
                            pagination={pagination}
                            prevPage={prevPage}
                            changePage={changePage}
                            nextPage={nextPage} />
                    </div>
                </div>

                {loading ? <Spinner /> :
                    <>
                        <div className="row">
                            {slicedData.map((job: JobResponse) => (
                                <JobCardItem
                                    job={job}
                                    colSize={3}
                                    link={"/job"}
                                    btnName="SHOW MORE"
                                    preUrl='student'
                                />
                            ))}
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default MenuCard