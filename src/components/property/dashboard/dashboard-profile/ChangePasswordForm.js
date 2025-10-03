"use client";
import { useChangePassword } from "@/hooks/api/user";
import { changePasswordValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: changePassword, isPending } = useChangePassword();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      changePassword(
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Password changed successfully");
            resetForm();
          },
          onError: (error) => {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to change password";
            toast.error(errorMessage);
          },
        }
      );
    },
  });

  return (
    <form className="form-style1" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Old Password
            </label>
            <div className="input-group">
              <input
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                className={`form-control ${
                  formik.errors.oldPassword && formik.touched.oldPassword
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter Old Password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                <i
                  className={`fal ${
                    showOldPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>
            {formik.errors.oldPassword && formik.touched.oldPassword && (
              <div className="invalid-feedback d-block">
                {formik.errors.oldPassword}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              New Password
            </label>
            <div className="input-group">
              <input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                className={`form-control ${
                  formik.errors.newPassword && formik.touched.newPassword
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
                  className={`fal ${
                    showNewPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="invalid-feedback d-block">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Confirm New Password
            </label>
            <div className="input-group">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
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
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end">
            <button
              type="submit"
              className="ud-btn btn-dark"
              disabled={formik.isSubmitting || isPending}
            >
              {formik.isSubmitting || isPending
                ? "Changing..."
                : "Change Password"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
