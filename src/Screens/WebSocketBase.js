import React from 'react'
import { StyleSheet } from 'react-native'

let ws = null
export class WebSocketBase extends React.PureComponent {
  tries = 0
  connectSocket = async () => {
    // alert('connectSocket')
    // alert('connectSocket')
    let accessTokens = global.accessTokens
    log(accessTokens, 'accessTokens')

    log(AppConfig.webSocket, 'AppConfig.webSocket')
    ws = new WebSocket(AppConfig.webSocket, '', {
      headers: {
        Accesstokens: accessTokens,
        appName: AppConfig.appName,
      },
    })
    log(ws, 'ws')

    ws.onopen = () => {
      // _alert('connected')
      // log('onopen-----')

      // if (__DEV__) alert('onopen')
      this._runCommand('subscribe')
      this.mounted && this.setState({ disabled: false })
    }

    ws.onmessage = (e) => {
      // __log(e.data, 'e.data in ws.onmessage')
      const data = JSON.parse(e.data)
      // log(data, 'data')

      if (data.type != 'ping') {
        //   log('ws.onmessage')
        //   log(data, 'data')
      }

      switch (data.type) {
        case 'ping':
          break
        case 'confirm_subscription':
          log(data.type, 'data.type')
          this.tries = 0
          this.connected = true
          // log('confirmation_subscription')
          // log(data,  'data system message')
          break
        case 'welcome':
          log(data.type, 'data.type')
          // this.reconnect()
          // runLast(() => {
          //   this.reconnect()
          // })
          // break
          // this.connected = false
          this.reconnect()
          break
        default:
          // log(data,  'data 需要處理')
          log(data.type, 'data.type')
          this.processMessage(data)
      }
    }

    ws.onerror = (e) => {
      log(e.message, 'e.message in onerror')
      this.connected = false
      this.reconnect()
    }

    ws.onclose = (e) => {
      // _alert('closed')
      this.connected = false
      this.reconnect()
    }
  }

  reconnect = () => {
    // _alert('reconnect')

    delayed(() => {
      if (this.tries < 10 && !this.connected && this.mounted) {
        this.tries = this.tries + 1
        // _alert('onclose: connecting...')
        this.connectSocket()
      }
    })
  }

  processMessage = (data) => {}

  _runCommand = (command, content) => {
    log(command, 'command in WebSocketBase#_runCommand')
    log(content, 'content in WebSocketBase#_runCommand')
    let { room } = this.state
    log(room, 'room')
    // log(channel, 'channel in _runCommand')
    if (room) {
      var message = {
        command: command,
        identifier: '{"channel": "ChatChannel", "room": "' + room + '"}',
      }
      message.data = content
      const text = JSON.stringify(message)
      log(text, 'text in _runCommand')
      ws.send(text)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
