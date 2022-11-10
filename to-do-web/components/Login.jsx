import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import { loginValidation } from "../helpers/validation";
import { authRequest } from "../api/auth";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useRedirect } from "./RedirectContext";
import CustomToast from "./CustomToast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logged, setLogged] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { redirect } = useRedirect();
  const router = useRouter();

  useEffect(() => {
    if (redirect) {
      setShowToast(true);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation(),

    onSubmit: (values) => {
      authRequest(values.username, values.password, "/login").then(
        (response) => {
          if (response.status === 200) {
            setLogged(true);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", values.username)
            router.push("/ToDo");
          } else {
            setLogged(false);
          }
        }
      );
    },
  });

  return (
    <div className="w-screen h-screen bg-background1 bg-cover bg-no-repeat">
      <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={redirect && "Please log in before"}
        state={!redirect}
      />
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
          </div>
          {logged === false && (
            <div className="mx-auto mt-8">
              <p className="text-red-500">Inocrrect Credentials</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
