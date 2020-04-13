import React from 'react'
import { WebSocketBase } from '../WebSocketBase'
export class ChattingBase extends WebSocketBase {
  state = {
    data: null,
    mounted: false,
    messages: [],
  }

  convertMessage = message => {
    // log(message, 'mesage in convertMessage')
    if (!message) return {}
    const user = message.user
    return {
      _id: message.id,
      image: message.image,
      text: !message.image ? message.content : '',
      createdAt: message.created_at,
      user: {
        _id: user.id,
        name: user.name,
        avatar: user.avatar_url,
      },
    }
  }

  onSend(messages = []) {
    let { channel } = this.state
    let message = messages[0]

    let msg = JSON.stringify({
      chat_id: `${channel.id}`,
      content: `${message.text}`,
    })
    this._runCommand('message', msg)
  }

  fetchMessages = async (page = 1) => {
    // log('fetchMessages')
    let { channel } = this.state
    // log(channel, 'channel in fetchMessages')
    if (channel) {
      let url = `/channels/${channel.id}/messages`
      let res = await T.Api.get(url)
      let { data } = res
      let messages = data.map(item => {
        return this.convertMessage(item)
      })
      this.setState({ messages: messages.reverse() })
    }
  }

  seeds = () => {
    return [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]
  }
}
