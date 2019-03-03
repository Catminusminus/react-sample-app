import * as React from 'react'
import { match } from 'react-router-dom'
import { MessageForm, MessageFeed } from '../components'
import { MessageContext } from '../context'
interface ChannelMatch {
  channelName: string
}

interface ChannelProps {
  match: match<ChannelMatch>
}

export const Channel: React.FC<ChannelProps> = props => {
  const { channelName } = props.match.params
  const [shouldReload, setShouldReload] = React.useState(false)
  return (
    <MessageContext.Provider
      value={{ shouldReload: shouldReload, setShouldReload: setShouldReload }}
    >
      <MessageFeed channelName={channelName} />
      <MessageForm channelName={channelName} />
    </MessageContext.Provider>
  )
}
