import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { JobResponse } from "../../types/response/JobResponse";
import JobCardItem from "../job-card-item/JobCardItem";
import PaginationItem from "../pagination/Pagination";
import usePagination from "../pagination/usePagination";
import Spinner from "../spinner/Spinner";

type PropsType = {
  data: Array<JobResponse>;
  loading: boolean;
  itemsPerPage: number;
  startFrom?: number;
  searchByData: Array<{ label: string; value: string }>;
  link: string
};

const MenuCard: FC<PropsType> = ({
  data,
  loading,
  itemsPerPage,
  startFrom,
  searchByData,
  link
}) => {
  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    setFilteredData,
    setSearching,
  } = usePagination({ itemsPerPage, data, startFrom });
  return (
    <div className="container">
      <div className="container-fluid mt-12 ml-12">
        <div className="row">
          <div className="col-md-6">
            <PaginationItem
              pagination={pagination}
              prevPage={prevPage}
              changePage={changePage}
              nextPage={nextPage}
            />
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {data.map((job: JobResponse) => (
              <JobCardItem
                job={job}
                colSize={12}
                link={link}
                btnName="SHOW MORE"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
