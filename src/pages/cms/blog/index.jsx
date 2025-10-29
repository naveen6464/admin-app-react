import React, { useEffect, useState } from "react";
import HeaderSection from "../../../components/header-section";
import Input from "../../../components/form-control/head-input/search-input";
import Table from "../../../components/table";
import PaginateCount from "../../../components/pagination/pagination-count";
import { getBlogList } from "../../../api/list";
import BlogInfo from "./blog-info";
import Model from "../../../components/model/index";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../cms.css";
import { addBlogData } from "../../../api/create";
import PageLoader from "../../../components/page-loader";
import { deleteBlogData } from "../../../api/delete";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
// import { hostConfig } from "../../../config";
import { updateBlogData } from "../../../api/update";
import { uploadImageToS3 } from "../../../utils/files";
import { debounce } from "lodash";

function BlogTable() {
  const [loader, setLoader] = useState(false);
  const [BlogData, setBlogData] = useState([]);
  const [blogLoader, setBlogLoader] = useState(false);
  const [BlogIdData, setBlogIdData] = useState({});
  const [BlogInfoDetails, setBlogInfoDetails] = useState(false);
  const [profileImageValue, setProfileImageValue] = useState(null);

  // blog new
  const [ActionType, setActionType] = useState("");
  const [BtnLoader, setBtnLoader] = useState(false);
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

  // BLOG IMAGE

  const profileImage = profileImageValue === true ? BlogIdData.id : "default";

  const categoriesOption = [
    {
      value: "category1",
      label: "Category 1",
    },
    {
      value: "category2",
      label: "Category 2",
    },
    {
      value: "category3",
      label: "Category 3",
    },
  ];

  // User Profile
  const [image, setImage] = useState([]);
  const [image1, setImage1] = useState({
    source: profileImage,
    fileName: null,
    fileFormat: null,
  });
  const [Base64image1, setBase64image1] = useState(false);

  useEffect(() => {
    setLoader(true);
    getBlogList({ limit: pageLimit, page: presentPage, skip: 0 }).then(
      (res) => {
        console.log(res);

        setLoader(false);
        setBlogData(res?.detail?.data);
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
    getBlogList({
      limit: pageLimit,
      lastKey: lastDataId,
      next: true,
      search: searchValue,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage + 1));
      }
      setBlogData(response?.data?.records);
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
    getBlogList({
      limit: pageLimit,
      lastKey: firstDataId,
      previous: true,
      search: searchValue,
    }).then((response) => {
      if (response.message === "success" || response.message === "Success") {
        setPresentPage((prevPage) => Math.min(prevPage - 1));
      }
      setBlogData(response?.data?.records);
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
    getBlogList({
      limit: newLimit,
      next: true,
      search: searchValue,
    }).then((response) => {
      setBlogData(response?.data?.records);
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
    getBlogList({
      limit: pageLimit,
      next: true,
      search: value,
    }).then((response) => {
      setBlogData(response?.data?.records);
      setLastDataId(response?.data?.lastDataId);
      setFirstDataId(response?.data?.firstDataId);
      setTotalPages(response?.data?.totalPages);
      setTotalRecords(response?.data.filterTotalRecord);
      setNoRecords(response?.data?.noRecords);
      setLoader(false);
    });
  }, 500);

  const data = BlogData?.map((items) => {
    return items;
  });

  console.log(data, "00000");

  const BlogDetailsInfo = async (row) => {
    setActionType("Edit");
    setBlogInfoDetails(true);
    setBlogLoader(true);
    setBlogIdData(row);
    setProfileImageValue(row?.isProfileImage);
    setBlogLoader(false);
  };

  const BlogDetailsInfoAdd = () => {
    setBlogIdData({});
    setActionType("Add");
    setBlogInfoDetails(true);
    setProfileImageValue(false);
    setBase64image1(false);
    setImage1({
      source: profileImage,
      fileName: null,
      fileFormat: null,
    });
    setImage([]);
  };

  const DeleteUserFunction = () => {
    setDeleteLoader(true);
    deleteBlogData(deleteData?.id).then((res) => {
      setDeleteLoader(false);
      setDeleteModal(false);
      if (res?.message === "success" || res?.message === "Success") {
        toast.success("Blog deleted successfully");
        setDeleteData({});
        setLoader(true);
        getBlogList({ limit: pageLimit, next: true }).then((res) => {
          setLoader(false);
          setBlogData(res?.data?.records);
          setTotalRecords(res?.data.totalRecords);
          setLastDataId(res?.data?.lastDataId);
          setFirstDataId(res?.data?.firstDataId);
          setTotalPages(res?.data?.totalPages);
          setNoRecords(res?.data?.noRecords);
        });
      }
    });
  };

  const OpenDeleteModal = (row) => {
    setDeleteModal(true);
    setDeleteData(row);
  };

  const BackToTable = () => {
    setBlogInfoDetails(false);
  };

  // ADD NEW BLOGS

  const initialValues = {
    title: BlogIdData.title || "",
    author_name: BlogIdData.author_name || "",
    summary: BlogIdData.summary || "",
    content: BlogIdData.content || "",
    category: BlogIdData.category || "",
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

  const sanitizeBlogDescription = (value) => {
    const sanitizedValue = value?.replace(/<p><br><\/p>/g, "");
    return sanitizedValue;
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Blog title is required")
      .matches(
        /^[A-Za-z0-9\s]+$/,
        "Blog title cannot contain special characters"
      ),
    category: Yup.string(),
    summary: Yup.string().required("Summary is required"),
    content: Yup.string()
      .min(15, "content must be at least 15 characters")
      .nullable()
      .test("content", "content is required", function (value) {
        const sanitizedValue = sanitizeBlogDescription(value);
        return !!sanitizedValue?.trim(); // Validate the sanitized value
      }),
    author_name: Yup.string().required("Author name is required"),
  });

  const onSubmit = async (values) => {
    values.title = values.title.toLowerCase();
    values.excerpt = "test";
    values.cover_image_url = "test";

    setBtnLoader(true);

    if (ActionType === "Add") {
      values.createdAt = Date.now();
      if (image.length > 0) {
        values.isProfileImage = true;
      } else {
        values.isProfileImage = false;
      }
      values.updatedAt = Date.now();

      await addBlogData(values).then((res) => {
        setBtnLoader(false);
        BackToTable();
        if (res.message === "success" || res.message === "Success") {
          // if (image.length > 0) {
          //   const sources = image.map((item) => item.source);
          //   if (Array.isArray(sources) && sources.length > 0) {
          //     for (let index = 0; index < sources.length; index++) {
          //       const item = sources[index];
          //       const s3Upload = item.replace(/^data:image\/\w+;base64,/, "");
          //       const filename = res?.data?.id;
          //       uploadImageToS3(s3Upload, "blog", filename);
          //     }
          //   }
          // }
          toast.success("Blog created successfully");
        }
      });
    }
    if (ActionType === "Edit") {
      values.isProfileImage = profileImageValue;
      if (image.length > 0) {
        values.isProfileImage = true;
        values.updatedAt = Date.now();
        const sources = image.map((item) => item.source);

        if (Array.isArray(sources) && sources.length > 0) {
          for (let index = 0; index < sources.length; index++) {
            const item = sources[index];
            const s3Upload = item.replace(/^data:image\/\w+;base64,/, "");
            const filename = BlogIdData?.id;

            await uploadImageToS3(s3Upload, "blog", filename);
          }
        }
      } else {
        values.isProfileImage = profileImageValue;
      }

      await updateBlogData(values, BlogIdData?.id).then((res) => {
        setBtnLoader(false);
        BackToTable();
        if (res.message === "success" || res.message === "Success") {
          toast.success("Blog updated successfully");
        }
      });
    }

    formik.resetForm();
    setLoader(true);
    await getBlogList({ limit: pageLimit, next: true }).then((res) => {
      setLoader(false);
      setBlogData(res?.data?.records);
      setTotalRecords(res?.data.totalRecords);
      setLastDataId(res?.data?.lastDataId);
      setFirstDataId(res?.data?.firstDataId);
      setTotalPages(res?.data?.totalPages);
      setNoRecords(res?.data?.noRecords);
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

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

  return (
    <div>
      <div>
        {!BlogInfoDetails ? (
          <div>
            <HeaderSection title="Blogs" />
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
                tableButtonFunction={BlogDetailsInfoAdd}
                tableButtonText="Add New"
                loader={loader}
                data={data}
                columns={[
                  // "Image",
                  "Title",
                  "Author Name",
                  "Created At",
                  "actions",
                ]}
                scopedSlots={{
                  // Image: ({ row }) => (
                  //   <td>
                  //     <span className="mb-2">
                  //       <img
                  //         src={
                  //           row.isProfileImage === true
                  //             ? `${hostConfig.TRUEKARMA_S3_URL}blog/${
                  //                 row?.id
                  //               }.jpg?v=
                  //             ${new Date().getTime()} `
                  //             : `${hostConfig.TRUEKARMA_S3_URL}blog/default.jpg`
                  //         }
                  //         alt="blogImage"
                  //         width={80}
                  //         height={70}
                  //       />
                  //     </span>
                  //   </td>
                  // ),
                  Title: ({ row }) => (
                    <td className="text-capitalize align-middle">
                      <div className="align-middle" title={row?.title}>
                        {row?.title?.length > 20
                          ? row?.title.slice(0, 20) + "..."
                          : row?.title}
                      </div>
                    </td>
                  ),
                  "Author Name": ({ row }) => (
                    <td className="align-middle">
                      <span className="">
                        {row?.author_name?.length > 10
                          ? row?.author_name.slice(0, 10) + "..."
                          : row?.author_name}{" "}
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
                          onClick={() => {
                            BlogDetailsInfo(row);
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
            {blogLoader ? (
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
              <BlogInfo
                setActionType={setActionType}
                BackToTable={BackToTable}
                BlogIdData={BlogIdData}
                blogLoader={blogLoader}
                formik={formik}
                alphabetValidate={alphabetValidate}
                categoriesOption={categoriesOption}
                addErrorIcon={addErrorIcon}
                spaceValidate={spaceValidate}
                BtnLoader={BtnLoader}
                ActionType={ActionType}
                // BLOG IMAGE
                enableSaveBtn={true}
                edtImages={image}
                setEdtImages={setImage}
                profileImage={profileImage}
                image1={image1}
                setImage1={setImage1}
                setBase64image1={setBase64image1}
                Base64image1={Base64image1}
                bucket="blog"
                profileImageValue={profileImageValue}
                setProfileImageValue={setProfileImageValue}
              />
            )}
          </div>
        )}
      </div>
      <Model
        buttonLoader={deleteLoader}
        title={"Delete Blog"}
        handleHideModal={() => {
          setDeleteModal(false);
          setDeleteData({});
        }}
        show={deleteModal}
        OnClick={DeleteUserFunction}
        ActionText="Delete"
        ActionBtnClass="delete-btn"
        disabled={deleteLoader}
      >
        <h5 className="text-center mt-4">
          Are you sure you want to delete this{" "}
          <b className="text-capitalize">{deleteData?.title}</b> Blog?
        </h5>
      </Model>
    </div>
  );
}

export default BlogTable;
