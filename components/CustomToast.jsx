import React, { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CustomToast = ({ notifi, state, show, toastOnClose }) => {
  useEffect(() => {
    if (show) {
      if (!state) {
        toast.error(notifi, {
          theme: "colored",
          onClose: () => toastOnClose(true),
        })
      } else {
        toast.success(notifi, {
          theme: "colored",
          onClose: () => toastOnClose(true),
        })
      }
    }
  }, [show])

  return (
    <div>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
        iconClassName="bg-white"
        position="top-center"
        autoClose={3000}
      />
    </div>
  )
}

export default CustomToast
