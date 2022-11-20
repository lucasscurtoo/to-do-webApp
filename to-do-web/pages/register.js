import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useFormik } from "formik"
import { registerValidation } from "../helpers/validation"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { authRequest } from "../api/auth"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false)
  const [logged, setLogged] = useState(null)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerValidation(),

    onSubmit: (values) => {
      authRequest(values.username, values.password, "/register").then(
        (response) => {
          if (response.status === 200) {
            setLogged(true)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", values.username)
            router.push("/ToDo")
          } else {
            setLogged(false)
            (response)
          }
        }
      )
    },
  })

  return (
    <div className="w-screen h-screen bg-background1 bg-cover bg-no-repeat">
      <form
        className="black-overlay w-full h-full flex justify-center items-center overflow-y-scroll"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full lg:w-1/3 h-4/5 text-white flex flex-col">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-5xl">Register</h1>
            <p className="text-gray-400">Create a new account</p>
          </div>
          <div className="w-full flex flex-col items-center mt-20">
            <section className="w-3/4 md:w-2/4 flex flex-col">
              <p>Username</p>
              <input
                className="py-2.5 pl-3 rounded-sm placeholder:text-grayColor text-black text-sm font-medium"
                placeholder="Username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="relative">
                  <p className="text-red-500 absolute">
                    {formik.errors.username}
                  </p>
                </div>
              )}
            </section>
            <section className="w-3/4 md:w-2/4 flex flex-col mt-8">
              <p>Password</p>
              <div className="w-full py-2 pl-3 flex rounded-sm bg-white">
                <input
                  className="w-4/5 placeholder:text-grayColor text-black text-sm font-medium"
                  placeholder="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {!showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 ml-auto mr-2 text-black"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 ml-auto mr-2 text-black"
                  />
                )}
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="relative">
                  <p className="text-red-500 absolute">
                    {formik.errors.password}
                  </p>
                </div>
              )}
            </section>
            <section className="w-3/4 md:w-2/4 flex flex-col mt-8">
              <p>Repeat password</p>
              <div className="w-full py-2 pl-3 flex rounded-sm bg-white">
                <input
                  className="w-4/5 placeholder:text-grayColor text-black text-sm font-medium"
                  placeholder="Repeat password"
                  name="confirm_password"
                  type={showRepeatedPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.confirm_password}
                />
                {!showRepeatedPassword ? (
                  <EyeSlashIcon
                    onClick={() =>
                      setShowRepeatedPassword(!showRepeatedPassword)
                    }
                    className="w-6 ml-auto mr-2 text-black"
                  />
                ) : (
                  <EyeIcon
                    onClick={() =>
                      setShowRepeatedPassword(!showRepeatedPassword)
                    }
                    className="w-6 ml-auto mr-2 text-black"
                  />
                )}
              </div>
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <div className="relative">
                    <p className="text-red-500 absolute">
                      {formik.errors.confirm_password}
                    </p>
                  </div>
                )}
            </section>
          </div>
          <div className="w-full flex flex-col items-center mt-36">
            <button className="w-64 py-3 rounded-md bg-blueColor" type="submit">
              Register
            </button>
            <section className="flex">
              <p className="text-darkGray text-sm mr-6">
                Already have account?
              </p>
              <Link className="text-sm " href="/">
                Login
              </Link>
            </section>
          </div>
          {logged === false && (
            <div className="mx-auto mt-8">
              <p className="text-red-500"></p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Register
