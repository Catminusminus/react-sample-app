import * as React from 'react'
import { fetchMessages, Message } from '../client'
import { usePrevious } from '../hooks'
import { MessageContext, MessageContextObject } from '../context'
import { Comment, Header } from 'semantic-ui-react'
import Axios from 'axios'

interface MessageFeedProps {
  channelName: string
}

interface MessageFeedState {
  messages: Message[]
}

export const MessageFeed: React.FC<MessageFeedProps> = props => {
  const [state, setState] = React.useState<MessageFeedState>({ messages: [] })
  const preProps = usePrevious<MessageFeedProps>(props)
  const cancelTokenSource = React.useRef(null)
  const messageContext = React.useContext<MessageContextObject>(MessageContext)
  React.useEffect(() => {
    const handleMessages = async (channelName: string) => {
      try {
        cancelTokenSource.current = Axios.CancelToken.source()
        const response = await fetchMessages(
          channelName,
          {},
          cancelTokenSource.current.token
        )
        setState({ messages: response.data.messages })
      } catch (err) {
        console.log(err)
      }
    }
    if (
      !preProps ||
      preProps.channelName !== props.channelName ||
      messageContext.shouldReload
    ) {
      if (messageContext.shouldReload) {
        messageContext.setShouldReload(false)
      }
      handleMessages(props.channelName)
    }
  }, [messageContext, preProps, props])
  React.useEffect(
    () => () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('This component has been unmounted')
      }
    },
    [cancelTokenSource]
  )
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        {props.channelName}
      </Header>
      {state.messages
        .slice()
        .reverse()
        .map(message => (
          <Comment key={message.id}>
            <Comment.Avatar src={message.user.avatar || '/img/avatar.png'} />
            <Comment.Content>
              <Comment.Author as="a">{message.user.name}</Comment.Author>
              <Comment.Metadata>
                <div>{message.date}</div>
              </Comment.Metadata>
              <Comment.Text>{message.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
    </Comment.Group>
  )
}
