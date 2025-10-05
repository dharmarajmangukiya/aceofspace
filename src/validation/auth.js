import * as Yup from "yup";

// Sign In validation schema
export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

// Sign Up validation schema
export const signUpValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

// Forgot Password validation schema
export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

// OTP Verification validation schema
export const otpVerificationValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d{6}$/, "OTP must contain only numbers")
    .required("OTP is required"),
});

// Personal Info validation schema
export const personalInfoValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
});

// Change Password validation schema
export const changePasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const resetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});
