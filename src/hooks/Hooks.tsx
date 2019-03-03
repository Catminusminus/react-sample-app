import * as React from 'react'

export const usePrevious = <T extends {}>(value: T) => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
