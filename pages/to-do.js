import { useSelector } from "react-redux"
import { useGetUserDarkModeQuery } from "../redux/api/users"
import { useGetUserListsQuery } from "../redux/api/lists"
import { setNextTheme } from "../hooks/setNextTheme"
import { useRedirect } from "../hooks/useRedirect"
import { useIsMobile } from "../hooks/useIsMobile"
import { useState } from "react"
import { useEffect } from "react"
import Loading from "../components/LoadingScreen"
import dynamic from "next/dynamic"
import Head from "next/head"

const ToDoComponent = dynamic(() => import("../components/todo/ToDoComponent"))

const ToDo = () => {
  const [loading, setLoading] = useState(true)
  const darkmode = useSelector((state) => state.userReducer.darkmode)
  const username = useSelector((state) => state.userReducer.username)
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  const { isSuccess: darkmodeCompleted } = useGetUserDarkModeQuery(username, {
    skip: !isLoggedIn,
  })
  const { isSuccess: listsCompleted } = useGetUserListsQuery(username, {
    skip: !isLoggedIn,
  })
  const { isMobileState } = useIsMobile()
  setNextTheme(darkmode)
  useRedirect()

  useEffect(() => {
    darkmodeCompleted && listsCompleted && setLoading(false)
  }, [darkmodeCompleted, listsCompleted])

  return (
    <>
      <div>
        <Head>
          <title>To-Do List</title>
          <meta name="description" content="My personal to-do project" />
          <meta name="keywords" content="nextjs, react, web development" />
        </Head>
        {loading ? (
          <Loading />
        ) : (
          <ToDoComponent isMobileState={isMobileState} darkmode={darkmode} />
        )}
      </div>
    </>
  )
}

export default ToDo
