import React from 'react'
import { StyleSheet, Keyboard } from 'react-native'

export class KeyboardAware extends React.PureComponent {
  constructor(props) {
    super(props)
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    )
  }

  state = {}

  onKeyboardChanged = height => {
    // alert('_onKeyboardTapped')
    log(
      height,
      'keyboard height. KeyboardAware say: set onKeyboardChanged to handle this keyboard event'
    )
    // log(this.onKeyboardChanged, 'this.onKeyboardChanged')
    // this.onKeyboardChanged && this.onKeyboardChanged(height)
  }

  keyboardDidShow = e => {
    let keyboardHeight = e.endCoordinates.height
    // runLast(() => {
    // log(e, 'e keyboardDidShow')
    this.onKeyboardChanged(keyboardHeight)
    // }, 100)
  }

  keyboardDidHide = e => {
    // let keyboardHeight = SCREEN_HEIGHT - rwd(125) - SAFEAREA_TOP
    // runLast(() => {
    this.onKeyboardChanged(0)
    // log(e, 'e keyboardDidHide')
    // }, 100)
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow')
    Keyboard.removeListener('keyboardDidHide')
  }
}
