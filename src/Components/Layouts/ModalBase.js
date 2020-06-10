import React from 'react'
import { StyleSheet } from 'react-native'

import ModalBox from 'react-native-modalbox'
export { ModalBox }
import { KeyboardAware } from '../Keyboard'
let _navigation
export class ModalBase extends KeyboardAware {
  state = {
    data: null,
    content: null,
    closeConfirmation: false,
    closeConfirmationTitle: '確定關閉嗎？',
    keyboardHeight: 0,
    modalHeight: SCREEN_HEIGHT,
    // title: null,
    options: {},
    _options: {
      swipeToClose: true,
      height: SCREEN_HEIGHT * (iOS ? 0.6 : 0.8),
      direction: 'bottom',
      title: null,
    },
  }

  updateHeight = () => {}
  onKeyboardChanged = (height) => {
    // alert('onKeyboardChanged')
    // alert(height)
    // alert('hhh')
    // this.keyboardHeight = height
    this.setState({
      keyboardHeight: height,
      modalHeight: SCREEN_HEIGHT - height - (iOS ? 0 : 20),
    })

    // this.updateHeight()
  }

  open = (content, options = {}) => {
    // log(options, 'options---------------')
    this.mounted &&
      this.setState({
        content,
        options: {
          ...{ title: null, ...this.state._options, ...options },
        },
      })
    this.modal.open()
  }

  close = () => {
    if (this.state.closeConfirmation) {
      confirm(
        () => {
          this.onClose()
          this.modal.close()
        },
        { title: `${this.state.closeConfirmationTitle}` }
      )
    } else {
      this.onClose()
      this.modal.close()
    }
  }

  onClose = () => {
    let { options } = this.state
    // log(options, 'options')
    let { onClose } = options
    onClose && onClose()
  }
  // initStateData = onComplete => {
  //   let { data } = this.props
  //   this.mounted &&
  //     this.setState({ data }, () => {
  //       onComplete && onComplete()
  //     })
  // }
  // componentWillUnmount() {
  //   this.mounted = false
  // }
  // autoRun = () => {}
}
var styles = StyleSheet.create({})
