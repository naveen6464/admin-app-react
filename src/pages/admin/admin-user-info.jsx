import React from "react";
import Input from "../../components/form-control/input-elements/input";
import Select from "../../components/form-control/input-elements/selectbox";
import { TbChevronLeft } from "react-icons/tb";
import Button from "../../components/button";
import { CircleSpinner } from "react-spinners-kit";

function AdminUserInfo({
  backToTable,
  adminUserIdData,
  formik,
  addErrorIcon,
  btnLoader,
  actionType,
  statusOptions,
}) {
  console.log(adminUserIdData, "adminUserIdData");

  const CancelAction = () => {
    backToTable();

    formik.resetForm();
  };

  return (
    <div className="bg-white p-4 cms-info-box">
      <div className="row pb-2">
        <div className="col-6">
          <div className="d-flex">
            <div className="backIcon cursor-pointer" onClick={backToTable}>
              <TbChevronLeft style={{ fontSize: "23px" }} />
            </div>
            <div className="font-weight-bold fs-5">
              <b>
                {actionType === "Add" ? "Add Admin User" : "Edit Admin User"}{" "}
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
                disabled={btnLoader}
              >
                {" "}
                {btnLoader ? (
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
                    {backToTable === "Edit" ? "Save" : "Submit"}
                  </span>
                ) : (
                  <span> {backToTable === "Edit" ? "Save" : "Submit"}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <Input
                labelName="First Name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={addErrorIcon("first_name")}
              />
            </div>
            <div className="col-6">
              <Input
                labelName="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={addErrorIcon("last_name")}
              />
            </div>
            <div className="col-6">
              <Input
                labelName="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={addErrorIcon("email")}
              />
            </div>
            <div className="col-6">
              <Input
                labelName="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={addErrorIcon("password")}
              />
            </div>

            <div className="col-6 ">
              <div className="pt-3">
                <label className="form-label font-weight-bold">
                  <b>Status</b>
                </label>
                <div>
                  <Select
                    labelName="Status"
                    name="status"
                    options={statusOptions?.map((category) => (
                      <option
                        value={category?.value}
                        className="text-capitalize"
                      >
                        {category?.label}
                      </option>
                    ))}
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={addErrorIcon("status")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserInfo;
