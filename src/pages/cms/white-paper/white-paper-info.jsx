import React from "react";
import "../cms.css";
import InputField from "../../../components/form-control/input-elements/input";
import TextArea from "../../../components/form-control/input-elements/textarea";
import { TbChevronLeft } from "react-icons/tb";
import Button from "../../../components/button";
import { CircleSpinner } from "react-spinners-kit";
import { FiUpload } from "react-icons/fi";

function WhitePaperInfo(props) {
  const {
    backToTable,
    formik,
    addErrorIcon,
    btnLoader,
    actionType,
    whitePaperIdData,
    file,
    setFile,
  } = props;

  const handleFileChange = (event) => {
    const selectedFile = event.currentTarget.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      formik.setFieldValue("file_url", selectedFile.name);
    }
  };

  const cancelAction = () => {
    backToTable();
    formik.resetForm();
    setFile(null);
  };

  return (
    <div className="bg-white p-4 cms-info-box">
      <div className="row pb-2">
        <div className="col-6">
          <div className="d-flex">
            <div className="backIcon cursor-pointer" onClick={cancelAction}>
              <TbChevronLeft style={{ fontSize: "23px" }} />
            </div>
            <div className="font-weight-bold fs-5">
              <b>
                {actionType === "Add"
                  ? "Add White Paper Details"
                  : "Edit White Paper Details"}
              </b>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-end">
            <div className="d-flex">
              <Button btn_class={"CancelBtnClass mx-3 "} onClick={cancelAction}>
                Cancel
              </Button>
              <Button
                type={"submit"}
                btn_class={"ActionBtnClass"}
                onClick={formik.handleSubmit}
                disabled={btnLoader}
              >
                {btnLoader ? (
                  <span className="d-flex">
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
                    </span>
                    {actionType === "Edit" ? "Save" : "Submit"}
                  </span>
                ) : (
                  <span> {actionType === "Edit" ? "Save" : "Submit"}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <form>
        <div className="row">
          <div className="col-lg-12">
            <InputField
              name="title"
              type="text"
              className={`input-fields ${
                formik.touched.title && formik.errors.title
                  ? "error-input-cms"
                  : ""
              }`}
              placeholder="Enter Title"
              labelName="Title*"
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
          <div className="col-lg-12">
            <InputField
              name="author"
              type="text"
              className={`input-fields ${
                formik.touched.author && formik.errors.author
                  ? "error-input-cms"
                  : ""
              }`}
              placeholder="Enter Author Name"
              labelName="Author*"
              value={formik.values.author}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <div className="error-space-cms">
              {formik.touched.author && formik.errors.author && (
                <div className="error-txt-cms">
                  {addErrorIcon(formik.errors.author)}
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <TextArea
              name="summary"
              labelName="Summary*"
              placeholder="Enter summary"
              className={`text-summary ${
                formik.touched.summary && formik.errors.summary
                  ? "error-input-cms"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <label className="form-label">File*</label>
            <div className="d-flex align-items-center">
              <label htmlFor="file-upload" className="custom-file-upload">
                <FiUpload /> Choose File
              </label>
              <input
                id="file-upload"
                name="file_url"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span className="file-name mx-3">
                {file?.name || whitePaperIdData.file_url?.split("/").pop() || "No file chosen"}
              </span>
            </div>
            <div className="error-space-cms">
              {formik.touched.file_url && formik.errors.file_url && (
                <div className="error-txt-cms">
                  {addErrorIcon(formik.errors.file_url)}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WhitePaperInfo;
