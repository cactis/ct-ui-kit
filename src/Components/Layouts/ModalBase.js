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
    keyboardHeight: 0,
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
  onKeyboardChanged = height => {
    // alert('hhh')
    // this.keyboardHeight = height
    this.setState({ keyboardHeight: height })
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
    this.onClose()
    this.modal.close()
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
