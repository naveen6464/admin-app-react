import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import TrueKarmaLogo from "../../assets/logo-white.svg";
import { loginUser } from "../../api/others";
import Input from "../../components/form-control/login-input/input";
import Input1 from "../../components/form-control/login-input/input1";
import { saveLocalUser } from "../../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

function Login() {
  const [buttonLoader, setButtonLoader] = useState(false);
  const history = useHistory();

  const handleButtonLoader = () => setButtonLoader(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const ErrorIcon = () => <HiOutlineExclamationCircle className="me-1" />;

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(
        <span>
          <ErrorIcon /> Email is required
        </span>
      )
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email"
      ),
    password: Yup.string().required(
      <span>
        <ErrorIcon /> Password is required
      </span>
    ),
  });

  const onSubmit = async (values) => {
    values.roll = "admin";
    setButtonLoader(true);
    await loginUser(values)
      .then((res) => {
        if (res?.message === "Logged in successfully") {
          toast.success("Login Successful");
          history.push("/blogs");
          saveLocalUser(res?.data?.encryptedData);
          setButtonLoader(false);
        } else {
          toast.error("Login Unsuccessful");
          setButtonLoader(false);
        }
      })
      .catch(() => {
        toast.error("Login Unsuccessful");
        setButtonLoader(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit,
  });

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "1rem" }}>
        <div className="text-center mb-4">
          <img
            src={TrueKarmaLogo}
            alt="TrueKarma Logo"
            className="mb-3"
            width="90"
            height="90"
          />
          <h4 className="fw-semibold text-dark">Welcome Back</h4>
          <p className="text-muted small mb-0">Sign in to continue</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-medium text-secondary">Email</label>
            <Input
              name="email"
              type="email"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-danger small mt-1 d-flex align-items-center">
                <ErrorIcon /> {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="form-label fw-medium text-secondary">Password</label>
            <Input1
              name="password"
              type="password"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-danger small mt-1 d-flex align-items-center">
                <ErrorIcon /> {formik.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-3"
              disabled={buttonLoader}
              onClick={buttonLoader ? handleButtonLoader : null}
            >
              {buttonLoader ? (
                <div className="d-flex align-items-center justify-content-center">
                  <CircleSpinner size={18} color="#fff" />
                  <span className="ms-2">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-muted small mt-3">
          © {new Date().getFullYear()} TrueKarma. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;
