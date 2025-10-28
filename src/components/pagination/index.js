/** **************************** Import Libs ****************************** */
import React from "react";
/** **************************** Import CSS ****************************** */
import "./Pagination.css";

/** **************************** Import Icons ****************************** */
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Pagination({
  pages,
  nextPage,
  currentPage,
  changeRowsPerPage,
  rowsPerPage,
}) {
  return (
    <div
      className="text-right d-flex justify-content-end align-items-center mt-2"
      style={{
        position: "relative",
      }}
    >
      <form style={{}} className="inputFocus">
        <select
          id="role"
          onChange={(e) => {
            changeRowsPerPage(e.target.value);
          }}
          value={rowsPerPage}
        >
          <option value={10} >10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </form>
      <ul className="mb-0">
        <li className="currentPage">{currentPage}</li>
        <span>of</span>
        <li className="totalPage">{pages}</li>
        <li
          role="none"
          className={currentPage > 1 ? "pagination ml-1" : "disabled ml-1"}
          onClick={() => nextPage(currentPage - 1)}
        >
          <span className="customSpan">
            <AiOutlineLeft />
          </span>
        </li>
        &nbsp;&nbsp;
        <li
          role="none"
          className={currentPage < pages ? "pagination ml-1" : "disabled ml-1"}
          onClick={() => nextPage(currentPage + 1)}
        >
          <span className="customSpan">
            <AiOutlineRight />
          </span>
        </li>
      </ul>
    </div>
  );
}
