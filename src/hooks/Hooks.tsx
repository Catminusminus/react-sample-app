import * as React from 'react'

export const usePrevious = (value: any) => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
