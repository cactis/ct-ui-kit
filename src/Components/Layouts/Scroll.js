import React from 'react'
import { StyleSheet } from 'react-native'

import { ScrollView, SafeAreaView, View as RNView } from 'react-native'
export class Scroll extends React.Component {
  scrollToTop = () => {
    delayed(() => {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true })
    })
  }
  render() {
    return (
      <ScrollView
        ref={c => (this.scroll = c)}
        {...this.props}
        style={{ flex: 1 }}
      />
    )
  }
}
