import * as React from 'react'

export interface MessageContextObject {
  shouldReload: boolean
  setShouldReload: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageContext = React.createContext(null)
