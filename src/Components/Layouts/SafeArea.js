import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { SafeAreaView as RNSafeArea } from 'react-navigation'

RNSafeArea.setStatusBarHeight(0)

export class SafeArea extends React.Component {
  render() {
    let { backgroundColor = 'transparent', children } = this.props
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: backgroundColor }}
        flex={1}
        {...this.props}
      >
        <StatusBar hidden />
        {children}
      </SafeAreaView>
    )
  }
}
