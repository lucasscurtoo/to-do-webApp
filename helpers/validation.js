import * as Yup from "yup"

export const loginValidation = () =>
  Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be more than 4 characters")
      .required("Cannot be empty"),
    password: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .required("Cannot be empty"),
  })

export const registerValidation = () =>
  Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be more than 4 characters")
      .required("Cannot be empty"),
    password: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .required("Cannot be empty"),
    repeatedPassword: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .required("Cannot be empty")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  })
