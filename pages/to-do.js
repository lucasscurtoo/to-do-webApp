import { useSelector } from "react-redux"
import { useGetUserDarkModeQuery } from "../redux/api/users"
import { useGetUserListsQuery } from "../redux/api/lists"
import { setNextTheme } from "../hooks/setNextTheme"
import { useRedirect } from "../hooks/useRedirect"
import { useIsMobile } from "../hooks/useIsMobile"
import NextNProgress from "nextjs-progressbar"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useEffect } from "react"
import Loading from "../components/Loading"

const ToDoComponent = dynamic(() => import("../components/ToDoComponent"), {
  loading: () => <NextNProgress />,
})

const ToDo = () => {
  const [loading, setLoading] = useState(true)
  const { username, darkmode } = useSelector((state) => state.userReducer)
  const { isSuccess: darkmodeCompleted } = useGetUserDarkModeQuery(username)
  const { isSuccess: listsCompleted } = useGetUserListsQuery(username)
  const { isMobileState } = useIsMobile()
  setNextTheme(darkmode)
  useRedirect()

  useEffect(() => {
    darkmodeCompleted && listsCompleted && setLoading(false)
  }, [darkmodeCompleted, listsCompleted])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ToDoComponent isMobileState={isMobileState} darkmode={darkmode} />
      )}
    </>
  )
}

export default ToDo
