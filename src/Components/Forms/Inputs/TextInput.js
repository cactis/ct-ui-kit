import React, { PureComponent as Component } from 'react'
import { TextInput as PureRNTextInput, StyleSheet } from 'react-native'
import { Grid, Row } from '../../'

import * as T from '../..'
import { Input } from './Input'
import { size } from '../../../Constants'

let _navigation
export class TextInput extends React.PureComponent {
  state = {
    data: null,
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

  openInput = () => {
    // alert()
    let { multiline = false, onChangeText, ...props } = this.props
    editor.open(
      <Input
        multiline={multiline}
        value={this.state.value}
        onChangeText={(value) => {
          // alert(value, 'value')
          this.setState({ value: value })
          this.forceUpdate()
          onChangeText && onChangeText(value)
        }}
        {...props}
        // value="aa"
      />,
      {
        title: 'Edit',
        // height: SCREEN_HEIGHT / 2,
        position: iOS ? 'bottom' : 'top',
        fullScreen: true,
        swipeToClose: false,
      }
    )
  }

  render() {
    let { value } = this.state
    let { multiline, height = multiline ? rwd(150) : rwd(40) } = this.props
    // log(height, 'height')

    return (
      <T.Row
        // theme="bordered"
        onPress={this.openInput}
        // height={height}
        // backgroundColor="green"
        // borderWidth={3}
        // padding={SIZE.l}
        style={{ height: height, flex: 1, width: '100%', padding_: SIZE.t }}
        // xAlign="center"
      >
        {multiline && false ? (
          <T.Scroll
            onPress={this.openInput}
            // borderWidth={13}
            padding={SIZE.s}
            // width="100%"
            // flex={1}
            style={
              {
                // width: '100%',
                // flex: 1,
                // height: height,
                // borderWidth: 3,
                // backgroundColor: 'red',
              }
            }
          >
            <T.Text
              // onPress={this.openInput}
              numberOfLines={0}
              text={value}
              // height="100%"
              // style={{ backgroundColor__: 'red', height: '100%' }}
              // onPress={this.openInput}
              // backgroundColor="white"
            >
              {value}
            </T.Text>
          </T.Scroll>
        ) : (
          <T.Text text={value} numberOfLines={10} backgroundColor_="red" />
        )}
      </T.Row>
    )
    // return (
    //   <T.Row>
    //     <T.Row theme="bordered" onPress={() => log('hi')}>
    //       <T.Text numberOfLines={0} text={value} />
    //     </T.Row>
    //     <T.Row theme="bordered">
    //       <T.Text numberOfLines={0} text={value} />
    //     </T.Row>
    //     <T.Row onPress={() => log('hi')}>
    //       <T.Text numberOfLines={0} text={value} />
    //     </T.Row>
    //     <T.Row theme="bordered" onPress={() => log('hi')}>
    //       <T.Text numberOfLines={0} text={value} />
    //     </T.Row>
    //   </T.Row>
    // )
  }
  initStateData = (onComplete) => {
    let { value } = this.props
    this.mounted &&
      this.setState({ value }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})

// -----------------------------

export class TextInput1 extends Component {
  state = {
    value: null,
  }

  componentDidMount() {
    let { onChangeText } = this.props
    if (onChangeText) {
      this.onChangeText = onChangeText
    } else {
      this.onChangeText()
    }
  }
  onChangeText = (text) => {
    __warning__('TextInput: 請設定 onChangeText 回呼屬性')
  }

  render() {
    let {
      multiline = false,
      fontSize = iOS ? rwd(14) : rwd(14),
      value,
      backgroundColor = 'rgb(242,240,240)',
      height,
      placeholderTextColor = BCOLOR,
      // placeholderTextColor = 'red',
      editable = true,
      bordered = true,
      ...props
    } = this.props
    let borderStyle =
      false && bordered && editable
        ? {
            borderWidth: 0.5,
            borderColor: 'rgba(1,1,1,0.4)',
            borderRadius: rwd(3),
          }
        : {}
    // log(props, 'props')
    let alignTop = iOS && multiline ? {} : { textAlignVertical: 'top' }
    let heightStyle = this.props.height
      ? { height: height - 20 }
      : { height: fontSize * (iOS ? 2.5 : 2) }
    return (
      <Grid
        // paddingVertical={rwd(5)}
        backgroundColor="rgb(255,255,255)"
        // backgroundColor="red"
        // width="100%"
        // style={{ ...heightStyle }}
        style={{
          ...borderStyle,
          ...heightStyle,

          // paddingVertical: rwd(10),
        }}
        // xAlign="center"
      >
        {/* <Row
        // borderColor="rgb(203,201,196)"
        // paddingVertical={rwd(iOS ? 10 : 0)}
        // paddingHorizontal={rwd(10)}
        // backgroundColor={backgroundColor}
        // xAlign="center"
        > */}
        {/* <TextInput
            placeholder="type keyword to search..."
            padding={rwd(4)}
            clearButtonMode="always"
            autoCapitalize="none"
            onChange={this.props.onChange}
          /> */}
        <PureRNTextInput
          // borderWidth={0.5}
          padding={bordered ? (iOS ? SIZE.s / 2 : SIZE.s) : SIZE.n}
          paddingTop={iOS ? SIZE.s / 5 : SIZE.n}
          paddingLeft={0}
          // marginBottom={10}
          // paddingHorizontal={bordered ? rwd(5) : 0}
          editable={editable}
          // flex={1}
          // style={{
          //   ...style.textInput,
          //   // multiline: true,
          //   // numberOfLines: 5
          // }}
          // flex={1}
          // backgroundColor="transparent"
          placeholderTextColor={placeholderTextColor}
          style={{
            ...alignTop,
            ...heightStyle,
            // padding: rwd(3),
            // lineHeight: fontSize,
            // paddingBottom: 0,
            // marginTop: iOS ? rwd(1) : rwd(1),
            // lineHeight: rwd(14),
            // marginTop: iOS ? 0 : fontSize * 1.2,
            // // paddingBottom: iOS ? 0 : rwd(2),
            // marginBottom: iOS ? 0 : -rwd(0),
            // // marginBottom: 0,
            fontSize: fontSize,
            // lineHeight: iOS ? 0 : rwd(10), //!!!!!!ANDROID!
            fontWeight: '600',
            // flex: 1,
            // width: '100%',
            // borderWidth: 1,
            color: '#333',
            // borderWidth: 1,
            // textAlignVertical: 'top',
          }}
          clearButtonMode={editable ? 'always' : ''}
          // height={rwd(30)}
          multiline={multiline}
          ref={(el) => (this.input = el)}
          onChange={(event) => {
            let text = event.nativeEvent.text
            // log(text, 'text')
            // this.onChangeText(text)
          }}
          // numberOfLines={5}
          // value={String(value)}
          value={value ? String(value) : ''}
          {...props}
        />
        {/* </Row> */}
      </Grid>
    )
  }
}
//
// const style = StyleSheet.create({
//   textInput: {
//     padding: 0,
//     textAlignVertical: 'top',
//     // borderWidth: 1,
//     fontSize: rwd(20),
//     // fontSize: rwd(15),
//     lineHeight: rwd(25),
//   },
// })

// export class RNTextInput extends PureRNTextInput {}
