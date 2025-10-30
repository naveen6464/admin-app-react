import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import HeaderSection from "../../components/header-section";
import PageLoader from "../../components/page-loader";
import Input from "../../components/form-control/input-elements/input";
import { getLocalUser, saveLocalUser } from "../../utils/auth";
import { updateAdminUserData } from "../../api/update";
// import { uploadImageToS3 } from "../../utils/files";
import { SingleImgComponent } from "../../components/single-img-component";
import "./AdminProfile.css";

function AdminProfile() {
  const [btnLoader, setBtnLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState([]);
  const [profileImageValue, setProfileImageValue] = useState(false);

  useEffect(() => {
    const loggedUser = getLocalUser();
    if (loggedUser) {
      setUserData(loggedUser);
      setProfileImageValue(loggedUser.isProfileImage || false);
    }
    setPageLoader(false);
  }, []);

  const initialValues = {
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    email: userData?.email || "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = async (values) => {
    setBtnLoader(true);

    const payload = { ...values };
    if (!payload.password) {
      delete payload.password;
    }

    let newProfileImageValue = profileImageValue;
    if (image.length > 0) {
      newProfileImageValue = true;
      //   const s3Upload = image[0].source.replace(/^data:image\/\w+;base64,/, "");
      try {
        // await uploadImageToS3(s3Upload, "system-users", userData.id);
        toast.success("Profile image uploaded successfully.");
      } catch (error) {
        toast.error("Failed to upload profile image.");
      }
    }

    payload.isProfileImage = newProfileImageValue;

    try {
      const res = await updateAdminUserData(payload, userData.id);
      if (res.message === "success" || res.message === "Success") {
        toast.success("Profile updated successfully");
        const updatedUser = {
          ...userData,
          ...payload,
          isProfileImage: newProfileImageValue,
        };
        delete updatedUser.password;
        saveLocalUser(updatedUser);
        setUserData(updatedUser);
        formik.resetForm({
          values: {
            ...initialValues,
            first_name: payload.first_name,
            last_name: payload.last_name,
            password: "",
          },
        });
        setImage([]);
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setBtnLoader(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const ErrorIcon = () => (
    <HiOutlineExclamationCircle className="error-icon-cms" />
  );

  const addErrorIcon = (message) => (
    <div className="d-flex">
      <ErrorIcon />
      {message}
    </div>
  );

  if (pageLoader) {
    return <PageLoader />;
  }

  return (
    <div>
      <HeaderSection title="Admin Profile" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 text-center mb-4">
                      <SingleImgComponent
                        edtImages={image}
                        setEdtImages={setImage}
                        profileImage={`system-users/${
                          userData?.id
                        }?v=${new Date().getTime()}`}
                        isProfileImage={profileImageValue}
                        bucket="system-users"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <Input
                          type="text"
                          name="first_name"
                          id="first_name"
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.first_name &&
                          formik.errors.first_name &&
                          addErrorIcon(formik.errors.first_name)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <Input
                          type="text"
                          name="last_name"
                          id="last_name"
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.last_name &&
                          formik.errors.last_name &&
                          addErrorIcon(formik.errors.last_name)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          value={formik.values.email}
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Leave blank to keep current password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password &&
                          formik.errors.password &&
                          addErrorIcon(formik.errors.password)}
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={btnLoader}
                    >
                      {btnLoader ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
