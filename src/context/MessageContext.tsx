import * as React from 'react'

interface MessageContextObject {
  shouldReload: boolean
  setShouldReload: React.Dispatch<React.SetStateAction<boolean>>
}

export type PartialMessageContextObject = Partial<MessageContextObject>

export const MessageContext = React.createContext<PartialMessageContextObject>(
  {}
)
