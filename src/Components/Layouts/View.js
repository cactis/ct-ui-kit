import React, { Component } from 'react'
import { View as RNView } from 'react-native'
// import { Example } from './'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class View extends React.Component {
  render() {
    if (this.props.__hidden__) return null
    let {
      align,
      yAlign,
      flow = 'column',
      xAlign,
      style = {},
      children,
      // keyboardAware = false,
      ...props
    } = this.props
    align && (yAlign = align) && (xAlign = align)
    yAlign && (style.alignItems = yAlign)
    xAlign && (style.justifyContent = xAlign)
    let emptyStyle = !children ? EMPTYSTYLE : {}
    let content = (
      <RNView
        flexDirection={flow}
        style={{ ...emptyStyle, ...style }}
        {...props}
      >
        {children}
      </RNView>
    )
    return this.props.keyboardAware && false ? (
      <KeyboardAwareScrollView {...props}>{content}</KeyboardAwareScrollView>
    ) : (
      content
    )
  }
}

const EMPTYSTYLE = {
  // borderWidth: 1,
  // margin: 5,
  // backgroundColor: 'red'
}
