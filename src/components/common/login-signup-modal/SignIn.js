"use client";

import { useSignIn } from "@/hooks/api/auth";
import { signInValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignIn = ({ closeModal }) => {
  const router = useRouter();
  const { mutate: signIn, isPending } = useSignIn();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      signIn(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Welcome back! You've been signed in successfully.", {
              description: "Redirecting to your dashboard...",
              duration: 3000,
            });
            // Close modal and redirect on success
            closeModal?.current?.click();
            router.push("/");
          },
          onError: (error) => {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to sign in. Please check your credentials and try again.";

            toast.error("Sign In Failed", {
              description: errorMessage,
              duration: 5000,
            });
            console.error("Sign in error:", error);
          },
        }
      );
    },
  });

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

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
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
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}
      </div>
      {/* End Password */}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input
            type="checkbox"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <span className="checkmark" />
        </label>
        <a
          className="fz14 ff-heading"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeModal?.current?.click(); // close modal
            router.push("/auth/forgot-password"); // then navigate
          }}
        >
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

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
              Signing in...
            </>
          ) : (
            <>
              Sign in <i className="fal fa-arrow-right-long" />
            </>
          )}
        </button>
      </div>
      {/* End submit */}

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
        Not signed up?{" "}
        <a
          className="dark-color fw600"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeModal?.current?.click(); // close modal
            router.push("/auth/register"); // then navigate
          }}
        >
          Create an account.
        </a>
      </p>
    </form>
  );
};

export default SignIn;
