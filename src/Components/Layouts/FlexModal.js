import React from 'react'
import { StyleSheet } from 'react-native'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class FlexModal extends ModalBase {
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

  render() {
    let { content, options } = this.state
    let { backgroundColor = 'white', title: propTitle } = options
    let { padding = options.padding || SIZE.l, ...props } = this.props
    // log(content, '000000')
    let { children = content, height } = this.props
    // log(children, 'children')
    return (
      <ModalBox
        useNativeDriver={true}
        style={{
          height: 'auto',
          backgroundColor: backgroundColor,
          // backgroundColor: 'red',
        }}
        {...options}
        position="bottom"
        entry="bottom"
        ref={(c) => (this.modal = c)}
        {...props}
      >
        {propTitle ? (
          <T.Center padding={SIZE.m} flex={0} bordered>
            <T.Label theme="H5" text={propTitle} />
          </T.Center>
        ) : null}
        <T.Grid
          flex={0}
          // padding={padding}
          // backgroundColor="rgb(241,241,241)"
          backgroundColor={backgroundColor}
          // backgroundColor="red"
          paddingBottom={30}
        >
          {children}
          {/* <T.Button title="Close" onPress={() => this.close()} /> */}
        </T.Grid>
      </ModalBox>
    )
  }

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
