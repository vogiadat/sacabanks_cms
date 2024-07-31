import { useEffect, useState } from 'react'

export const useFakeRender = () => {
  const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    // ! Bùa show Loading sử dụng để ẩn tạm layout khi đang check auth, thay đổi timeout nếu quá nhanh
    const timeoutId = setTimeout(() => {
      setIsRendering(false)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  return isRendering
}
