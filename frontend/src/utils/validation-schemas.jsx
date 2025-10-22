import * as yup from "yup";

export const userSignUpSchema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .equals([yup.ref("password")], "Password does not match"),
  role: yup.string().required("Please select your role"),
});

export const userSigninSchema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export const providerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  userName: yup
    .string()
    .required("Please enter your username")
    .max(200, "Your username must be at most 200 characters"),
  password: yup.string().required("Please enter your password"),
  displayedName: yup.string().required("Please enter your display name"),
  profilePicture: yup.string(),
  phone: yup
    .string()
    .max(20, "Your phone number must be at most 20 characters"),
  description: yup.string(),
});

export const customerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  userName: yup
    .string()
    .required("Please enter your username")
    .max(200, "Your username must be at most 200 characters"),
  password: yup.string().required("Please enter your password"),
  profilePicture: yup.string(),
});

export const createCourseSchema = yup.object().shape({
  title: yup.string().required("Please enter the course title"),
  price: yup
    .number("Price must be a number")
    .typeError("Please enter a valid price")
    .min(0, "Price must be a positive number")
    .required("Please enter the course price"),
  thumbnail: yup.string(),
  description: yup.string(),
});
