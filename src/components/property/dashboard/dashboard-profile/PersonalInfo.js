"use client";
import { useGetProfile, useUpdateUser } from "@/hooks/api/user";
import { pickErrorMessage } from "@/utils/helper";
import { personalInfoValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const PersonalInfo = () => {
  // Get user data from localStorage

  const { mutate: updateUser } = useUpdateUser();
  const { data: userData, refetch: refetchProfile } = useGetProfile();

  // Formik configuration
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userData?.data?.email || "",
      firstName: userData?.data?.firstName || "",
      lastName: userData?.data?.lastName || "",
    },
    validationSchema: personalInfoValidationSchema,
    onSubmit: ({ firstName, lastName }) => {
      // Handle form submission
      updateUser(
        { firstName, lastName },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "User updated successfully");
            refetchProfile();
          },
          onError: (error) => {
            const errorMessage = pickErrorMessage(
              error,
              "Failed to update user. Please try again."
            );
            toast.error(errorMessage);
          },
        }
      );
    },
  });

  return (
    <form className="form-style1" onSubmit={formik.handleSubmit}>
      <div className="row">
        {/* Email Field - Read Only */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="email"
              className="form-control"
              value={formik.values.email}
              readOnly
              style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
            />
            <small className="text-muted">Email cannot be changed</small>
          </div>
        </div>
        {/* End .col */}

        {/* First Name Field */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              First Name
            </label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.firstName && formik.errors.firstName
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Enter your first name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>
        </div>
        {/* End .col */}

        {/* Last Name Field */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Last Name
            </label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.lastName && formik.errors.lastName
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Enter your last name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        {/* End .col */}

        {/* Submit Button */}
        <div className="col-md-12">
          <div className="text-end">
            <button
              type="submit"
              className="ud-btn btn-dark"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Updating..." : "Update Profile"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default PersonalInfo;
