import * as React from 'react'
import { postMessage, Message } from '../client'
import { MessageContext, PartialMessageContextObject } from '../context'
import { Button, Form, Segment, TextArea } from 'semantic-ui-react'

interface MessageFormProps {
  channelName: string
}

interface MessageFormState {
  body?: string
}

export const MessageForm: React.FC<MessageFormProps> = props => {
  const [state, useState] = React.useState<MessageFormState>({
    body: ''
  })
  const messageContext = React.useContext<PartialMessageContextObject>(
    MessageContext
  )
  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    useState({ body: e.currentTarget.value })
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: Message = { body: state.body }
    try {
      await postMessage(props.channelName, payload)
      useState({ body: '' })
      messageContext.setShouldReload(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Segment basic textAlign="center">
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Field>
          <TextArea
            autoHeight
            placeholder="Write your message"
            value={state.body}
            onChange={onChange}
          />
        </Form.Field>
        <Button primary type="submit">
          Send
        </Button>
      </Form>
      <p>value: {state.body}</p>
    </Segment>
  )
}
