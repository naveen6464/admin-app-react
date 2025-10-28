/** **************************** Import Libs ****************************** */
import React from "react";
/** **************************** Import CSS ****************************** */
import "./pagination.css";
/** **************************** Import Icons ****************************** */
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Pagination({
  data,
  pages,
  rowsPerPage,
  nextPage,
  currentPage,
  changeRowsPerPage,
  rowsPerPageOption,
  ...others
}) {
  let options = null;
  if (rowsPerPageOption) {
    options = rowsPerPageOption.map((data, index) => <option key={index} >{data}</option>);
  }
  const totalRecords = data?.length;
  // const indexOfLastData = currentPage * rowsPerPage;
  // const indexOfFirstData = indexOfLastData - rowsPerPage;
  // const currentTodos = data?.slice(indexOfFirstData, indexOfLastData);

  return (
    <div className="container-fluid d-flex justify-content-end mt-3">
      <div className="text-right style1" {...others}>
        <div>
          <div>
            <select
              id="role"
              className="inputFocus style mb-3"
              {...others}
              onChange={(e) => {
                changeRowsPerPage(e.target.value);
              }}
              value={rowsPerPage}
            >
              {options || (
                <>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </>
              )}
            </select>
          </div>
          <ul>
            <li className="currentPage">{currentPage}</li>
            <span>of</span>
            <li className="totalPage">{totalRecords}</li>
            <li
              className={currentPage > 1 ? "pagination ml-1" : "disabled ml-1"}
            >
              <span onClick={() => nextPage(currentPage - 1)} className="customSpan">
                <AiOutlineLeft />
              </span>
            </li>
            <li
              className={
                currentPage < pages ? "pagination ml-1" : "disabled ml-1"
              }
             
            >
              <span  onClick={() => nextPage(currentPage + 1)} className="customSpan">
                <AiOutlineRight />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
// default props
Pagination.defaultProps = {
  pages: 1,
  rowsPerPage: "10",
  nextPage: "1",
  currentPage: "1",
  changeRowsPerPage: "10",
};
