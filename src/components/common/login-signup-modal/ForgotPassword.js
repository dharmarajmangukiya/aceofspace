"use client";
import { useForgotPassword } from "@/hooks/api/auth";
import { forgotPasswordValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: forgotPassword, isPending, error } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      forgotPassword(values.email, {
        onSuccess: () => {
          toast.success("Password reset email sent!", {
            description: `We've sent a password reset link to ${values.email}. Please check your inbox.`,
            duration: 5000,
          });
          setIsSuccess(true);
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to send reset email. Please try again.";

          toast.error("Reset Email Failed", {
            description: errorMessage,
            duration: 5000,
          });
          console.error("Forgot password error:", error);
        },
      });
    },
  });

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mb20">
          <i
            className="fal fa-check-circle text-success"
            style={{ fontSize: "3rem" }}
          ></i>
        </div>
        <h5 className="mb20">Check your email</h5>
        <p className="mb20">
          We've sent a password reset link to{" "}
          <strong>{formik.values.email}</strong>
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
      {/* End email */}

      {error && (
        <div className="alert alert-danger mb20" role="alert">
          {error?.response?.data?.message ||
            error?.message ||
            "An error occurred. Please try again."}
        </div>
      )}

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

export default ForgotPassword;
