import React from 'react'
import { StyleSheet, TextInput, Keyboard as RNKeyboard } from 'react-native'
import ModalBox from 'react-native-modalbox'
// import { AutoGrowTextInput } from 'react-native-auto-grow-textinput'
// export { RNKeyboard }

let _navigation
const _TEXT_INPUT_HEIGHT = rwd(0)
export class KeyboardToolbar extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
    paddingBottom: SAFEAREA_BOTTOM,
    textInputHeight: _TEXT_INPUT_HEIGHT,
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
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  _onKeyboardTapped = () => {}
  // replyTo = replyTo => {
  //   this.setState({ replyTo })
  // }

  open = (content, options = {}) => {
    // log(options, 'options')
    this.mounted &&
      this.setState({
        content,
        options: {
          ...{ title: null, ...this.state._options, ...options },
        },
      })
    // log(this.state, 'this.state')
    this.modal.open()
  }

  close = () => {
    // this._cancelReplyTo()
    this.modal.close()
  }

  render() {
    let {
      content,
      options = {},
      textInputHeight,
      paddingBottom,
      replyTo,
    } = this.state
    // log(iPhoneX, 'iPhoneX --------------')
    let {
      modalHeight = textInputHeight + (iPhoneX ? rwd(0) : rwd(0)),
    } = options
    let { children = content, title: propTitle, height } = this.props
    // log(textInputHeight, 'textInputHeight')

    // alert(modalHeight)
    return (
      <ModalBox
        useNativeDriver={true}
        ref={(c) => (this.modal = c)}
        // flex={0}
        borderWidth={1}
        position="bottom"
        // backgroundColor="red"
        entry="bottom"
        // zIndex={1000000}
        // animationDuration={0}
        backdrop={false}
        style={{
          borderTopWidth: 0.5,
          borderColor: '#999',
          backgroundColor: 'rgba(255,255,255,1)',
          // backgroundColor: 'red',
          // height: modalHeight,

          height: 'auto',
          // height: rwd(50),
        }}
      >
        <T.Grid flex={0}>{children}</T.Grid>
      </ModalBox>
    )
  }

  // _cancelReplyTo = () => {
  //   this.setState({ replyTo: null })
  //   this.cancelReplyTo()
  // }
  // onSend = () => {}

  // _onSend = () => {
  //   let { text } = this.state
  //   this.onSend && this.onSend(text)
  //   this.setState({ text: '' })
  // }

  // updateSize = textInputHeight => {
  //   if (textInputHeight <= this.state.textInputHeight) return
  //   log(textInputHeight, 'textInputHeight')
  //   this.setState({
  //     textInputHeight,
  //   })
  //   this.forceUpdate()
  // }

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
  autoRun = () => {}
}
var styles = StyleSheet.create({})
