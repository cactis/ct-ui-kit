import React from 'react'
import { StyleSheet, Keyboard } from 'react-native'

export class KeyboardAware extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  state = {}
  componentDidMount() {
    _trace()

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    )
  }
  onKeyboardChanged = height => {
    // log(height, 'hegiht')
  }

  keyboardDidShow = e => {
    // log(e, 'e keyboardDidShow')
    let keyboardHeight = e.endCoordinates.height
    runLast(() => {
      this.onKeyboardChanged(keyboardHeight)
    })
  }

  keyboardDidHide = e => {
    let keyboardHeight = SCREEN_HEIGHT - rwd(125) - SAFEAREA_TOP
    runLast(() => {
      this.onKeyboardChanged(0)
    })
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow')
    Keyboard.removeListener('keyboardDidHide')
  }
}
