import React from 'react'
import { StyleSheet, TextInput, Keyboard as RNKeyboard } from 'react-native'
export { RNKeyboard }
let _navigation
export class KeyboardInput extends React.PureComponent {
  state = {
    avatar: true,
    data: null,
    mounted: false,
    paddingBottom: SAFEAREA_BOTTOM,
    textInputHeight: rwd(80),
    replyTo: null,
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  _onKeyboardTapped = () => { }
  replyTo = (replyTo) => {
    this.setState({ replyTo })
  }
  open = (text, options = {}) => {
    let { avatar = this.state.avatar } = options
    let { onSend = () => { }, cancelReplyTo = () => { } } = options
    this.mounted &&
      this.setState({
        text,
        avatar,
        options,
      })
    this.onSend = onSend
    this.cancelReplyTo = cancelReplyTo
    this.toolbar.open()
  }

  close = () => {
    this._cancelReplyTo()
    this.toolbar?.close()
  }

  render() {
    let {
      avatar,
      text,
      textInputHeight,
      title,
      content,
      paddingBottom,
      replyTo,
    } = this.state

    // log(textInputHeight, 'textInputHeight')
    let modalHeight = textInputHeight + rwd(5) + (iPhoneX ? rwd(10) : rwd(5))
    // alert(modalHeight)
    return (
      <T.KeyboardToolbar ref={(c) => (this.toolbar = c)}>
        <T.Grid
          flex={0}
          width="100%"
          flow="row"
          style={{
            height: textInputHeight,
            padding: rwd(5),
          }}
          backgroundColor_="red"
          activeOpacity={1}
        >
          {avatar ? (
            <T.Center flex={0}>
              <R.Avatar data={window.currentUser} size={rwd(30)} />
            </T.Center>
          ) : null}
          <T.Space />
          <T.Center
            height="auto"
          // height={textInputHeight + rwd(5) + iPhoneX ? rwd(10) : rwd(5)}
          >
            <T.Div
              style={{
                // backgroundColor: 'white',
                backgroundColor: 'rgb(238,238,238)',
                width: '100%',
                borderRadius: rwd(20),
                padding: rwd(4),
                paddingHorizontal: rwd(10),
                // borderWidth: 0.4,
                // borderColor: '#999',
                height: textInputHeight - rwd(5) * (iOS ? 2 : 1),
              }}
            >
              {replyTo ? (
                <T.Row flex={0} yAlign="flex-start" id="replyTo">
                  <T.Center
                    flex={0}
                    flow="row"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: rwd(20),
                      paddingRight: rwd(8),
                      paddingVertical: rwd(2),
                    }}
                  >
                    <T.Icon
                      name="close"
                      onPress={this._cancelReplyTo}
                      color="rgb(186,186,186)"
                      size={rwd(14)}
                    />
                    <T.Label text={`回覆 ${replyTo}`} theme="H8" />
                  </T.Center>
                </T.Row>
              ) : null}
              <TextInput
                ref={(c) => (window.input = c)}
                value={text}
                onChangeText={(text) => this.setState({ text })}
                onContentSizeChange__={(e) =>
                  this.updateSize(e.nativeEvent.contentSize.height)
                }
                multiline={true}
                placeholder="回覆…"
                // height={200}
                style={{
                  flex: 1,
                  // textAlign: 'center',
                  backgroundColor: 'rgb(238,238,238)',
                  // backgroundColor: 'red',
                  // height: textInputHeight,
                  // height: 200,
                }}
              />
            </T.Div>
          </T.Center>
          <T.Space />
          <T.Col align="center" flex={0}>
            <T.Button
              // native={true}
              borderWidth={0.6}
              title="送出"
              borderRadius={SIZE.l}
              onPress={this._onSend}
              backgroundColor={BUTTON_COLOR}
              color={LIGHT_COLOR}
            />
          </T.Col>
        </T.Grid>
        {/* <T.Space size={SAFEAREA_BOTTOM} /> */}
      </T.KeyboardToolbar>
    )
  }

  _cancelReplyTo = () => {
    this.setState({ replyTo: null })
    this.cancelReplyTo && this.cancelReplyTo()
  }
  onSend = () => { }

  _onSend = () => {
    let { text } = this.state
    this.onSend && this.onSend(text)
    this.setState({ text: '' })
    RNKeyboard.dismiss()
  }

  updateSize = (textInputHeight) => {
    if(textInputHeight <= this.state.textInputHeight) return
    log(textInputHeight, 'textInputHeight')
    this.setState({
      textInputHeight,
    })
    this.forceUpdate()
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
