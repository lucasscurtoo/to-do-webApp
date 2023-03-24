import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useFormik } from "formik"
import { registerValidation } from "../helpers/validation"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthRequest, userLogged } from "../redux/reducers/userSlice"
import CustomToast from "../components/CustomToast"
import { useRegisterMutation } from "../redux/api/userAuth"
import { DotLoader } from "react-spinners"

const Register = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  const [register, { isError, isLoading }] = useRegisterMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error, setErrorState] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerValidation(),

    onSubmit: async (values) => {
      const { username, password } = values
      try {
        await register({ username, password }).unwrap()
        router.push("/to-do")
      } catch (error) {
        setErrorState({ state: true, message: error?.data.message })
        setShowToast(true)
      }
    },
  })

  return (
    <div className="w-screen h-screen background1 bg-cover bg-no-repeat">
      {error !== null && (
        <CustomToast
          show={showToast}
          toastOnClose={() => setShowToast(false)}
          notifi={error.state && error.message}
          state={!error.state}
        />
      )}
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
                className="py-2.5 pl-3 rounded-sm dark:bg-white placeholder:text-grayColor text-black text-sm font-medium"
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
                  className="w-4/5 placeholder:text-grayColor dark:bg-white text-black text-sm font-medium"
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
                  className="w-4/5 placeholder:text-grayColor dark:bg-white text-black text-sm font-medium"
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
              <p className="text-grayColor text-sm mr-6">
                Already have account?
              </p>
              <Link className="text-sm " href="/">
                Login
              </Link>
            </section>
            <DotLoader color="#1876f2" loading={isLoading} size={30} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
