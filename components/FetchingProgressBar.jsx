import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PropagateLoader } from "react-spinners"

const FetchingProgressBar = () => {
  const loadingUserSlice = useSelector((state) => state.userReducer.loading)
  const loadingTodoSlice = useSelector((state) => state.todoReducer.loading)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadingTodoSlice || loadingUserSlice ? setLoading(true) : setLoading(false)
  }, [loadingUserSlice, loadingTodoSlice])

  if (loading) {
    return (
      <PropagateLoader
        color="#00d7ee"
        cssOverride={{
          width: "100vw",
          position: "absolute",
          zIndex: "100",
        }}
      />
    )
  }
}

export default FetchingProgressBar
