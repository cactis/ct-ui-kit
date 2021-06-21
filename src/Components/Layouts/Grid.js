import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { Touch, View } from '../'

export class Grid extends React.PureComponent {
  disappear = (callback) => {
    this.view.disappear(callback)
  }

  state = {

  }
  // render() {
  //   return null
  // }
  render() {
    let {
      layout = 'column',
      flow = layout,
      flex = 1,
      style,
      keyboardAware = false,

      disabled = false,
      children,
      ...props
    } = this.props

    let { keyboardSpace = 0 } = this.state

    let _style = {
      flex: flex,
      flexDirection: flow,
      ...style,
    }
    let borderStyle =
      this.props.theme == 'bordered'
        ? {
          padding: rwd(8),
          borderWidth: 0.5,
          borderColor: '#7E8691',
          borderRadius: rwd(3),
        }
        : {}
    let _styleWithBordered = { ..._style, ...borderStyle }
    return !disabled && (props.onPress || props.onLongPress) ? (
      <Touch
        onPress={props.onPress}
        // onLongPress={props.onLongPress}
        style={(_styleWithBordered, style)}
        {...props}
      >
        <View
          ref={(c) => (this.view = c)}
          style={{
            ..._style,
            // marginBottom: keyboardSpace
          }}
          {...props}>
          {children}
        </View>
        {/* <View height={keyboardSpace} /> */}
      </Touch >
    ) : (
      <View

        ref={(c) => (this.view = c)}
        style={{

          ..._styleWithBordered,
          // marginBottom: keyboardSpace

        }}

        {...props}
      >
        {children}
        {/* <View height={keyboardSpace} /> */}
      </View >
    )
  }

  componentDidMount() {
    // log(this.props.keyboardAware, 'this.props.keyboardAware')
    if(this.props.keyboardAware) {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      );
    }
  }
  _keyboardDidShow = (e) => {
    log('_keyboardDidShow')
    let keyboardHeight = e.endCoordinates.height
    log(keyboardHeight, 'keyboardHeight # ')
    this.setState({ keyboardSpace: keyboardHeight });
    this.forceUpdate()
  }

  _keyboardDidHide = () => {
    log('_keyboardDidHide')
    this.setState({ keyboardSpace: 0 });
  }
  componentWillUnmount() {
    if(this.props.keyboardAware) {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }

  // direction() {
  //   let debug = this.props._
  //   var row = true
  //   React.Children.forEach(this.props.children, function(child) {
  //     if (debug) {
  //       // console.log(child)
  //       // console.log(child?.type.name)
  //     }
  //     if (child?.type?.name?.includes('Col')) row = false
  //     if (child?.type?.name?.includes('Row')) row = true
  //   })
  //   return row ? 'column' : 'row'
  // }
}
