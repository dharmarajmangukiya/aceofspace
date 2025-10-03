"use client";

import { useSignUp, useVerifyOtp } from "@/hooks/api/auth";
import { otpVerificationValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const OtpVerification = ({
  signUpData,
  setIsOtpSent,
  closeModal,
  setSignUpData,
}) => {
  const router = useRouter();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useSignUp();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpVerificationValidationSchema,
    onSubmit: (values) => {
      const otpString = otp.join("");
      verifyOtp(
        {
          email: signUpData?.email,
          otp: otpString,
        },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Account verified successfully!");
            closeModal?.current?.click();
            router.push("/");
          },
          onError: (error) => {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "Invalid OTP. Please try again.";
            toast.error("Verification Failed", {
              description: errorMessage,
              duration: 5000,
            });
            console.error("OTP verification error:", error);
          },
        }
      );
    },
  });

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Update formik value
    formik.setFieldValue("otp", newOtp.join(""));
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      formik.setFieldValue("otp", pastedData);
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (!canResend || !signUpData) return;

    resendOtp(
      {
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        password: signUpData.password,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "OTP resent successfully!");
          setTimer(60);
          setCanResend(false);
          setOtp(["", "", "", "", "", ""]);
          formik.setFieldValue("otp", "");
          inputRefs.current[0]?.focus();
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to resend OTP. Please try again.";
          toast.error("Resend Failed", {
            description: errorMessage,
            duration: 5000,
          });
        },
      }
    );
  };

  const handleBack = () => {
    setIsOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    formik.resetForm();
    setSignUpData(null);
  };

  return (
    <div className="form-style1">
      {/* Back Button */}
      <div className="mb20">
        <button
          type="button"
          className="btn btn-link p-0 text-start"
          onClick={handleBack}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Registration
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb30">
        <h4 className="title">Verify Your Email</h4>
        <p className="text">
          We've sent a 6-digit verification code to{" "}
          <strong>{signUpData?.email}</strong>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {/* OTP Input Fields */}
        <div className="mb25">
          <label className="form-label fw600 dark-color">
            Enter Verification Code
          </label>
          <div className="d-flex justify-content-between gap-2 mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                className={`form-control text-center fw-bold ${
                  formik.touched.otp && formik.errors.otp ? "is-invalid" : ""
                }`}
                style={{ width: "50px", height: "50px", fontSize: "18px" }}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                autoComplete="off"
              />
            ))}
          </div>
          {formik.touched.otp && formik.errors.otp && (
            <div className="invalid-feedback d-block">{formik.errors.otp}</div>
          )}
        </div>

        {/* Resend OTP */}
        <div className="text-center mb20">
          {canResend ? (
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={handleResendOtp}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Resending...
                </>
              ) : (
                "Resend OTP"
              )}
            </button>
          ) : (
            <p className="text-muted">Resend OTP in {timer} seconds</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="d-grid mb20">
          <button
            className="ud-btn btn-thm"
            type="submit"
            disabled={isVerifying || otp.join("").length !== 6}
          >
            {isVerifying ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Verifying...
              </>
            ) : (
              <>
                Verify Email <i className="fal fa-arrow-right-long" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-muted small">
          Didn't receive the code? Check your spam folder or{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={handleResendOtp}
            disabled={!canResend || isResending}
          >
            resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
