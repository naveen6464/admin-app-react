/** **************************** Import Packages ****************************** */
import React from "react";
import "./table.css";

function Table(props) {
  const {
    fields,
    customFileds,
    data,
    handleClick,
    preloader,
    onClickRow,
    padding,
    enableSaveBtn,
    className1,
    className2,
  } = props;
  const handleRecordClick = (e, item, index) => {
    e.stopPropagation();
    handleClick(item, index, item.id);
  };
  return (
    <div className={ `container-fluid mt-3 p-0` }>
      <div className={ `custom-table responsive-table ${className1} ` }>
        <table className={ `table ${className2}` }>
          <thead>
            <tr>
              {fields?.map((data1, index) => (
                <th
                  className={
                    data1 === "action" &&
                    data1 === "!email" &&
                    data1 === "!eventTitle"
                      ? " p-3 text-center"
                      : " p-4"
                  }
                  style={
                    data1 === "email"
                      ? { padding: { padding } }
                      : data1 === "eventTitle"
                      ? { paddingLeft: "10px", paddingRight: "10px" }
                      : {}
                  }
                  key={ index }
                >
                  {data1
                    ? data1
                        ?.toString()
                        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                        .replaceAll("_", " ")
                        .replace(/^\w/, (c) => c.toUpperCase())
                    : "--"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white cursor-pointer">
            {data?.length > 0 ? (
              data?.map((item, itemIndex) => (
                <tr
                  className={
                    onClickRow
                      ? "custom-table-content-row-click"
                      : "custom-table-content"
                  }
                  key={ itemIndex }
                  onClick={ (e) => {
                    // onClickRow ? onClickRow(data) : null;
                    handleRecordClick(e, item, itemIndex);
                  } }
                  style={ { cursor: enableSaveBtn === true ? "pointer" : "" } }
                >
                  {Array(fields.length)
                    ?.fill(1)
                    ?.map((tempData, dataIndex) =>
                      customFileds[fields?.[dataIndex]] ? (
                        <td
                          className={ `${
                            fields?.[dataIndex] === "action"
                              ? "px-4  text-center "
                              : "px-4 "
                          }` }
                          style={ {
                            cursor: enableSaveBtn === true ? "pointer" : "",
                          } }
                          key={ dataIndex }
                        >
                          {customFileds[`${fields?.[dataIndex]}`](
                            item,
                            itemIndex
                          )}
                        </td>
                      ) : (
                        <td className="p-1 pointer" key={ dataIndex }>
                          {item?.[`${fields?.[dataIndex]}`] || "-"}
                        </td>
                      )
                    )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={ fields?.length } className="border-none">
                  {preloader ? (
                    // <PreLoader />
                    ""
                  ) : (
                    <div className="text-center table-content-style">
                      <img
                        src={ "" }
                        width="650"
                        height="470"
                        className="mt-4"
                        alt="NoRecord"
                      />
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;