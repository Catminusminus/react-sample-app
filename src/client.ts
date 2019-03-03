import Axios, { AxiosInstance, AxiosResponse, CancelToken } from 'axios'

// write your firebase api url
const baseURL = ''

const instance: AxiosInstance = Axios.create({
  baseURL,
  timeout: 10000
})

export interface Message {
  id?: string
  body?: string
  user?: {
    id?: string
    name?: string
    avatar?: string
  }
  date?: string
}

export const fetchMessages = (
  channelName: string,
  params = {},
  cancelToken: CancelToken = null
): Promise<AxiosResponse<{ messages: Message[] }>> =>
  instance.get(`/channels/${channelName}/messages`, {
    params,
    cancelToken
  })

export const postMessage = (
  channelName: string,
  payload: Message,
  cancelToken: CancelToken = null
): Promise<AxiosResponse> =>
  instance.post(`/channels/${channelName}/messages`, payload, {
    cancelToken
  })
