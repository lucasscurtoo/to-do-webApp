import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useFormik } from "formik"
import { loginValidation } from "../helpers/validation"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import CustomToast from "./CustomToast"
import { useDispatch, useSelector } from "react-redux"
import { setRedirected, userLogged } from "../redux/reducers/userSlice"
import { useLoginMutation } from "../redux/api/userAuth"
import { DotLoader } from "react-spinners"

const Login = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  const isRedirected = useSelector((state) => state.userReducer.isRedirected)
  const [login, { isError, isLoading }] = useLoginMutation()
  const [showToast, setShowToast] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setErrorState] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (isRedirected) {
      setErrorState({ state: true, message: "Log in before" })
      setShowToast(true)
      setRedirected(false)
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation(),

    onSubmit: async (values) => {
      try {
        const user = await login(values).unwrap()
        dispatch(
          userLogged({ username: values.username, token: user.data.token })
        )
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
        className="black-overlay w-full h-full flex justify-center items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full lg:w-1/3 h-4/5 text-white flex flex-col">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-5xl">Welcome</h1>
            <p className="text-gray-400">Login to your account</p>
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
                  className="w-4/5 dark:bg-white placeholder:text-grayColor text-black text-sm font-medium"
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
              {formik.touched.password &&
                formik.errors.password &&
                (
                  <div className="relative">
                    <p className="text-red-500 absolute">
                      {formik.errors.password}
                    </p>
                  </div>
                ) === false}
            </section>
          </div>
          <div className="w-full flex flex-col items-center mt-36">
            <button className="w-64 py-3 rounded-md bg-blueColor" type="submit">
              Log In
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

export default Login
