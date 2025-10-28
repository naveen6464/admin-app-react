import React, { useState, useEffect } from "react";
import "../cms.css";
import InputField from "../../../components/form-control/input-elements/input";
import CustomSelectComponent from "../../../components/form-control/custom-select";
import ReactQuill from "../../../components/form-control/react-quill-editor";
import TextArea from "../../../components/form-control/input-elements/textarea";
import { TbChevronLeft } from "react-icons/tb";
import Button from "../../../components/button";
import { CircleSpinner } from "react-spinners-kit";
import { SingleImgComponent } from "../../../components/single-img-component";

function BlogInfo(props) {
  const {
    BackToTable,
    formik,
    alphabetValidate,
    categoriesOption,
    addErrorIcon,
    spaceValidate,
    BtnLoader,
    ActionType,
    BlogIdData,
    // BLOG IMAGE
    // enableSaveBtn,
    edtImages,
    setEdtImages,
    profileImage,
    image1,
    setImage1,
    setBase64image1,
    Base64image1,
    bucket,
    setProfileImageValue,
    profileImageValue
  } = props;

  const [customSelectError] = useState(false);

  useEffect(()=>{
    if (edtImages.length > 0) {
      setProfileImageValue(true);
    }
  },[edtImages])

  const CancelAction = () => {
    BackToTable();
    setProfileImageValue(BlogIdData.isProfileImage);
    setBase64image1(false);
    setImage1({
      source: profileImage,
      fileName: null,
      fileFormat: null,
    });
    setEdtImages([]);
    formik.resetForm();
  };

  const Back = () => {
    BackToTable();
    setProfileImageValue(BlogIdData.isProfileImage);
    setBase64image1(false);
    setImage1({
      source: profileImage,
      fileName: null,
      fileFormat: null,
    });
    setEdtImages([]);
    formik.resetForm();
  };

  const deleteImage = () => {
    setProfileImageValue(false);
    setBase64image1(false);
    setImage1({
      source: profileImage,
      fileName: null,
      fileFormat: null,
    });
    setEdtImages([]);
  };

  return (
    <div className="bg-white p-4 cms-info-box">
      <div className="row pb-2">
        <div className="col-6">
          <div className="d-flex">
            <div className="backIcon cursor-pointer" onClick={Back}>
              <TbChevronLeft style={{ fontSize: "23px" }} />
            </div>
            <div className="font-weight-bold fs-5">
              <b>
                {ActionType === "Add"
                  ? "Add Blog Details"
                  : "Edit Blog Details"}{" "}
              </b>{" "}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-end">
            <div className="d-flex">
              <Button btn_class={"CancelBtnClass mx-3 "} onClick={CancelAction}>
                Cancel
              </Button>
              <Button
                type={"submit"}
                btn_class={"ActionBtnClass"}
                onClick={formik.handleSubmit}
                disabled={BtnLoader}
              >
                {" "}
                {BtnLoader ? (
                  <span className="d-flex">
                    {" "}
                    <span
                      style={{
                        position: "relative",
                        left: "-10px",
                      }}
                    >
                      <CircleSpinner
                        className={{ paddingLeft: "10px" }}
                        size={18}
                        color="#fff"
                      />
                    </span>{" "}
                    {ActionType === "Edit" ? "Save" : "Submit"}
                  </span>
                ) : (
                  <span> {ActionType === "Edit" ? "Save" : "Submit"}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <form>
        <SingleImgComponent
          deleteImage={deleteImage}
          enableSaveBtn={true}
          edtImages={edtImages}
          setEdtImages={setEdtImages}
          profileImage={profileImage}
          image1={image1}
          setImage1={setImage1}
          setBase64image1={setBase64image1}
          Base64image1={Base64image1}
          bucket={bucket}
          profileImageValue={profileImageValue}
        />
        <div>
          <div className="row">
            <div className="col-lg-12">
              <InputField
                name="title"
                type="text"
                className={` input-fields ${
                  formik.touched.title && formik.errors.title
                    ? "error-input-cms"
                    : ""
                } `}
                placeholder="Enter Blog Title"
                labelName="Blog Title*"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className="error-space-cms">
                {formik.touched.title && formik.errors.title && (
                  <div className="error-txt-cms">
                    {addErrorIcon(formik.errors.title)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <CustomSelectComponent
                name="category"
                label="Category*"
                heightProps="45px"
                options={categoriesOption}
                form={formik}
                labelClass={"pb-1"}
                error={customSelectError}
              />
              <div className="error-space-cms">
                {formik.touched.category && formik.errors.category && (
                  <div className="error-txt-cms">
                    {addErrorIcon(formik.errors.category)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <TextArea
                name="summary"
                labelName="Summary*"
                placeholder="Enter blog summary"
                className={` text-summary ${
                  formik.touched.summary && formik.errors.summary
                    ? "error-input-cms"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyPress={spaceValidate}
                value={formik.values.summary}
              />
              <div className="error-space-cms">
                {formik.touched.summary && formik.errors.summary && (
                  <div className="error-txt-cms">
                    {addErrorIcon(formik.errors.summary)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <ReactQuill
                QuillHeight={"about-us-editor"}
                id="description"
                placeholder="Type here"
                value={formik.values.description}
                onChange={(content) => {
                  formik.handleChange("description")(content);
                }}
                className={`text_input `}
                labelName="Description*"
                labelClass="Quill-label mt-3 mb-1"
                onKeyPress={spaceValidate}
              />
              <div className="error-space-cms">
                {formik.touched.description && formik.errors.description && (
                  <div className="error-txt-cms">
                    {addErrorIcon(formik.errors.description)}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <InputField
                name="email"
                type="text"
                className={` input-fields ${
                  formik.touched.email && formik.errors.email
                    ? "error-input-cms"
                    : ""
                } `}
                placeholder="Enter your email address"
                labelName="Email Address*"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyPress={spaceValidate}
              />
              <div className="error-space-cms">
                {formik.touched.email && formik.errors.email && (
                  <div className="error-txt-cms">
                    {addErrorIcon(formik.errors.email)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <InputField
                name="contributor"
                type="text"
                className={`input-fields ${
                  formik.touched.contributor && formik.errors.contributor
                    ? "error-input-cms"
                    : ""
                } `}
                placeholder="Enter Blog Contributor"
                labelName="Contributor*"
                value={formik.values.contributor}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyPress={alphabetValidate}
              />
              <div className="error-space-cms">
                {formik.touched.contributor && formik.errors.contributor && (
                  <div className="error-txt-cms">
                    {addErrorIcon(formik.errors.contributor)}
                  </div>
                )}
              </div>
            </div>
        
          </div>
        </div>
      </form>
    </div>
  );
}

export default BlogInfo;
