import React from 'react'
import { StyleSheet, TextInput, Keyboard as RNKeyboard } from 'react-native'
import ModalBox from 'react-native-modalbox'
// import { AutoGrowTextInput } from 'react-native-auto-grow-textinput'
export { RNKeyboard }

let _navigation
export class KeyboardInput extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
    paddingBottom: SAFEAREA_BOTTOM,
    textInputHeight: rwd(50),
  }

  componentDidMount() {
    _trace('KeyboardInput')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
    // this.keyboardShowListener = RNKeyboard.addListener('keyboardDidShow', e =>
    //   this.keyboardShow(e)
    // )
    // this.keyboardHideListener = RNKeyboard.addListener('keyboardDidHide', e =>
    //   this.keyboardHide(e)
    // )
  }
  keyboardShow(e) {
    // alert('change ------------')
    this.setState({
      // paddingBottom: SAFEAREA_BOTTOM,
    })
  }

  keyboardHide(e) {
    this.setState({
      paddingBottom: 0,
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }
  _onKeyboardTapped = () => {}

  open = (text, onSend = () => {}, options = {}) => {
    // log(options, 'options')
    // let { title } = options
    this.mounted &&
      this.setState({
        // title,
        text,
      })
    this.onSend = onSend
    log(this.state, 'this.state')
    this.modal.open()
  }
  close = () => {
    this.modal.close()
  }

  render() {
    let { text, textInputHeight, title, content, paddingBottom } = this.state
    log(textInputHeight, 'textInputHeight')
    let containerHeight =
      textInputHeight + rwd(5) + (iPhoneX ? rwd(10) : rwd(5))
    // alert(containerHeight)
    return (
      <ModalBox
        ref={c => (this.modal = c)}
        flex={0}
        position="bottom"
        entry="bottom"
        backdropOpacity={0.5}
        backdrop={false}
        backdropPressToClose={false}
        style={{
          borderTopWidth: 0.5,
          borderColor: '#999',
          // backgroundColor: 'white',
          // padding: rwd(10),
          // marginTop: -1 * (iOS ? 0 : STATUSBAR_HEIGHT),
          // paddingHorizontal: rwd(20),
          // paddingTop: SAFEAREA_TOP + rwd(10),
          backgroundColor: 'rgba(241,242,242,1)',
          // flex: 0,
          height: containerHeight,
        }}
      >
        <T.Grid
          // margin={rwd(20)}
          flex={0}
          // paddingHorizontal={rwd(5)}
          // paddingVertical={rwd(5)}
          width="100%"
          flow="row"
          style={{
            // height: 'auto',
            height: textInputHeight,
            // borderRadius: rwd(40),
            // borderWidth: 1,
            padding: rwd(5),

            // paddingBottom: iPhoneX ? rwd(10) : rwd(5),
            // paddingBottom: 0,
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
            <TextInput
              value={text}
              onChangeText={text => this.setState({ text })}
              onContentSizeChange={e =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
              multiline={true}
              height={200}
              style={{
                flex: 1,
                height: textInputHeight,
                height: 200,
                backgroundColor: 'white',
                width: '100%',
                borderColor: '#999',
                borderRadius: rwd(5),
                padding: rwd(8),
                borderWidth: 0.4,
              }}
            />
          </T.Center>
          <T.Space />
          <T.Center flex={0}>
            <T.Label borderWidth={0.6} title="Send" onPress={this._onSend} />
          </T.Center>
        </T.Grid>
      </ModalBox>
    )
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
