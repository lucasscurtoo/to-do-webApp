import { useSelector } from "react-redux"
import { useGetUserDarkModeQuery } from "../redux/api/users"
import { useGetUserListsQuery } from "../redux/api/lists"
import { setNextTheme } from "../hooks/setNextTheme"
import { useRedirect } from "../hooks/useRedirect"
import { useIsMobile } from "../hooks/useIsMobile"
import NextNProgress from "nextjs-progressbar"
import dynamic from "next/dynamic"

const ToDoComponent = dynamic(() => import("../components/ToDoComponent"), {
  loading: () => <NextNProgress />,
})

const ToDo = () => {
  const { isMobileState } = useIsMobile()
  const username = useSelector((state) => state.userReducer.username)
  const { data: darkmode } = useGetUserDarkModeQuery(username)
  useGetUserListsQuery(username)
  setNextTheme(darkmode)
  useRedirect()

  return (
    <>
      <ToDoComponent isMobileState={isMobileState} darkmode={darkmode} />
    </>
  )
}

export default ToDo
