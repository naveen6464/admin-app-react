"use client";
import React from "react";
import "./header-section.css";

function HeaderSection(props) {
  const {
    title,
    content,
    end,
    contentClass,
    headingClass,
    ClassContent,
    sections1,
    sections2,
    sections3,
    tab,
    setTab,
    columns,
  } = props;
  return (
    <div className={`header-section`} style={{ paddingBottom: "52px" }}>
      <div className="row ">
        <div className={`col-8 d-flex align-items-center ${headingClass}`}>
          <div className="header-title">{title}</div>
        </div>
        <div
          className={`col-6 align-items-center  ${ClassContent} ${
            contentClass ? "" : "d-flex"
          } justify-content-center`}
        >
          {content}
        </div>
        <div className=" d-flex justify-content-end">{end}</div>
      </div>
      {/* Sub Sections */}
      {sections1 && (
        <div>
          <div className="row pt-3 sub-section cursor-pointer">
            {sections1 && (
              <div className={columns === "sm" ? "col-1" : "col-3"}>
                <div onClick={() => setTab(1)}>
                  <p
                    className={`d-inline  ${
                      tab === 1 ? "active-tab" : "inactive-tab"
                    }`}
                  >
                    {sections1}
                  </p>
                </div>
              </div>
            )}

            {sections2 && (
              <div className={"col-3"}>
                <div onClick={() => setTab(2)}>
                  <p
                    className={`d-inline cursor-pointer  ${
                      tab === 2 ? "active-tab" : "inactive-tab"
                    }`}
                  >
                    {sections2}
                  </p>
                </div>
              </div>
            )}

            {sections3 && (
              <div className="col-3">
                <div onClick={() => setTab(3)}>
                  <p
                    className={`d-inline cursor-pointer ${
                      tab === 3 ? "active-tab" : "inactive-tab"
                    }`}
                  >
                    {sections3}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="border-line mb-2"></div>
        </div>
      )}
    </div>
  );
}

export default HeaderSection;
