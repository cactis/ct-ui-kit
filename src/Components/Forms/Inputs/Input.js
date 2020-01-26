import React from 'react'
import { TextInput as RNTextInput, StyleSheet, Keyboard } from 'react-native'

export { RNTextInput }

let _navigation
let setPosition = false
export class Input extends React.PureComponent {
  state = {
    data: null,

    selection: {
      start: 0,
      end: 0,
    },
  }

  componentDidMount() {
    _trace('Input')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    )
    // this.input?.setNativeProps({ selection: { start: 0, end: 0 } })
    // this.inputRef.setNativeProps({ selection:{ start:1, end:1 } })
  }
  onSelectionChange = e => {
    // if (!this.props.multiline) setPosition = true
    // if (setPosition) {
    //   let { selection } = e.nativeEvent
    //   log(selection, 'selection')
    //   this.setState({ selection })
    // } else {
    //   setPosition = true
    // }
  }
  keyboardDidShow = e => {
    log(e, 'e - in keyboardDidShow')
    this.mounted &&
      this.props.multiline &&
      this.setState({
        height:
          SCREEN_HEIGHT -
          e.endCoordinates.height -
          rwd(iOS ? 138 : 140) -
          SAFEAREA_TOP,
      })

    keyboardDidHide = e => {
      log(e, 'e - in keyboardDidShow')
      this.mounted &&
        this.props.multiline &&
        this.setState({
          height: SCREEN_HEIGHT - rwd(125) - SAFEAREA_TOP,
        })
    }
    // this.props.navigation.setParams({
    // {
    //   keyboardHeight: e.endCoordinates.height,
    //   normalHeight: Dimensions.get('window').height,
    //   shortHeight: Dimensions.get('window').height - e.endCoordinates.height,
    // }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
    if (prevProps.onChangeText !== this.props.onChangeText)
      this.setState({ onChangeText: this.props.onChangeText })
  }

  render() {
    let { multiline = false } = this.props
    let {
      value,
      height = multiline
        ? SCREEN_HEIGHT - rwd(180)
        : rwd(iOS ? (iPhoneX ? 38 : 37) : 42),
    } = this.state
    let lineHeightStyle = multiline
      ? { lineHeight: rwd(25) }
      : { lineHeight: rwd(20) }
    return (
      <T.Row>
        <T.Row
          theme="bordered1"
          style={{
            borderWidth: 0.5,
            borderColor: '#666',
            borderRadius: rwd(3),
            height: height - (iOS ? rwd(10) : rwd(43)),
          }}
          flex={0}
        >
          {/* <T.Scroll> */}
          <RNTextInput
            ref={c => (this.input = c)}
            // selection={this.state.selection}
            // onSelectionChange={this.onSelectionChange}
            flex={1}
            style={{
              ...lineHeightStyle,
              fontSize: rwd(16),
              textAlignVertical: 'top',
              // borderWidth: 0.5,
              // borderColor: 'rgb(172,172,172)',
              padding: rwd(8),
            }}
            autoFocus={true}
            value={value}
            onChangeText={text => this.setState({ value: text })}
            multiline={multiline}
            // height={height}
            // {...this.props}
          />
          {/* </T.Scroll> */}
        </T.Row>
        <T.Space />
        <T.Row flex={0}>
          <T.Button
            backgroundColor={SUBMIT_COLOR}
            theme="pill"
            title="OK"
            color="white"
            onPress={() => {
              log(this.props.onChangeText)
              this.props.onChangeText(this.state.value)
              popup.close()
            }}
          />
        </T.Row>
      </T.Row>
    )
  }

  initStateData = onComplete => {
    let { value } = this.props
    this.mounted &&
      this.setState({ value }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
    Keyboard.removeListener('keyboardDidShow')
    Keyboard.removeListener('keyboardDidHide')
    setPosition = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
