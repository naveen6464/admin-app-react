import React, { useEffect, useState } from "react";
import "./dashboard.css";

import PageLoader from "../../components/page-loader";
import { breadCrumbAction } from "../../redux/action/breadcrumb.action";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {

    setLoader(false)
    // Breadcrumbs
    const tempBreadCrumb = [
      {
        title: "Dashboard",
        path: "/home/dashboard",
      },
    ];
    dispatch(breadCrumbAction(tempBreadCrumb));




  }, []);





  return (
    <div>
      {loader ? (
        <div
          style={{
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PageLoader />
        </div>
      ) : (
        <>
          <div>dashboard</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
