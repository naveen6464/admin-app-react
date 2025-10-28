import React from "react";
import "./pagination.css";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";

const PaginateCount = (props) => {

  const { pageLimit, handleLimitChange, presentPage, totalPages, handlePrevPage, handleNextPage, totalRecords, noRecords } = props;

  const PageArray10 = [10, 20, 50, 100, 200];
  return (
    <div className="">
      {totalRecords > 10 &&
        <div>
          <div style={{ float: "left", marginTop: "20px", color: "gray" }}>Showing records {" "}<span style={{ color: "#000" }}>{noRecords}</span>  out of {totalRecords}</div>
          <div className="Floating_corner ">
            <div className="d-flex pt-3">
              <div className="pagenation_text">per page</div>
              <div className="">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-lg-12 ">
                  <div className="show-list d-flex justify-content-xs-end justify-content-sm-end justify-content-md-end justify-content-lg-end justify-content-xl-end  ">
                    <p className="mdm-text mr-3 mb-0"></p>
                    <select
                      className="border-style"
                      onChange={(event) =>
                        handleLimitChange(event.target.value)
                      }
                      value={pageLimit}
                    >
                      {pageLimit === 9
                        ? PageArray10.map((page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        ))
                        : PageArray10.map((page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        ))}
                    </select>
                  
                      <div className="pages_border mx-2">
                        {" "}
                        <span className="Records_text">
                          {" "}
                          Page{" "}
                          <b style={{ color: "#000" }}>
                            {presentPage <= 0 ? 1 : presentPage}
                          </b>{" "}
                          of {totalPages}
                        </span>
                      </div>
                      <div className="arrows">
                        <button
                          className={
                            presentPage <= 1
                              ? "previous_arrow_disable"
                              : "previous_arrow"
                          }
                          disabled={presentPage <= 1}
                          onClick={handlePrevPage}
                        >
                          <span aria-hidden="true">
                            {" "}
                            <HiOutlineChevronLeft
                              style={{ position: "relative", top: "-1px" }}
                            />{" "}
                            Prev
                          </span>
                        </button>
                        <button
                          disabled={presentPage >= totalPages}
                          className={
                            presentPage >= totalPages
                              ? "next_arrow_disable"
                              : "next_arrow"
                          }
                          onClick={handleNextPage}
                        >
                          <span aria-hidden="true">
                            Next
                            <HiOutlineChevronRight
                              style={{ position: "relative", top: "-1px" }}
                            />
                          </span>
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default PaginateCount;
