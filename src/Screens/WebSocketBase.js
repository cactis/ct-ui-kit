import React from 'react'
import { StyleSheet } from 'react-native'

let ws = null
export class WebSocketBase extends React.PureComponent {
  connectSocket = async () => {
    // alert('connectSocket')
    // alert('connectSocket')
    let accessTokens = global.accessTokens
    // log(accessTokens, 'accessTokens')

    log(AppConfig.webSocket, 'AppConfig.webSocket')
    ws = new WebSocket(AppConfig.webSocket, '', {
      headers: {
        Accesstokens: accessTokens,
      },
    })
    log(ws, 'ws')

    ws.onopen = () => {
      log('onopen-----')
      this._runCommand('subscribe')
      this.mounted && this.setState({ disabled: false })
    }

    ws.onmessage = e => {
      // log(e.data, 'e.data in ws.onmessage')
      const data = JSON.parse(e.data)
      // log(data, 'data')
      if (data.type != 'ping') {
        //   log('ws.onmessage')
        //   log(data, 'data')
      }
      switch (data.type) {
        case 'ping':
          break
        case 'welcome':
        case 'confirm_subscription':
          // log('confirmation_subscription')
          log(data, 'data system message')
          break
        default:
          log(data, 'data 需要處理')
          this.processMessage(data)
      }
    }

    ws.onerror = e => {
      log(e.message, 'e.message')
    }

    ws.onclose = e => {
      this.mounted && delayed(() => {})
    }
  }

  processMessage = data => {}

  _runCommand = (command, content) => {
    log(command, 'command')
    let { room } = this.state
    // log(channel, 'channel in _runCommand')
    if (room) {
      var message = {
        command: command,
        identifier: '{"channel": "ChatChannel", "room": "' + room + '"}',
      }
      message.data = content
      const text = JSON.stringify(message)
      // log(text, 'text in _runCommand')
      ws.send(text)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
