import React from 'react'
import { StyleSheet } from 'react-native'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class FlexModal extends ModalBase {
  componentDidMount() {
    _trace('FlexModal')
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

  render() {
    let { content, options } = this.state
    // log(content, '000000')
    let { children = content, title: propTitle, height } = this.props
    // log(children, 'children')
    return (
      <ModalBox
        style={{
          height: 'auto',
          backgroundColor: 'transparent',
        }}
        position="bottom"
        entry="bottom"
        ref={c => (this.modal = c)}
      >
        <T.Grid
          flex={0}
          padding={SIZE.l}
          // backgroundColor="rgb(241,241,241)"
          backgroundColor="transparent"
        >
          {children}
          {/* <T.Button title="Close" onPress={() => this.close()} /> */}
        </T.Grid>
      </ModalBox>
    )
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
