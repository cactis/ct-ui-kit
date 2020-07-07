import React, { Component } from 'react'
import { View as RNView } from 'react-native'
import * as Animatable from 'react-native-animatable'
export { Animatable }
// import { Example } from './'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export { RNView }
export class View extends React.Component {
  state = {}
  render() {
    // Tag = Animatable.View
    if (this.props.__hidden__) return null
    let __color__ =
      __DEV__ && this.props.__c__ ? { backgroundColor: 'red' } : {}
    let {
      align,
      yAlign,
      flow = 'column',
      xAlign,
      style = {},
      children,
      bordered,
      borderedTop = false,
      animation,
      // keyboardAware = false,
      ...props
    } = this.props
    // let { animation } = this.state
    align && (yAlign = align) && (xAlign = align)
    yAlign && (style.alignItems = yAlign)
    xAlign && (style.justifyContent = xAlign)
    let emptyStyle = !children ? EMPTYSTYLE : {}
    // alert(animation)
    let Tag = animation ? Animatable.View : RNView
    let drawBorderedStyle =
      Dev.drawBorder || bordered
        ? { borderWidth: 0.5, borderColor: '#a8a8a8' }
        : {}
    drawBorderedStyle =
      __DEV__ && props.__b__
        ? { ...drawBorderedStyle, borderWidth: 0.5, borderColor: 'red' }
        : drawBorderedStyle
    // drawBorderedStyle = borderedTop
    //   ? { ...drawBorderedStyle, borderWidth: 3, borderTopWidth: 0.5 }
    //   : drawBorderedStyle
    let content = (
      <Tag
        ref={(c) => {
          this.view = c
        }}
        // delay={3000}
        // animation={animation}
        // animation="shake"

        flexDirection={flow}
        style={{
          ...emptyStyle,
          ...style,
          ...drawBorderedStyle,
          ...__color__,
        }}
        {...props}
      >
        {children}
      </Tag>
    )
    return this.props.keyboardAware && false ? (
      <KeyboardAwareScrollView {...props}>{content}</KeyboardAwareScrollView>
    ) : (
      content
    )
  }
  disappear = (callback = () => {}) => {
    window.Effect.disappear(this.view, callback)
  }
  componentDidMount() {
    // let { animation } = this.props
    delayed(() => {
      //   if (animation) this.setState({ animation })
      if (this.props.animation) window.Effect.appear(this.view)
    }, 800)
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.animation !== this.props.animation) {
  //     //   // alert(this.props.animation)
  //     window.Effect.appear(this.view)
  //   }
  // }
}

const EMPTYSTYLE = {
  // borderWidth: 1,
  // margin: 5,
  // backgroundColor: 'red'
}
