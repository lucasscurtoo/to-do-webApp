import { useSelector } from "react-redux"
import { useGetUserDarkModeQuery } from "../redux/api/users"
import { listsApi, useGetUserListsQuery } from "../redux/api/lists"
import { setNextTheme } from "../hooks/setNextTheme"
import { useRedirect } from "../hooks/useRedirect"
import { useIsMobile } from "../hooks/useIsMobile"
import NextNProgress from "nextjs-progressbar"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useEffect } from "react"
import Loading from "../components/Loading"
import { wrapper } from "../redux/store"

const ToDoComponent = dynamic(() => import("../components/ToDoComponent"), {
  loading: () => <NextNProgress />,
})

const ToDo = ({ coso }) => {
  const lists = useSelector((state) => state.todoReducer.lists)
  const [loading, setLoading] = useState(true)
  const { username, darkmode } = useSelector((state) => state.userReducer)
  // const { isSuccess: darkmodeCompleted } = useGetUserDarkModeQuery(username)
  // const { isSuccess: listsCompleted } = useGetUserListsQuery(username)
  const { isMobileState } = useIsMobile()
  setNextTheme(darkmode)
  useRedirect()

  useEffect(() => {
    console.log(lists)
  }, [lists])

  // useEffect(() => {
  //   darkmodeCompleted && listsCompleted && setLoading(false)
  // }, [darkmodeCompleted, listsCompleted])

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <ToDoComponent isMobileState={isMobileState} darkmode={darkmode} />
      {/* )} */}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async () => {
      // console.log(store?.dispatch)
      // console.log(req)
      // console.log(res)
      // console.log(etc)

      dispatch(listsApi.endpoints.getUserLists.initiate("lucas"))
      await Promise.all(dispatch(listsApi.util.getRunningQueriesThunk()))
    }
)

export default ToDo
