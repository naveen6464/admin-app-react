import React, { useEffect, useState } from "react";
import { HiArrowNarrowUp, HiOutlineArrowDown } from "react-icons/hi";
// import { MdOutlineInfo } from "react-icons/md";
import "./table.css";
import Button from "../button";
import { hostConfig } from "../../config";
import PageLoader from "../page-loader";
import { IoMdAdd } from "react-icons/io";
const DataTable = ({
  columns,
  data,
  scopedSlots,
  Clickable,
  rowClick,
  addClassName,
  columnClassNames,
  columnColSpans,
  response,
  editIndex,
  updateStock,
  showCheckbox,
  selectedRows,
  setSelectedRows,
  MultiSelect,
  ref,
  loader,
  addClassName1,
  addStyleName1,
  //
  HeaderBtn,
  filterSpace,
  showFilter,
  SearchContents,
  tableButtonFunction,
  tableButtonText,
  tableBtnClass,
  onEnter,
  onLeave,
  actionCenter,
  sort,
  columnValue,
  buttonAction,
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const sortedData =
    data?.length > 0
      ? data?.sort((a, b) => {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];

          if (sortDirection === "asc") {
            if (aValue === undefined || aValue === null) {
              return -1;
            }
            if (bValue === undefined || bValue === null) {
              return 1;
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
              return aValue - bValue;
            }
            return aValue
              .toString()
              .toLowerCase()
              .localeCompare(bValue.toString().toLowerCase(), undefined, {
                sensitivity: "base",
              });
          } else if (sortDirection === "desc") {
            if (aValue === undefined || aValue === null) {
              return 1;
            }
            if (bValue === undefined || bValue === null) {
              return -1;
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
              return bValue - aValue;
            }
            return bValue
              .toString()
              .toLowerCase()
              .localeCompare(aValue.toString().toLowerCase(), undefined, {
                sensitivity: "base",
              });
          }
          return 0;
        })
      : [];

  const handleSort = (column) => {
    let direction = "asc";
    if (column === sortColumn) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }
    setSortColumn(column);
    setSortDirection(direction);
    data?.length > 0 &&
      data.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (sortDirection === "asc") {
          if (aValue === undefined || aValue === null) {
            return -1;
          }
          if (bValue === undefined || bValue === null) {
            return 1;
          }
          if (typeof aValue === "number" && typeof bValue === "number") {
            return aValue - bValue;
          }
          return aValue
            .toString()
            .toLowerCase()
            .localeCompare(bValue.toString().toLowerCase(), undefined, {
              sensitivity: "base",
            });
        } else if (sortDirection === "desc") {
          if (aValue === undefined || aValue === null) {
            return 1;
          }
          if (bValue === undefined || bValue === null) {
            return -1;
          }
          if (typeof aValue === "number" && typeof bValue === "number") {
            return bValue - aValue;
          }
          return bValue
            .toString()
            .toLowerCase()
            .localeCompare(aValue.toString().toLowerCase(), undefined, {
              sensitivity: "base",
            });
        }
        return 0;
      });
  };

  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    // Update selectAll state when all rows are selected
    const allRowsSelected =
      (data ?? []).length > 0 &&
      (selectedRows ?? []).length === (data ?? []).length;
    setSelectAll(allRowsSelected);
  }, [selectedRows, data]);

  const toggleRowSelection = (row) => {
    if (selectedRows.includes(row)) {
      // row.stopPropagation();
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : (data ?? []).map((row) => row));
  };

  const isRowSelected = (row) => selectedRows.includes(row);
  const search = true;

  return (
    <div>
      {filterSpace === true ? (
        <div className="bg-white filter-space-box px-3 py-2">
          <div className="row">
            {search === true && SearchContents}
            {HeaderBtn && (
              <div
                className={`${
                  columnValue ? columnValue : "col-4"
                } d-flex justify-content-end`}
              >
                {sort}
                {buttonAction === "hide" ? null : (
                  <div>
                    <Button
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      btn_class={`${tableBtnClass}  table-button`}
                      onClick={tableButtonFunction}
                    >
                      <b>
                        {" "}
                        <span className="add-icon-btn">
                          {tableButtonText !== "Export" ? (
                            <IoMdAdd color="#fff" size="20px" />
                          ) : null}
                        </span>{" "}
                        {tableButtonText}
                      </b>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div
        style={addStyleName1}
        className={
          response
            ? `${addClassName1} table-responsive-2 p-0 `
            : `${addClassName1} table-responsive p-0 `
        }
      >
        <table
          ref={ref}
          className={`table table-bordered ${
            addClassName === "no-media-queries" ? "" : "responsive-media"
          } ${addClassName}`}
        >
          <thead>
            <tr className="header-fix">
              {showCheckbox && (
                <th key="checkbox" className="text-center px-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
              )}
              {columns.map((column, index) =>
                column === "Action" || column === "Actions" ? (
                  selectedRows.length > 0 ? (
                    <th
                      key={column}
                      style={{ fontWeight: "bold" }}
                      className={`text-cente position-relative p-0 ${
                        column === "Transaction ID/ Check No"
                          ? "text-center"
                          : ""
                      }
                                        ${
                                          columnClassNames?.length > 0
                                            ? columnClassNames?.[index]
                                            : ""
                                        }`}
                      colSpan={
                        columnColSpans?.length > 0 ? columnColSpans[index] : 1
                      }
                    >
                      <div style={{ marginBottom: "3px" }}>
                        <Button
                          btn_style={{
                            color: "#2285F9",
                            backgroundColor: "white",
                            border: "1px solid #2285F9",
                          }}
                          onClick={() => MultiSelect(index)}
                        >
                          &nbsp;Message
                        </Button>
                      </div>
                    </th>
                  ) : (
                    <th
                      key={column}
                      style={{ fontWeight: "bold" }}
                      className={`text-center position-relative px-4
                                        ${
                                          columnClassNames?.length > 0
                                            ? columnClassNames?.[index]
                                            : ""
                                        }`}
                      colSpan={
                        columnColSpans?.length > 0 ? columnColSpans[index] : 1
                      }
                    >
                      {column}
                      {/* <MdOutlineInfo size={20} />efefe */}
                    </th>
                  )
                ) : (
                  <th
                    style={{ fontWeight: "bold" }}
                    key={column}
                    onClick={() => {
                      showFilter === false ? null : handleSort(column);
                    }}
                    className={`text-cente position-relative px-4 
                                        ${
                                          columnClassNames?.length > 0
                                            ? columnClassNames?.[index]
                                            : ""
                                        }`}
                    colSpan={
                      columnColSpans?.length > 0 ? columnColSpans[index] : 1
                    }
                  >
                    <div
                      style={{
                        marginLeft:
                          actionCenter === "center" && column === "actions"
                            ? "38px"
                            : "",
                      }}
                      className={`d-flex ${
                        column === "Transaction ID/ Check No" ||
                        column === "Withdrawal Amount"
                          ? "justify-content-center"
                          : ""
                      }`}
                    >
                      <div className="d-inline">
                        {column}
                        {showFilter === false ? null : (
                          <span className="mr-2">
                            {sortColumn === column &&
                              sortDirection === "asc" && (
                                <HiArrowNarrowUp
                                  color="black"
                                  style={{
                                    // right: 0,
                                    top: "50%",

                                    transform: "translateY(-50%)",
                                    position: "absolute",
                                  }}
                                />
                              )}

                            {showFilter === false
                              ? null
                              : sortColumn === column &&
                                sortDirection === "desc" && (
                                  <HiOutlineArrowDown
                                    color="black"
                                    style={{
                                      // right: 0,
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      position: "absolute",
                                    }}
                                  />
                                )}

                            {showFilter === false
                              ? null
                              : sortColumn !== column && (
                                  <React.Fragment>
                                    <HiArrowNarrowUp
                                      color="gray"
                                      style={{
                                        // right: 0,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        position: "absolute",
                                      }}
                                    />
                                    <HiOutlineArrowDown
                                      color="gray"
                                      style={{
                                        // right: 0,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        position: "absolute",
                                      }}
                                    />
                                  </React.Fragment>
                                )}
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
            {loader ? (
              // <tr>
              <td colSpan={columns?.length} className="mt-5">
                {" "}
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <PageLoader />{" "}
                </div>
              </td>
            ) : // </tr>
            sortedData?.length > 0 ? (
              sortedData?.map((row, index) => (
                <>
                  <tr
                    key={row?.id}
                    style={{ cursor: Clickable ? "pointer" : "default" }}
                    onClick={
                      Clickable
                        ? (e) => {
                            e?.stopPropagation();
                            rowClick(row);
                          }
                        : null
                    }
                  >
                    {showCheckbox && (
                      <td
                        className="text-center px-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="text-centers"
                          checked={isRowSelected(row)}
                          onChange={(e) => {
                            e.stopPropagation(); // Add this line
                            toggleRowSelection(row);
                          }}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      return column === "Action" ||
                        scopedSlots[column]({ row, key: column, index }) ? (
                        scopedSlots[column]({ row, key: column, index })
                      ) : (
                        <td
                          className="px-3"
                          // role="none"
                          key={column}
                          onClick={
                            Clickable
                              ? (e) => {
                                  e.stopPropagation();
                                  rowClick(row, index);
                                }
                              : null
                          }
                        >
                          <div className="d-inline">
                            {" "}
                            {row[column.toLowerCase()]
                              ? row[column.toLowerCase()]
                              : row[column] || "NA"}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {editIndex === index ? updateStock : null}
                </>
              ))
            ) : sortedData?.length === 0 ? (
              // <tr className="border-none">
              <td colSpan="9">
                <div className="">
                  <div className="No_Records_Ctrl text-center"></div>
                  {/* <h2 className="text-center ">No Records Found</h2> */}
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={`${hostConfig.TRUEKARMA_S3_URL}images/no-records-found.webp`}
                      alt="No Records"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              </td>
            ) : // </tr>
            null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
