import { useState } from "react"
import { useEffect } from "react"

export const useIsMobile = () => {
  const [isMobileState, setIsMobileState] = useState()

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = width < 768 ? true : false
    if (isMobile) {
      setIsMobileState(true)
    }
  }, [])

  return {
    isMobileState,
  }
}
