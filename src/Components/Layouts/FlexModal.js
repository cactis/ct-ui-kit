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
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let { content, options } = this.state
    let {
      backgroundColor = this.props.backgroundColor || 'white',
      title: propTitle,
    } = options
    let { padding = options.padding || SIZE.l, ...props } = this.props
    // log(content, '000000')
    let { children = content, height } = this.props
    // log(children, 'children')
    return (
      <ModalBox
        useNativeDriver={true}
        // coverScreen={true}
        style={{
          height: 'auto',
          backgroundColor: backgroundColor,
          // backgroundColor: 'red',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          zIndex: 10000,
        }}
        {...options}
        position="bottom"
        entry="bottom"
        ref={(c) => (this.modal = c)}
        {...props}
      >
        {propTitle ? (
          <T.Center
            // height={SIZE.l * 3}
            flex={0}
            bordered__
            backgroundColor="#aaa"
          >
            <T.Label theme="H1" text={propTitle} />
          </T.Center>
        ) : null}
        <T.Grid
          flex={0}
          borderRadius={SIZE.l}
        // padding={padding}
        // backgroundColor="rgb(241,241,241)"
        // __b__
        // backgroundColor={backgroundColor}
        // backgroundColor="red"
        // paddingBottom={30}
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
  autoRun = () => { }
}
var styles = StyleSheet.create({})
