// import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export function useDebounceValue(initialValue = '', delayTime = 1500) {
  const [debounceValue, setDebounceValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setDebounceValue(initialValue)
      setIsLoading(false)
    }, delayTime)

    return () => clearTimeout(timer)
  }, [delayTime, initialValue])

  return { debounceValue, isLoading }
}
