import { useState } from "react"
import Link from "next/link"
import { useFormik } from "formik"
import { registerValidation } from "../../helpers/validation"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { BarLoader } from "react-spinners"
import InputField from "../../common/InputField"
import BackgroundImage from "../BackgroundImage"
import ShowError from "../ShowError"

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repeatedPassword: "",
    },
    validationSchema: registerValidation(),

    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <div className="w-screen h-screen overflow-y-scroll">
      <BackgroundImage />
      <ShowError />
      <form
        className="black-overlay w-full h-full flex justify-center items-center z-10 relative"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-1/2 h-4/5 text-white flex flex-col items-center">
          <div className="w-1/3 flex flex-col items-center">
            <h1 className="text-6xl">Welcome</h1>
            <p className="text-xl text-gray-400 mb-10">Login to your account</p>
            <InputField
              label="Username"
              placeholder="Username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              touched={formik.touched.username}
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : null
              }
            />

            <InputField
              label="Password"
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              touched={formik.touched.password}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
              icon={
                !showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 ml-auto mr-2 text-black cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 ml-auto mr-2 text-black cursor-pointer"
                  />
                )
              }
            />

            <InputField
              label="Repeated password"
              placeholder="Repeat password"
              name="repeatedPassword"
              type={showRepeatedPassword ? "text" : "password"}
              value={formik.values.repeatedPassword}
              onChange={formik.handleChange}
              touched={formik.touched.repeatedPassword}
              error={
                formik.touched.repeatedPassword &&
                formik.errors.repeatedPassword
                  ? formik.errors.repeatedPassword
                  : null
              }
              icon={
                !showRepeatedPassword ? (
                  <EyeSlashIcon
                    onClick={() =>
                      setShowRepeatedPassword(!showRepeatedPassword)
                    }
                    className="w-6 ml-auto mr-2 text-black cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() =>
                      setShowRepeatedPassword(!showRepeatedPassword)
                    }
                    className="w-6 ml-auto mr-2 text-black cursor-pointer"
                  />
                )
              }
            />
          </div>

          <div className="w-full flex flex-col items-center mt-36">
            <button className="w-64 py-3 rounded-md bg-blueColor hover:bg-blue-400">
              Register
            </button>
            <section className="flex my-2">
              <p className="text-darkGray text-sm mr-6">
                Already have account?
              </p>
              <Link className="text-sm text-gray-300 hover:text-white" href="/">
                Login
              </Link>
            </section>
            <BarLoader color="#00d7ee" loading={isLoading} width={200} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
