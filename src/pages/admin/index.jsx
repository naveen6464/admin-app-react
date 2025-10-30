import React, { useEffect, useState } from "react";
import HeaderSection from "../../components/header-section";
import Input from "../../components/form-control/head-input/search-input";
import Table from "../../components/table";
import PaginateCount from "../../components/pagination/pagination-count";
import { getAdminUserList } from "../../api/list"; // To be created
import AdminUserInfo from "./admin-user-info"; // To be created
import Model from "../../components/model/index";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "./admin.css";
import { addAdminUserData } from "../../api/create"; // To be created
import PageLoader from "../../components/page-loader";
import { deleteAdminUserData } from "../../api/delete"; // To be created
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { updateAdminUserData } from "../../api/update"; // To be created
import { debounce } from "lodash";

function AdminUserTable() {
  const [loader, setLoader] = useState(false);
  const [adminUserData, setAdminUserData] = useState([]);
  const [adminUserLoader, setAdminUserLoader] = useState(false);
  const [adminUserIdData, setAdminUserIdData] = useState({});
  const [adminUserInfoDetails, setAdminUserInfoDetails] = useState(false);

  const [actionType, setActionType] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // pagination states
  const [totalRecords, setTotalRecords] = useState(0);
  const [noRecords, setNoRecords] = useState(0);
  const [lastDataId, setLastDataId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [firstDataId, setFirstDataId] = useState("");
  const [presentPage, setPresentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const fetchAdminUsers = (params) => {
    setLoader(true);
    getAdminUserList(params)
      .then((res) => {
        console.log(res,"534");
        
        const records = res?.detail?.data || [];
        setAdminUserData(Array.isArray(records) ? records : []);
        setTotalRecords(res?.data?.total_count || 0);
        setTotalPages(res?.data?.total_pages || 0);
        setNoRecords(res?.data?.no_records || 0);
        setLastDataId(res?.data?.lastDataId || "");
        setFirstDataId(res?.data?.firstDataId || "");
      })
      .catch((err) => {
        console.error("API Error:", err);
        toast.error("Failed to load admin users");
        setAdminUserData([]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchAdminUsers({ limit: pageLimit, page: presentPage, skip: 0 });
  }, []);

  const handleNextPage = () => {
    if (presentPage < totalPages) {
      setPresentPage((prevPage) => prevPage + 1);
      fetchAdminUsers({
        limit: pageLimit,
        lastKey: lastDataId,
        next: true,
        search: searchValue,
      });
    }
  };

  const handlePrevPage = () => {
    if (presentPage > 1) {
      setPresentPage((prevPage) => prevPage - 1);
      fetchAdminUsers({
        limit: pageLimit,
        lastKey: firstDataId,
        previous: true,
        search: searchValue,
      });
    }
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setPresentPage(1);
    fetchAdminUsers({ limit: newLimit, next: true, search: searchValue });
  };

  const handleSearchApi = debounce((value) => {
    setSearchValue(value);
    setPresentPage(1);
    fetchAdminUsers({ limit: pageLimit, next: true, search: value });
  }, 500);

  const data = Array.isArray(adminUserData) ? adminUserData.map((items) => items) : [];
console.log(data,"999");

  const adminUserDetailsInfo = async (row) => {
    setActionType("Edit");
    setAdminUserInfoDetails(true);
    setAdminUserLoader(true);
    setAdminUserIdData(row);
    setAdminUserLoader(false);
  };

  const adminUserDetailsInfoAdd = () => {
    setAdminUserIdData({});
    setActionType("Add");
    setAdminUserInfoDetails(true);
  };

  const deleteUserFunction = () => {
    setDeleteLoader(true);
    deleteAdminUserData(deleteData?.id)
      .then((res) => {
        if (res?.message === "success" || res?.message === "Success") {
          toast.success("Admin user deleted successfully");
          setDeleteData({});
          fetchAdminUsers({ limit: pageLimit, next: true });
        }
      })
      .finally(() => {
        setDeleteLoader(false);
        setDeleteModal(false);
      });
  };

  const openDeleteModal = (row) => {
    setDeleteModal(true);
    setDeleteData(row);
  };

  const backToTable = () => {
    setAdminUserInfoDetails(false);
  };

  const initialValues = {
    first_name: adminUserIdData.first_name || "",
    last_name: adminUserIdData.last_name || "",
    email: adminUserIdData.email || "",
    password: "", // Always empty for security
    status: adminUserIdData.status || "active",
  };

  const ErrorIcon = () => (
    <HiOutlineExclamationCircle className="error-icon-cms" />
  );
  const addErrorIcon = (message) => (
    <div className="d-flex ">
      <ErrorIcon />
      {message}
    </div>
  );

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password:
      actionType === "Add"
        ? Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
        : Yup.string().min(8, "Password must be at least 8 characters"),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = async (values) => {
    setBtnLoader(true);

    const payload = { ...values };
    if (actionType === "Edit" && !payload.password) {
      delete payload.password; // Don't send empty password on edit
    }

    if (actionType === "Add") {
      await addAdminUserData(payload)
        .then((res) => {
          if (res.message === "success" || res.message === "Success") {
            toast.success("Admin user created successfully");
            backToTable();
            fetchAdminUsers({ limit: pageLimit, next: true });
          }
        })
        .finally(() => setBtnLoader(false));
    }

    if (actionType === "Edit") {
      await updateAdminUserData(payload, adminUserIdData?.id)
        .then((res) => {
          if (res.message === "success" || res.message === "Success") {
            toast.success("Admin user updated successfully");
            backToTable();
            fetchAdminUsers({ limit: pageLimit, next: true });
          }
        })
        .finally(() => setBtnLoader(false));
    }

    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <div>
      <div>
        {!adminUserInfoDetails ? (
          <div>
            <HeaderSection title="Admin Users" />
            <div className="table-height">
              <Table
                HeaderBtn
                filterSpace={true}
                showFilter={false}
                SearchContents={
                  <div className="col-8">
                    <div className="col-6">
                      <Input
                        placeholder="Search by Name or Email..."
                        onChange={(e) => handleSearchApi(e.target.value)}
                      />
                    </div>
                  </div>
                }
                tableButtonFunction={adminUserDetailsInfoAdd}
                tableButtonText="Add New"
                loader={loader}
                data={data}
                columns={[
                  "First Name",
                  "Last Name",
                  "Email",
                  "Status",
                  "actions",
                ]}
                scopedSlots={{
                  "First Name": ({ row }) => (
                    <td className="text-capitalize align-middle">
                      {row?.first_name}
                    </td>
                  ),
                  "Last Name": ({ row }) => (
                    <td className="text-capitalize align-middle">
                      {row?.last_name}
                    </td>
                  ),
                  Email: ({ row }) => (
                    <td className="align-middle">{row?.email}</td>
                  ),
                  Status: ({ row }) => (
                    <td className="text-capitalize align-middle">
                      <span
                        className={`badge ${
                          row?.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {row?.status}
                      </span>
                    </td>
                  ),
                  actions: ({ row }) => (
                    <td className="align-middle">
                      <span>
                        <RiEdit2Fill
                          onClick={() => {
                            adminUserDetailsInfo(row);
                          }}
                          color="gray"
                          size={20}
                          className="cursor-pointer"
                        />
                        <MdDelete
                          onClick={() => {
                            openDeleteModal(row);
                          }}
                          size={20}
                          color="#e74a3b"
                          className="mx-3 cursor-pointer"
                        />
                      </span>
                    </td>
                  ),
                }}
                Clickable={false}
              />
            </div>
            <PaginateCount
              handleLimitChange={handleLimitChange}
              pageLimit={pageLimit}
              presentPage={presentPage}
              totalPages={totalPages}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              noRecords={noRecords}
              totalRecords={totalRecords}
            />
          </div>
        ) : (
          <div>
            {adminUserLoader ? (
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
              <AdminUserInfo
                backToTable={backToTable}
                adminUserIdData={adminUserIdData}
                formik={formik}
                addErrorIcon={addErrorIcon}
                btnLoader={btnLoader}
                actionType={actionType}
                statusOptions={statusOptions}
              />
            )}
          </div>
        )}
      </div>
      <Model
        buttonLoader={deleteLoader}
        title={"Delete Admin User"}
        handleHideModal={() => {
          setDeleteModal(false);
          setDeleteData({});
        }}
        show={deleteModal}
        OnClick={deleteUserFunction}
        ActionText="Delete"
        ActionBtnClass="delete-btn"
        disabled={deleteLoader}
      >
        <h5 className="text-center mt-4">
          Are you sure you want to delete this user?
          <b className="text-capitalize">
            {deleteData?.first_name} {deleteData?.last_name}
          </b>
          ?
        </h5>
      </Model>
    </div>
  );
}

export default AdminUserTable;
