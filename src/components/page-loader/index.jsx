import React from "react";

const PageLoader = () => {
  const spinnerStyle = {
    width: "60px",
    height: "60px",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #0d6efd", // Bootstrap primary blue
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f8f9fa",
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>

      {/* Inline keyframes (invisible div to inject styles) */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;
