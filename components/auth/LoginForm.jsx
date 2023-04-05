import { useState } from "react"
import Link from "next/link"
import { useFormik } from "formik"
import { loginValidation } from "../../helpers/validation"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { BarLoader } from "react-spinners"
import BackgroundImage from "../BackgroundImage"
import ShowError from "../ShowError"
import InputField from "../../common/InputField"

const LoginForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation(),

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
        <div className="w-full md:1/2 h-4/5 text-white flex flex-col items-center">
          <div className="sm:w-1/3 md:h-1/2 flex flex-col items-center">
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
          </div>

          <div className="w-full flex flex-col items-center mt-36">
            <button
              className="w-64 py-3 rounded-md bg-blueColor hover:bg-blue-400"
              type="submit"
            >
              Log in
            </button>
            <section className="flex my-2">
              <p className="text-darkGray text-sm mr-6">Don’t have account?</p>
              <Link
                className="text-sm text-gray-300 hover:text-white"
                href="/register"
              >
                Create Now
              </Link>
            </section>
            <BarLoader color="#00d7ee" loading={isLoading} width={200} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
