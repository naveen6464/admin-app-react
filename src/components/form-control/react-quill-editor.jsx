"use client";
import React, {useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const index = (props) => {
  const {
    value,
    onChange,
    className,
    onkeypress,
    onBlur,
    labelClass,
    labelName,
    QuillHeight,
    disabled,
    placeholder,
  } = props;

  const [style, setStyle] = useState("");

  useEffect(() => {
    var referenceLineElement = document.querySelector("line.ql-stroke");

    var polylineElement = document.querySelector("polyline.ql-stroke");
    var secondLineElement = document.querySelector("line.ql-stroke");

    var referenceStyle = referenceLineElement.getAttribute("style");
    setStyle(referenceStyle);

    polylineElement.setAttribute("style", referenceStyle);
    secondLineElement.setAttribute("style", referenceStyle);

    var lineElement = document.querySelector("line.ql-stroke");

    if (lineElement) {
      // Change the x1 and x2 attributes
      lineElement.setAttribute("x1", "-10");
      lineElement.setAttribute("x2", "20");
    } else {
      console.error('Element with class "ql-stroke" not found');
    }
  }, [style]);
  // const [customColor, setCustomColor] = useState("#2285f9");

  const EditorModules = {
    toolbar: [
      [{ font: [] }],
      ["custom-font-style-1", "custom-font-style-2"],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ color: ["#000","#F9F9F9","#2285f9","#22C376", "#FB6D1D"] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const EditorFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "custom-font-style-1",
    "custom-font-style-2",
  ];

  return (
    <div className={QuillHeight}>
      <label className={`${labelClass}`}>{labelName}</label>
      <ReactQuill
        value={value}
        onChange={onChange}
        className={className}
        onBlur={onBlur}
        onKeyPress={onkeypress}
        modules={EditorModules}
        formats={EditorFormats}
        disabled={disabled}
        placeholder={placeholder}
        readOnly={disabled}
      />
    </div>
  );
};

export default index;
