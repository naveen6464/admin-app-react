import React, { useEffect, useState } from "react";
import HeaderSection from "../../../components/header-section";
import Input from "../../../components/form-control/head-input/search-input";
import InputField from "../../../components/form-control/input-elements/input";
import Table from "../../../components/table";
import PaginateCount from "../../../components/pagination/pagination-count";
import { getCategoryList } from "../../../api/list";
import Model from "../../../components/model/index";
import { MdDelete } from "react-icons/md";
import { deleteCategoryData } from "../../../api/delete";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import TextArea from "../../../components/form-control/input-elements/textarea";
import { addCategoryData } from "../../../api/create";
import "../settings.css";
import { RiEdit2Fill } from "react-icons/ri";
import { updateCategoryData } from "../../../api/update";
import { debounce } from "lodash";

function Categories() {
  const [loader, setLoader] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(false);
  // New category
  const [addNewModal, setAddNewModal] = useState(false);
  const [editNewModal, setEditModal] = useState(false);
  const [editNewData, setEditData] = useState({});
  // pagination states
  const [totalRecords, setTotalRecords] = useState("");
  const [noRecords, setNoRecords] = useState("");
  const [lastDataId, setLastDataId] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [firstDataId, setFirstDataId] = useState("");
  const [presentPage, setPresentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [editBtnLoader, setEditBtnLoader] = useState(false);

  const getCategoryListData = () => {
    setLoader(true);
    getCategoryList({ limit: pageLimit, next: true }).then((res) => {
      setLoader(false);
      setCategoryData(res?.data?.records);
      setTotalRecords(res?.data.filterTotalRecord);
      setLastDataId(res?.data?.lastDataId);
      setFirstDataId(res?.data?.firstDataId);
      setTotalPages(res?.data?.totalPages);
      setNoRecords(res?.data?.noRecords);
    });
  };

  useEffect(() => {
    getCategoryListData();
  }, []);

  const handleNextPage = () => {
    setLoader(true);

    getCategoryList({ limit: pageLimit, lastKey: lastDataId, next: true }).then(
      (response) => {
        if (response.message === "success" || response.message === "Success") {
          setPresentPage((prevPage) => Math.min(prevPage + 1));
        }
        setLoader(false);
        setCategoryData(response?.data?.records);
        setLastDataId(response?.data?.lastDataId);
        setFirstDataId(response?.data?.firstDataId);
        setTotalPages(response?.data?.totalPages);
        setTotalRecords(response?.data.filterTotalRecord);
        setNoRecords(response?.data?.noRecords);
        setLoader(false);
      }
    );
  };

  const handlePrevPage = () => {
    setLoader(true);

    getCategoryList({
      limit: pageLimit,
      lastKey: firstDataId,
      previous: true,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage - 1));
      }
      setCategoryData(response?.data?.records);
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
    setPresentPage(1)
    setLoader(true);

    getCategoryList({ limit: newLimit, next: true }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage - 1));
      }
      setCategoryData(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.filterTotalRecord);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  };

  const data = categoryData?.map((items) => {
    return items;
  });

  const handleSearchApi = debounce((value) => {
    const trimmedValue = value.trim(); // Remove initial and trailing spaces
    // const search = trimmedValue.toLowerCase();
    // setEventSearch(trimmedValue);
    setLoader(true);
    getCategoryList({
      limit: pageLimit,
      next: true,
      search: trimmedValue,
    }).then((response) => {
      setCategoryData(response?.data?.records);
      setTotalRecords(response?.data.filterTotalRecord);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  }, 300);

  // const handleSearchApi = (value) => {
  //   setLoader(true);
  //   getCategoryList({
  //     limit: pageLimit,
  //     next: true,
  //     search: value,
  //   }).then((response) => {
  //     setCategoryData(response?.data?.records);
  //     setTotalRecords(response?.data.totalRecords);
  //     setLastDataId(response?.data?.lastDataId);
  //     setFirstDataId(response?.data?.firstDataId);
  //     setTotalPages(response?.data?.totalPages);
  //     setNoRecords(response?.data?.noRecords);
  //     setLoader(false);
  //   });
  // };

  const DeleteUserFunction = () => {
    setDeleteLoader(true);

    deleteCategoryData(deleteData?.id).then((res) => {
      setDeleteLoader(false);
      setDeleteModal(false);
      if (res?.message === "success" || res?.message === "Success") {
        toast.success("Category deleted successfully");
        setDeleteData({});
        setLoader(true);
        getCategoryListData();
      }
    });
  };

  const initialValues = {
    categoryName: editNewData.categoryName || "",
    description: editNewData.description || "",
  };

  const ErrorIcon = () => <HiOutlineExclamationCircle className="error-icon" />;

  const ValidationSchema = Yup.object().shape({
    categoryName: Yup.string().required(
      <span>
        <ErrorIcon /> Category name is required
      </span>
    ),
  });
  const spaceValidate = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const inputValue = e.target.value + keyValue;

    if (inputValue.startsWith(" ")) {
      e.preventDefault();
    }
  };

  const onSubmit = (values) => {
    let firstLetterCaps =
      values.categoryName.charAt(0).toUpperCase() +
      values.categoryName.slice(1);
    values.categoryName = firstLetterCaps;
    if (!editNewModal) {
      setBtnLoader(true);
      addCategoryData(values).then((response) => {
        setBtnLoader(false);
        if (response?.message === "Success" || response?.status === "success") {
          toast.success("Category added successfully");
          setEditModal(false);
          setAddNewModal(false);
          getCategoryListData();
        }else {
          toast.error(response?.message);
        }
      });
    } else {
      setEditBtnLoader(true);
      updateCategoryData(values, editNewData.id).then((response) => {
        setEditBtnLoader(false);
        if (response?.message === "Success" || response?.message === "success") {
          toast.success("Category updated successfully");
          setEditModal(false);
          getCategoryListData();
        }else {
          toast.error(response?.message);
        }
      });
    }
  };

  const Formik1 = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });
  const OpenDeleteModal = (row) => {
    setDeleteModal(true);

    setDeleteData(row);
  };

  const CategoryInfo = async (row) => {
    setEditData(row);
    setEditModal(true);
    setCategoryInfo(true);
  };

  return (
    <div>
      <div>
        <div>
          <HeaderSection title="Categories" />
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
                      placeholder="Search by Category Name"
                    />
                  </div>
                </div>
              </div>
            }
            tableButtonFunction={() => {
              setAddNewModal(true);
            }}
            tableButtonText="Add New"
            loader={loader}
            data={data}
            columns={["Category", "Description", "Created At", "actions"]}
            scopedSlots={{
              Category: ({ row }) => <td>{row?.categoryName || "-"}</td>,
              Description: ({ row }) => (
                <td>
                  {row?.description?.length > 20
                    ? row?.description.slice(0, 20) + "..."
                    : row?.description}
                </td>
              ),
              "Created At": ({ row }) => (
                <td>
                  <span>
                    {new Date(row.createdAt).toLocaleDateString("en-US")}
                  </span>
                </td>
              ),
              actions: ({ row }) => (
                <td>
                  <span>
                    <RiEdit2Fill
                      onClick={() => {
                        CategoryInfo(row);
                      }}
                      color="gray"
                      size={20}
                      className="cursor-pointer"
                    />

                    <MdDelete
                      onClick={() => {
                        OpenDeleteModal(row);
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
            // rowClick={CategoryInfo}
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

        {categoryInfo ? (
          <Model
            title={"Edit Category"}
            handleHideModal={() => {
              setEditModal(false);
            }}
            buttonLoader={editBtnLoader}
            show={editNewModal}
            OnClick={Formik1.handleSubmit}
          >
            <form>
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <InputField
                      name="categoryName"
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      labelName="Category name*"
                      onChange={Formik1.handleChange}
                      onBlur={Formik1.handleBlur}
                      onKeyPress={spaceValidate}
                      value={Formik1.values.categoryName}
                    />
                  </div>
                  <div className="error-space">
                    {Formik1.touched.categoryName &&
                      Formik1.errors.categoryName && (
                        <div className="error">
                          {Formik1.errors.categoryName}
                        </div>
                      )}
                  </div>
                  <div className="col-md-12">
                    <TextArea
                      name="description"
                      labelName="Description"
                      placeholder="Enter description"
                      onChange={Formik1.handleChange}
                      onKeyPress={spaceValidate}
                      value={Formik1.values.description}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Model>
        ) : null}

      </div>
      <Model
        title={"Add New Category"}
        handleHideModal={() => {
          setAddNewModal(false);
        }}
        buttonLoader={BtnLoader}
        disabled={BtnLoader}
        show={addNewModal}
        OnClick={Formik1.handleSubmit}
      >
        <form>
          <div>
            <div className="row">
              <div className="col-md-12">
                <InputField
                  name="categoryName"
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  labelName="Category name*"
                  onChange={Formik1.handleChange}
                  onBlur={Formik1.handleBlur}
                  onKeyPress={spaceValidate}
                />
              </div>
              <div className="error-space">
                {Formik1.touched.categoryName &&
                  Formik1.errors.categoryName && (
                    <div className="error">{Formik1.errors.categoryName}</div>
                  )}
              </div>
              <div className="col-md-12">
                <TextArea
                  name="description"
                  labelName="Description"
                  placeholder="Enter description"
                  onChange={Formik1.handleChange}
                  onKeyPress={spaceValidate}
                />
              </div>
            </div>
          </div>
        </form>
      </Model>

      <Model
        buttonLoader={deleteLoader}
        title={"Delete Category"}
        handleHideModal={() => {
          setDeleteModal(false);
          setDeleteData({});
        }}
        show={deleteModal}
        OnClick={DeleteUserFunction}
        disabled={deleteLoader}
        ActionText="Delete"
        ActionBtnClass="delete-btn"
      >
        <h5 className="text-center mt-4">
          <div className="delete-message">
            Are you sure you want to delete this category?
          </div>
        </h5>
      </Model>
    </div>
  );
}

export default Categories;
