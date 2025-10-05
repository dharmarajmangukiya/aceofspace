"use client";

import { useResendOtp, useVerifyOtp } from "@/hooks/api/auth";
import { pickErrorMessage } from "@/utils/helper";
import { otpVerificationValidationSchema } from "@/validation/auth";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const OtpVerification = ({
  signUpData,
  setIsOtpSent,
  loginTabButton,
  setSignUpData,
}) => {
  const router = useRouter();
  const location = usePathname();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

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
            if (location === "/auth/register") {
              router.push("/auth/login");
            } else {
              setIsOtpSent(false);
              loginTabButton?.current?.click();
            }

            formik.resetForm();
          },
          onError: (error) => {
            const errorMessage = pickErrorMessage(
              error,
              "Invalid OTP. Please try again."
            );
            toast.error(errorMessage);
            formik.setFieldValue("otp", "");
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
    if (!canResend) return;
    if (!signUpData?.email) {
      const errorMessage = pickErrorMessage(null, "Error while resending OTP");
      toast.error(errorMessage);
      setIsOtpSent(false);
      setSignUpData(null);
      formik.resetForm();
      return;
    }

    resendOtp(
      { email: signUpData?.email || "" },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "OTP resent successfully!");
          setTimer(60);
          setCanResend(false);
          setOtp(["", "", "", "", "", ""]);
          formik.resetForm();
          inputRefs.current[0]?.focus();
        },
        onError: (error) => {
          const errorMessage = pickErrorMessage(
            error,
            "Failed to resend OTP. Please try again."
          );
          toast.error(errorMessage);
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
        <p className="text-muted small d-flex justify-content-center align-items-center gap-1">
          Didn't receive the code? Check your spam folder or
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={handleResendOtp}
            disabled={!canResend || isResending}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
