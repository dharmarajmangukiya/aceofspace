"use client";
import { useResetPassword } from "@/hooks/api/auth";
import { pickErrorMessage } from "@/utils/helper";
import { resetPasswordValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      resetPassword(values, {
        onSuccess: (data) => {
          toast.success(data?.message || "Password reset successfully!");
          setIsSuccess(true);
        },
        onError: (error) => {
          const errorMessage = pickErrorMessage(
            error,
            "Failed to reset password. Please try again."
          );
          toast.error(errorMessage);
        },
      });
    },
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mb20">
          <i
            className="fal fa-check-circle text-success"
            style={{ fontSize: "3rem" }}
          ></i>
        </div>
        <h5 className="mb20">Password reset successfully</h5>
        <p className="mb20">
          Your password has been reset successfully. You can now login with your
          new password.
        </p>
        <p className="dark-color text-center mb0 mt10">
          Already Have an Account?{" "}
          <Link className="dark-color fw600" href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="form-style1" onSubmit={formik.handleSubmit}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${
            formik.touched.email && formik.errors.email ? "is-invalid" : ""
          }`}
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback">{formik.errors.email}</div>
        )}
      </div>
      {error && (
        <div className="alert alert-danger mb20" role="alert">
          {error?.response?.data?.message ||
            error?.message ||
            "An error occurred. Please try again."}
        </div>
      )}
      {/* End email */}

      <div className="mb25">
        <label className="form-label fw600 dark-color">New Password</label>
        <div className="input-group">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            className={`form-control ${
              formik.touched.newPassword && formik.errors.newPassword
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span
            className="input-group-text"
            style={{ cursor: "pointer" }}
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            <i
              className={`fal ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </span>
        </div>
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className="text-danger small ">{formik.errors.newPassword}</div>
        )}
      </div>
      {/* End new password */}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Confirm Password</label>
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            className={`form-control ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "is-invalid"
                : ""
            }`}
            placeholder="Confirm New Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span
            className="input-group-text"
            style={{ cursor: "pointer" }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <i
              className={`fal ${
                showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </span>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-danger small ">
            {formik.errors.confirmPassword}
          </div>
        )}
      </div>
      {/* End confirm password */}

      <div className="d-grid mb20">
        <button
          className="ud-btn btn-thm"
          type="submit"
          disabled={isPending || !formik.isValid}
        >
          {isPending ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Sending...
            </>
          ) : (
            <>
              Send Reset Link <i className="fal fa-arrow-right-long" />
            </>
          )}
        </button>
      </div>
      {/* End submit */}

      <p className="dark-color text-center mb0 mt10">
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/auth/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default ResetPassword;
