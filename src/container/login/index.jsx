import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import cookie from "react-cookies";

import TecosoftLogo from "../../assets/logo.svg";
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
    setButtonLoader(true);
    try {
      const res = await loginUser(values);
      console.log(res, "988998");
      console.log("Success check:", res?.detail?.success); // Debug: Confirms condition

      if (res?.detail?.success === true) {
        saveLocalUser(res?.detail?.data);
        cookie.save("adminToken", res?.detail?.data?.access_token); // Fixed: Use 'res', not 'result'
        toast.success("Login Successful");
        history.push("/blogs");
      } else {
        console.log("API success false:", res); // Debug: Log why else branch hit
        toast.error("Login Unsuccessful");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug: Log full error
      toast.error("Login Unsuccessful");
    } finally {
      setButtonLoader(false); // Always reset loader
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit,
  });

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div
        className="card border-0 shadow-sm p-5"
        style={{
          width: "480px",
          borderRadius: "1.5rem",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Logo and Header */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3">
            <img
              src={TecosoftLogo}
              alt="Logo"
              width="90"
              height="90"
              // style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <h3 className="fw-bold mb-2" style={{ color: "#1a1a1a" }}>
            Welcome to Tecosoft
          </h3>
          <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
            Your Gateway to Intelligent Interaction
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label
              className="form-label fw-medium mb-2"
              style={{ color: "#333", fontSize: "0.9rem" }}
            >
              Email
            </label>
            <Input
              name="email"
              type="email"
              className="form-control"
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                border: "1px solid #e0e0e0",
                fontSize: "0.95rem",
              }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email address"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger small mt-1 d-flex align-items-center">
                {formik.errors.email}
              </div>
            ) : (
              <div> &nbsp;&nbsp;</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              className="form-label fw-medium mb-2"
              style={{ color: "#333", fontSize: "0.9rem" }}
            >
              Password
            </label>
            <Input1
              name="password"
              type="password"
              className="form-control"
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                border: "1px solid #e0e0e0",
                fontSize: "0.95rem",
              }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-danger small mt-1 d-flex align-items-center">
                {formik.errors.password}
              </div>
            ) : (
              <div> &nbsp;&nbsp;</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-lg border-0"
              style={{
                background:
                  "linear-gradient(226.55deg, #00B7FF 21.48%, #0EB05C 76.42%)",
                color: "#ffffff",
                padding: "0.85rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              disabled={buttonLoader}
              onClick={buttonLoader ? handleButtonLoader : null}
            >
              {buttonLoader ? (
                <div className="d-flex align-items-center justify-content-center">
                  <CircleSpinner size={18} color="#fff" />
                  <span className="ms-2">Logging in...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        {/* Already have account */}
        {/* <div className="text-center mb-3">
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <a 
              href="/login" 
              style={{ 
                color: "#667eea", 
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Login
            </a>
          </span>
        </div> */}

        {/* Divider */}
        {/* <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" style={{ borderColor: "#e0e0e0" }} />
          <span className="px-3 text-muted" style={{ fontSize: "0.85rem" }}>
            or continue with
          </span>
          <hr className="flex-grow-1" style={{ borderColor: "#e0e0e0" }} />
        </div> */}

        {/* Google Sign In */}
        {/* <button
          type="button"
          className="btn btn-light w-100 d-flex align-items-center justify-content-center"
          style={{
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "1px solid #e0e0e0",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="me-2">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google account
        </button> */}

        {/* Footer */}
        {/* <div className="text-center mt-4 pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
            By clicking "Submit", you agree to TrueKarma's{" "}
            <a href="/terms" style={{ color: "#667eea", textDecoration: "none" }}>
              User Agreement
            </a>{" "}
            and{" "}
            <a href="/privacy" style={{ color: "#667eea", textDecoration: "none" }}>
              Privacy Policy
            </a>
            . We prioritize your privacy and trust, guiding you through innovative interactions while safeguarding your personal information.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
