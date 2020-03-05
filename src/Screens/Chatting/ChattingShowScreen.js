import React from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { ChattingBase } from '.'
let _this, _navigation

var ws = null
export class ChattingShowScreen extends ChattingBase {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params?.title,
    }
  }
  state = {
    channel: null,
    mounted: false,
    messages: [],
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
    _navigation = this.props.navigation
    this.connectSocket()
    this.initStateData(() => {
      // this.fetchMessages()
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let { currentUser } = global
    return (
      <T.Screen padding={0}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: currentUser.id,
          }}
        />
      </T.Screen>
    )
  }

  processMessage = data => {
    const message = this.convertMessage(data.message.message)
    this.mounted &&
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [message]),
      }))
  }

  initStateData = onComplete => {
    if (_navigation.state.params) {
      let { data: channel } = _navigation.state.params
      log(channel, 'channel in initStateData')
      let messages = channel.messages.map(item => {
        return this.convertMessage(item)
      })
      // .reverse()
      //
      // _navigation.setParams({ title: '改為新標題' })

      this.mounted &&
        this.setState(
          { messages: messages, channel, room: channel.token },
          () => {
            onComplete && onComplete()
          }
        )
    } else {
      onComplete && onComplete()
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

  componentWillUnmount() {
    this.mounted = false
    ws && ws.close()
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})