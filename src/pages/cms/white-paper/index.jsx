import React, { useEffect, useState } from "react";
import HeaderSection from "../../../components/header-section";
import Input from "../../../components/form-control/head-input/search-input";
import Table from "../../../components/table";
import PaginateCount from "../../../components/pagination/pagination-count";
import { getWhitePaperList } from "../../../api/list";
import WhitePaperInfo from "./white-paper-info";
import Model from "../../../components/model/index";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../cms.css";
import { addWhitepaperData } from "../../../api/create";
import PageLoader from "../../../components/page-loader";
import { deleteWhitePaperData } from "../../../api/delete";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { updateWhitePaperData } from "../../../api/update";
// import { uploadFileToS3 } from "../../../utils/files";
import { debounce } from "lodash";

function WhitePaperTable() {
  const [loader, setLoader] = useState(false);
  const [whitePaperData, setWhitePaperData] = useState([]);
  const [whitePaperLoader, setWhitePaperLoader] = useState(false);
  const [whitePaperIdData, setWhitePaperIdData] = useState({});
  const [whitePaperInfoDetails, setWhitePaperInfoDetails] = useState(false);

  const [actionType, setActionType] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // pagination states
  const [totalRecords, setTotalRecords] = useState("");
  const [noRecords, setNoRecords] = useState("");
  const [lastDataId, setLastDataId] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [firstDataId, setFirstDataId] = useState("");
  const [presentPage, setPresentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const [file, setFile] = useState(null);

  useEffect(() => {
    setLoader(true);
    getWhitePaperList({ limit: pageLimit, page: presentPage, skip: 0 }).then(
      (res) => {
        setLoader(false);
        setWhitePaperData(res?.detail?.data);
        setTotalRecords(res?.detail.total_count);
        setLastDataId(res?.data?.lastDataId);
        setFirstDataId(res?.data?.firstDataId);
        setTotalPages(res?.data?.total_page);
        setNoRecords(res?.data?.noRecords);
      }
    );
  }, []);

  const handleNextPage = () => {
    setLoader(true);
    getWhitePaperList({
      limit: pageLimit,
      lastKey: lastDataId,
      next: true,
      search: searchValue,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage + 1));
      }
      setWhitePaperData(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.filterTotalRecord);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handlePrevPage = () => {
    setLoader(true);
    getWhitePaperList({
      limit: pageLimit,
      lastKey: firstDataId,
      previous: true,
      search: searchValue,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage - 1));
      }
      setWhitePaperData(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.filterTotalRecord);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setPresentPage(1);
    setLoader(true);
    getWhitePaperList({
      limit: newLimit,
      next: true,
      search: searchValue,
    }).then((response) => {
      setWhitePaperData(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.filterTotalRecord);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handleSearchApi = debounce((value) => {
    setSearchValue(value);
    setLoader(true);
    getWhitePaperList({
      limit: pageLimit,
      next: true,
      search: value,
    }).then((response) => {
      setWhitePaperData(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.filterTotalRecord);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  }, 500);

  const data = whitePaperData?.map((items) => {
    return items;
  });

  const whitePaperDetailsInfo = async (row) => {
    setActionType("Edit");
    setWhitePaperInfoDetails(true);
    setWhitePaperLoader(true);
    setWhitePaperIdData(row);
    setFile(null);
    setWhitePaperLoader(false);
  };

  const whitePaperDetailsInfoAdd = () => {
    setWhitePaperIdData({});
    setActionType("Add");
    setWhitePaperInfoDetails(true);
    setFile(null);
  };

  const deleteWhitePaperFunction = () => {
    setDeleteLoader(true);
    deleteWhitePaperData(deleteData?.id).then((res) => {
      setDeleteLoader(false);
      setDeleteModal(false);
      if (res?.message === "success" || res?.message === "Success") {
        toast.success("White Paper deleted successfully");
        setDeleteData({});
        setLoader(true);
        getWhitePaperList({ limit: pageLimit, next: true }).then((res) => {
          setLoader(false);
          setWhitePaperData(res?.data?.records);
          setTotalRecords(res?.data.totalRecords);
          setLastDataId(res?.data?.lastDataId);
          setFirstDataId(res?.data?.firstDataId);
          setTotalPages(res?.data?.totalPages);
          setNoRecords(res?.data?.noRecords);
        });
      }
    });
  };

  const openDeleteModal = (row) => {
    setDeleteModal(true);
    setDeleteData(row);
  };

  const backToTable = () => {
    setWhitePaperInfoDetails(false);
  };

  const initialValues = {
    title: whitePaperIdData.title || "",
    author: whitePaperIdData.author || "",
    summary: whitePaperIdData.summary || "",
    file_url: whitePaperIdData.file_url || "",
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
    title: Yup.string().required("Whitepaper title is required"),
    author: Yup.string().required("Author name is required"),
    summary: Yup.string().required("Summary is required"),
    file_url: Yup.string().required("File is required"),
  });

  const onSubmit = async (values) => {
    console.log(values, actionType, "values");
    setBtnLoader(true);

    // let fileUrl = values.file_url;

    // if (file) {
    //   const fileName = `${Date.now()}_${file.name}`;
    //   fileUrl = await uploadFileToS3(file, "white-papers", fileName);
    //   values.file_url = fileUrl;
    // }
    //   const fileName = `${Date.now()}_${file.name}`;

    values.file_url = `${Date.now()}.pdf`;

    if (actionType === "Add") {
      await addWhitepaperData(values).then((res) => {
        console.log(res, "res");
        
        if (res.detail.success === true) {
          toast.success("White Paper created successfully");
        }
      });
    }
    if (actionType === "Edit") {
      await updateWhitePaperData(values, whitePaperIdData?.id).then((res) => {
        if (res.detail.success === true) {
          toast.success("White Paper updated successfully");
        }
      });
    }

    setBtnLoader(false);
    backToTable();
    formik.resetForm();
    setLoader(true);
    await getWhitePaperList({ limit: pageLimit, next: true }).then((res) => {
      setLoader(false);
      setWhitePaperData(res?.detail?.data);
        setTotalRecords(res?.detail.total_count);
        setLastDataId(res?.data?.lastDataId);
        setFirstDataId(res?.data?.firstDataId);
        setTotalPages(res?.data?.total_page);
        setNoRecords(res?.data?.noRecords);
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <div>
      {!whitePaperInfoDetails ? (
        <div>
          <HeaderSection title="White Papers" />
          <div className="table-height">
            <Table
              HeaderBtn
              filterSpace={true}
              showFilter={false}
              SearchContents={
                <div className="col-8">
                  <div className="col-6">
                    <Input
                      placeholder="Search by Title..."
                      onChange={(e) => handleSearchApi(e.target.value)}
                    />
                  </div>
                </div>
              }
              tableButtonFunction={whitePaperDetailsInfoAdd}
              tableButtonText="Add New"
              loader={loader}
              data={data}
              columns={["Title", "Author", "Created At", "actions"]}
              scopedSlots={{
                Title: ({ row }) => (
                  <td className="text-capitalize align-middle">
                    <div className="align-middle" title={row?.title}>
                      {row?.title?.length > 20
                        ? row?.title.slice(0, 20) + "..."
                        : row?.title}
                    </div>
                  </td>
                ),
                Author: ({ row }) => (
                  <td className="align-middle">
                    <span className="">
                      {row?.author?.length > 10
                        ? row?.author.slice(0, 10) + "..."
                        : row?.author}{" "}
                    </span>
                  </td>
                ),
                "Created At": ({ row }) => (
                  <td className="align-middle">
                    <span>
                      {new Date(row?.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>
                ),
                actions: ({ row }) => (
                  <td className="align-middle">
                    <span>
                      <RiEdit2Fill
                        onClick={() => whitePaperDetailsInfo(row)}
                        color="gray"
                        size={20}
                        className="cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => openDeleteModal(row)}
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
          {whitePaperLoader ? (
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
            <WhitePaperInfo
              backToTable={backToTable}
              formik={formik}
              addErrorIcon={addErrorIcon}
              btnLoader={btnLoader}
              actionType={actionType}
              whitePaperIdData={whitePaperIdData}
              file={file}
              setFile={setFile}
            />
          )}
        </div>
      )}
      <Model
        buttonLoader={deleteLoader}
        title={"Delete White Paper"}
        handleHideModal={() => {
          setDeleteModal(false);
          setDeleteData({});
        }}
        show={deleteModal}
        OnClick={deleteWhitePaperFunction}
        ActionText="Delete"
        ActionBtnClass="delete-btn"
        disabled={deleteLoader}
      >
        <h5 className="text-center mt-4">
          Are you sure you want to delete this{" "}
          <b className="text-capitalize">{deleteData?.title}</b> White Paper?
        </h5>
      </Model>
    </div>
  );
}

export default WhitePaperTable;
