import React, { Component } from 'react'
import { View as RNView } from 'react-native'
// import { Example } from './'

export class View extends React.Component {
  render() {
    let {
      align,
      yAlign,
      flow = 'column',
      xAlign,
      style = {},
      children,
      ...props
    } = this.props
    align && (yAlign = align) && (xAlign = align)
    yAlign && (style.alignItems = yAlign)
    xAlign && (style.justifyContent = xAlign)
    let emptyStyle = !children ? EMPTYSTYLE : {}
    return (
      <RNView
        // borderWidth={0.5}
        flexDirection={flow}
        style={{ ...emptyStyle, ...style }}
        {...props}
      >
        {children}
        {/* {drawBorders(this)} */}
      </RNView>
    )
  }
}

const EMPTYSTYLE = {
  // borderWidth: 1,
  // margin: 5,
  // backgroundColor: 'red'
}
