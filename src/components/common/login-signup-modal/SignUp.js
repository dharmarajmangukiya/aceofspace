"use client";
import { useSignUp } from "@/hooks/api/auth";
import { signUpValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = ({ closeModal, setIsOtpSent, setSignUpData }) => {
  const router = useRouter();
  const { mutate: signUp, isPending } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      signUp(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "OTP sent to your email");
            setIsOtpSent(true);
            setSignUpData(values);
            console.log(data);
            // Close modal and redirect on success
            // closeModal?.current?.click();
            // router.push("/");
          },
          onError: (error) => {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to create account. Please try again.";

            toast.error("Sign Up Failed", {
              description: errorMessage,
              duration: 5000,
            });
            console.error("Sign up error:", error);
          },
        }
      );
    },
  });

  return (
    <form className="form-style1" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb25">
          <label className="form-label fw600 dark-color">First Name</label>
          <input
            type="text"
            name="firstName"
            className={`form-control ${
              formik.touched.firstName && formik.errors.firstName
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          )}
        </div>
        <div className="col-md-6 mb25">
          <label className="form-label fw600 dark-color">Last Name</label>
          <input
            type="text"
            name="lastName"
            className={`form-control ${
              formik.touched.lastName && formik.errors.lastName
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          )}
        </div>
      </div>
      {/* End Name fields */}

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
      {/* End Email */}

      <div className="mb20">
        <label className="form-label fw600 dark-color">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span
            className="input-group-text"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fal ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}
      </div>
      {/* End Password */}

      <div className="mb20">
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
            placeholder="Confirm Password"
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
          <div className="invalid-feedback">
            {formik.errors.confirmPassword}
          </div>
        )}
      </div>
      {/* End Confirm Password */}

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
              Creating account...
            </>
          ) : (
            <>
              Create account <i className="fal fa-arrow-right-long" />
            </>
          )}
        </button>
      </div>
      {/* <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div> */}

      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div> */}
      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div> */}
      {/* <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div> */}
      <p className="dark-color text-center mb0 mt10">
        Already Have an Account?{" "}
        <a
          className="dark-color fw600"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeModal?.current?.click(); // close modal
            router.push("/auth/login"); // then navigate
          }}
        >
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUp;
