import { useState } from "react"
import Link from "next/link"
import { useFormik } from "formik"
import { loginValidation } from "../../helpers/validation"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { DotLoader } from "react-spinners"
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
        <div className="w-full lg:w-1/3 h-4/5 text-white flex flex-col">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-5xl">Welcome</h1>
            <p className="text-gray-400">Login to your account</p>
          </div>
          <div className="w-full flex flex-col items-center mt-20 space-y-4">
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
                    className="w-6 ml-auto mr-2 text-black"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 ml-auto mr-2 text-black"
                  />
                )
              }
            />
          </div>

          <div className="w-full flex flex-col items-center mt-36">
            <button className="w-64 py-3 rounded-md bg-blueColor" type="submit">
              Log in
            </button>
            <section className="flex">
              <p className="text-darkGray text-sm mr-6">Don’t have account?</p>
              <Link className="text-sm " href="/register">
                Create Now
              </Link>
            </section>
            <DotLoader color="#1876f2" loading={isLoading} size={30} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
