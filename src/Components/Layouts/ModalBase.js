import React from 'react'
import { StyleSheet } from 'react-native'

import ModalBox from 'react-native-modalbox'
export { ModalBox }

let _navigation
export class ModalBase extends React.PureComponent {
  state = {
    data: null,
    content: null,
    // title: null,
    options: {},
    _options: {
      swipeToClose: true,
      height: SCREEN_HEIGHT * (iOS ? 0.6 : 0.8),
      direction: 'bottom',
      title: null,
    },
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
