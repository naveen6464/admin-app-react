import React, { useEffect, useState } from "react";
import HeaderSection from "../../../components/header-section";
import { getCategoryList, getCausesList } from "../../../api/list";
import Table from "../../../components/table";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Modals from "../../../components/model";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelectComponent from "../../../components/form-control/custom-select";
import InputField from "../../../components/form-control/input-elements/input";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import TextArea from "../../../components/form-control/input-elements/textarea";
import { addCauseData } from "../../../api/create";
import toast from "react-hot-toast";
import { updateCauseData } from "../../../api/update";
import "../settings.css";
import { deleteCauseData } from "../../../api/delete";
import Input from "../../../components/form-control/head-input/search-input";
import PaginateCount from "../../../components/pagination/pagination-count";

function CauseTable() {
  const [causeList, setCauseList] = useState([]);
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editDetails, setEditDetails] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Pagination States
  const [totalRecords, setTotalRecords] = useState("");
  const [noRecords, setNoRecords] = useState("");
  const [lastDataId, setLastDataId] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [firstDataId, setFirstDataId] = useState("");
  const [presentPage, setPresentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    setLoader(true);
    getCausesList({ limit: pageLimit, next: true }).then((res) => {
      setCauseList(res?.data?.records);
      setTotalRecords(res?.data?.totalRecords);
      setLastDataId(res?.data?.lastDataId);
      setFirstDataId(res?.data?.firstDataId);
      setTotalPages(res?.data?.totalPages);
      setLoader(false);
    });
    getCategoryList().then((res) => {
      setCategory(res?.data?.records);
    });
  }, []);

  const handleNextPage = () => {
    setLoader(true);
    getCausesList({
      limit: pageLimit,
      lastKey: lastDataId,
      next: true,
      search: searchValue,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage + 1));
      }
      setCauseList(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.totalRecords);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handlePrevPage = () => {
    setLoader(true);
    getCausesList({
      limit: pageLimit,
      lastKey: firstDataId,
      previous: true,
      search: searchValue,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage - 1));
      }
      setCauseList(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.totalRecords);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setPresentPage(1);
    setLoader(true);
    getCausesList({
      limit: newLimit,
      next: true,
      search: searchValue,
    }).then((response) => {
      setCauseList(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.totalRecords);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handleSearchApi = (search) => {
    setSearchValue(search);
    setLoader(true);
    getCausesList({
      limit: pageLimit,
      next: true,
      search: search,
    }).then((response) => {
      setCauseList(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.totalRecords);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const handleCategoryName = (value) => {
    const categoryIdName = category?.find((item) => item?.id === value);
    return categoryIdName?.categoryName;
  };
  const data = causeList?.map((item) => {
    return item;
  });

  // CATEGORY select

  const categoriesOption = category?.map((item) => {
    return {
      label: item?.categoryName,
      value: item?.id,
    };
  });
  const addValue = {
    label: "Select",
    value: "",
  };
  categoriesOption?.unshift(addValue);

  const handleAdd = () => {
    setEditDetails("");
    setShow(true);
    setModalType("Add");
  };

  const handleEdit = (row) => {
    setEditDetails(row);
    setModalType("Edit");
    setShow(true);
  };

  // Delete Model and Functionalities

  const handleDelete = (row) => {
    setEditDetails(row);
    setDeleteModal(true);
  };

  const deleteModalHide = () => {
    setEditDetails("");
    setDeleteModal(false);
  };

  const confirmDelete = async () => {
    setButtonLoader(true);
    await deleteCauseData(editDetails?.id).then((res) => {
      setButtonLoader(false);
      if (res?.message === "success" || res?.message === "Success") {
        toast.success("Cause deleted successfully");
        setEditDetails({});
        setDeleteModal(false);
      }
      setLoader(true);
      getCausesList({}).then((res) => {
        setCauseList(res?.data?.records);
        setLoader(false);
      });
    });
  };

  const InitialValues = {
    causeName: editDetails?.causeName || "",
    description: editDetails?.description || "",
    categoryId: editDetails?.categoryId || "",
    // updatedAt: Date.now(),
  };

  const ErrorIcon = () => <HiOutlineExclamationCircle className="error-icon" />;
  const addErrorIcon = (message) => (
    <div className="d-flex ">
      <ErrorIcon />
      {message}
    </div>
  );

  const alphabetValidate = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const isAlphabet = /^[A-Za-z]$/.test(keyValue);

    if (
      e.target.value.length === 0 &&
      keyValue === " " &&
      e.target.value[0] !== " "
    ) {
      e.preventDefault();
    } else if (
      isAlphabet ||
      (keyValue === " " && !e.target.value.endsWith(" "))
    ) {
      return;
    } else {
      e.preventDefault();
    }
  };
  const spaceValidate = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const inputValue = e.target.value + keyValue;

    if (inputValue.startsWith(" ")) {
      e.preventDefault();
    }
  };

  const ValidationSchema = Yup.object().shape({
    categoryId: Yup.string().required("Category is required"),
    causeName: Yup.string().required("Cause Name is required"),
    // description: Yup.string().required("Description is required"),
  });

  const onSubmit = async (values) => {
    setButtonLoader(true);
    if (modalType === "Add") {
      values.createdAt = Date.now();
      values.updatedAt = Date.now();
      await addCauseData(values).then((res) => {
        setButtonLoader(false);
        handleHideModal();
        if (res.message === "success" || res.message === "Success") {
          toast.success("Causes added successfully");
        }
      });
    }
    if (modalType === "Edit") {
      values.updatedAt = Date.now();
      values.createdAt = editDetails?.createdAt;
      await updateCauseData(values, editDetails?.id).then((res) => {
        setButtonLoader(false);
        handleHideModal();
        if (res.message === "success" || res.message === "Success") {
          toast.success("Causes edited successfully");
        }
      });
    }
    setLoader(true);
    await getCausesList({}).then((res) => {
      setCauseList(res?.data?.records);
      setLoader(false);
    });
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: ValidationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const handleHideModal = () => {
    setEditDetails("");
    setModalType("");
    setShow(false);
    formik.resetForm();
  };

  return (
    <div>
      <HeaderSection title="Causes" />
      <div>
        <Table
          HeaderBtn
          filterSpace={true}
          showFilter={false}
          SearchContents={
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <Input
                    onChange={(e) => handleSearchApi(e.target.value)}
                    placeholder="Search by Cause Name "
                  />
                </div>
              </div>
            </div>
          }
          tableButtonFunction={handleAdd}
          tableButtonText="Add New"
          loader={loader}
          columns={[
            "Cause Name",
            "Category",
            "Created At",
            "actions",
          ]}
          scopedSlots={{
            "Cause Name": ({ row }) => (
              <td className="mb-0 text-start">
                <span className="text-centers text-capitalize">
                  {" "}
                  {row?.causeName.length > 35
                    ? row?.causeName?.slice(0, 35) + "..."
                    : row?.causeName}
                </span>
              </td>
            ),
            Category: ({ row }) => (
              <td className="mb-0 text-start">
                <span className="text-centers text-capitalize">
                  {" "}
                  {handleCategoryName(
                    row?.categoryId ? row?.categoryId : "-"
                  )}{" "}
                </span>
              </td>
            ),
            "Created At": ({ row }) => (
              <td>
                <span>
                  {new Date(Number(row?.createdAt)).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}{" "}
                </span>
              </td>
            ),
            actions: ({ row }) => (
              <td className="mb-0 text-start">
                <span>
                  <RiEdit2Fill
                    onClick={() => {
                      handleEdit(row);
                    }}
                    color="gray"
                    size={20}
                    className="cursor-pointer"
                  />

                  <MdDelete
                    onClick={() => {
                      handleDelete(row);
                    }}
                    size={20}
                    color="#e74a3b"
                    className="mx-3 cursor-pointer"
                  />
                </span>
              </td>
            ),
          }}
          data={data}
          Clickable={false}
        />
        {loader ? null : (
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
        )}
      </div>
      <Modals
        title={modalType === "Add" ? "Add Cause" : "Edit Cause"}
        btn_class1="mx-3"
        show={show}
        handleHideModal={handleHideModal}
        OnClick={formik.handleSubmit}
        buttonLoader={buttonLoader}
        disabled={buttonLoader}
      >
        <form>
          <div className="row">
            <div className="col-6">
              <InputField
                name="causeName"
                type="text"
                placeholder="Enter Cause Name"
                labelName="Cause Name*"
                value={formik.values.causeName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyPress={alphabetValidate}
              />
              <div className="error-space">
                {formik.touched.causeName && formik.errors.causeName && (
                  <div className="error">
                    {addErrorIcon(formik.errors.causeName)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-6">
              <CustomSelectComponent
                name="categoryId"
                label="Category*"
                options={categoriesOption}
                form={formik}
                labelClass={"pb-1"}
              />
              <div className="error-space">
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <div className="error">
                    {addErrorIcon(formik.errors.categoryId)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <TextArea
                name="description"
                labelName="Description"
                value={formik.values.description}
                placeholder="Enter cause description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyPress={spaceValidate}
              />
            </div>
          </div>
        </form>
      </Modals>
      <Modals
        title={"Delete Cause"}
        show={deleteModal}
        handleHideModal={deleteModalHide}
        OnClick={confirmDelete}
        buttonLoader={buttonLoader}
        ActionText="Delete"
        ActionBtnClass="delete-btn"
      >
        <div className=" d-flex justify-content-center align-items-center">
          <div className="my-3 pt-3 fs-5">
            Are you sure want to delete this{" "}
            <b className="mx-1 d-inline">{editDetails?.causeName}</b> cause?
          </div>
        </div>
      </Modals>
    </div>
  );
}

export default CauseTable;
