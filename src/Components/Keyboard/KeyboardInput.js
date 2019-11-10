import React from 'react'
import { StyleSheet, TextInput, Keyboard as RNKeyboard } from 'react-native'

let _navigation
export class KeyboardInput extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
    paddingBottom: SAFEAREA_BOTTOM,
    textInputHeight: rwd(80),
    replyTo: null,
  }

  componentDidMount() {
    _trace('KeyboardInput')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  _onKeyboardTapped = () => {}
  replyTo = replyTo => {
    this.setState({ replyTo })
  }
  open = (text, options = {}) => {
    let { onSend = () => {}, cancelReplyTo = () => {} } = options
    this.mounted &&
      this.setState({
        text,
      })
    this.onSend = onSend
    this.cancelReplyTo = cancelReplyTo
    this.toolbar.open()
  }

  close = () => {
    this._cancelReplyTo()
    this.toolbar.close()
  }

  render() {
    let {
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
      <T.KeyboardToolbar ref={c => (this.toolbar = c)}>
        <T.Grid
          flex={0}
          width="100%"
          flow="row"
          style={{
            height: textInputHeight,
            padding: rwd(5),
          }}
          activeOpacity={1}
        >
          <T.Center flex={0}>
            <R.Avatar data={global.currentUser} size={rwd(30)} />
          </T.Center>
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
                height: textInputHeight - rwd(5) * 2,
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
                    <T.Label text={`reply to ${replyTo}`} theme="H8" />
                  </T.Center>
                </T.Row>
              ) : null}
              <TextInput
                ref={c => (window.input = c)}
                value={text}
                onChangeText={text => this.setState({ text })}
                onContentSizeChange={e =>
                  this.updateSize(e.nativeEvent.contentSize.height)
                }
                multiline={true}
                height={200}
                style={{
                  flex: 1,
                  backgroundColor: 'rgb(238,238,238)',
                  // height: textInputHeight,
                  // height: 200,
                }}
              />
            </T.Div>
          </T.Center>
          <T.Space />
          <T.Col align="center" flex={0}>
            <T.Label borderWidth={0.6} title="Send" onPress={this._onSend} />
          </T.Col>
        </T.Grid>
      </T.KeyboardToolbar>
    )
  }

  _cancelReplyTo = () => {
    this.setState({ replyTo: null })
    this.cancelReplyTo()
  }
  onSend = () => {}

  _onSend = () => {
    let { text } = this.state
    this.onSend && this.onSend(text)
    this.setState({ text: '' })
  }

  updateSize = textInputHeight => {
    if (textInputHeight <= this.state.textInputHeight) return
    log(textInputHeight, 'textInputHeight')
    this.setState({
      textInputHeight,
    })
    this.forceUpdate()
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
