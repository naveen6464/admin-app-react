import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Button from "../../components/button";
import ArrowDown from "../../assets/icons/contacts/arrow-down.svg";

function StatusFilter({
    appliedStatus,
    onApply,
    showFilterIcon,
    statusOptions = ["all", "partial", "redeem"],
}) {
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(appliedStatus);

    // Map status values to friendly labels
    const getLabel = (status) => status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <div className="position-relative d-inline-block">
            {showFilterIcon ? (
                <div
                    onClick={() => setDropDownVisible((prev) => !prev)}
                    style={{
                        cursor: "pointer",
                        border: "1px solid #c6c6c6",
                        backgroundColor: "#fff",
                        width: "36px",
                        height: "36px",
                    }}
                    className="p-2 rounded d-flex align-items-center justify-content-center position-relative"
                    aria-label="Filter status"
                    title="Filter status"
                >
                    <BiFilterAlt color="#000" size={20} />
                    {appliedStatus !== "all" && (
                        <div
                            className="position-absolute bg-danger rounded-circle"
                            style={{
                                top: "5px",
                                right: "5px",
                                width: "6px",
                                height: "6px",
                            }}
                        ></div>
                    )}
                </div>
            ) : (
                <div
                    className="d-flex justify-content-between align-items-center text-capitalize border border-secondary rounded px-2 py-1 bg-white text-secondary small"
                    style={{
                        width: "170px",
                        cursor: "pointer",
                    }}
                    onClick={() => setDropDownVisible((prev) => !prev)}
                >
                    {getLabel(selectedStatus)}
                    <img
                        src={ArrowDown}
                        alt="arrow icon"
                        width="16"
                        height="16"
                    />
                </div>
            )}

            {/* Dropdown panel */}
            {dropDownVisible && (
                <div
                    className="position-absolute bg-white rounded shadow border border-secondary mt-1"
                    style={{
                        width: "220px",
                        zIndex: 1050,
                        top: "100%",
                        right: 0,
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center px-3 py-2">
                        <div className="text-muted fw-medium small">Status</div>
                        <div
                            onClick={() => setSelectedStatus("all")}
                            className="text-danger fw-medium small"
                            style={{ cursor: "pointer" }}
                        >
                            Reset
                        </div>
                    </div>

                    {statusOptions.map((status) => (
                        <div className="form-check mx-3 my-1" key={status}>
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={selectedStatus === status}
                                onChange={() => setSelectedStatus(status)}
                                id={`status-${status}`}
                            />
                            <label
                                htmlFor={`status-${status}`}
                                className="form-check-label text-dark text-capitalize fw-medium"
                                style={{ cursor: "pointer" }}
                            >
                                {getLabel(status)}
                            </label>
                        </div>
                    ))}

                    <hr className="my-2" />
                    <div className="d-flex justify-content-end px-3 pb-2 gap-2">
                        <Button
                            btn_style={{
                                padding: "5px 12px",
                                backgroundColor: "#ffffff",
                                color: "#394E60",
                                border: "1px solid #DAE1E6",
                            }}
                            onClick={() => setDropDownVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            btn_style={{ padding: "5px 12px" }}
                            onClick={() => {
                                onApply(selectedStatus);
                                setDropDownVisible(false);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StatusFilter;
