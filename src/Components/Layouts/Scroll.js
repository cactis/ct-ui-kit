import React from 'react'
import { StyleSheet } from 'react-native'

import { ScrollView, SafeAreaView, View as RNView } from 'react-native'
export class Scroll extends React.Component {
  currHeight = 0
  prevHeight = 0
  scrollHeight = 0
  scrollToTop = () => {
    delayed(() => {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true })
    })
  }
  scrollToBottom = () => {
    let params = {
      x: 0,
      y: this.currHeight,
      animated: true,
    }
    log(params, 'params')
    this.scroll.getScrollResponder().scrollResponderScrollTo(params)
  }
  render() {
    return (
      <ScrollView
        ref={c => (this.scroll = c)}
        {...this.props}
        style={{ flex: 1 }}
        onContentSizeChange={(w, h) => {
          this.currHeight = h
          // log(this.currHeight, 'this.currHeight')
          // log(
          //   this.prevHeight > 0 &&
          //     this.currHeight - this.scrollHeight > this.prevHeight,
          //   'this.prevHeight > 0 && this.currHeight - this.scrollHeight > this.prevHeight'
          // )
          if (
            this.prevHeight > 0 &&
            this.currHeight - this.scrollHeight > this.prevHeight
          ) {
            this.scrollHeight += this.currHeight - this.prevHeight
            // log('--------------------------------------------')
            // log('Curr: ', this.currHeight)
            // log('Prev: ', this.prevHeight)
            // log('Scroll: ', this.scrollHeight)
            this.prevHeight = this.currHeight
            // log('PREV: ', this.prevHeight)
            // log('--------------------------------------------')

            // this.scrollToBottom()
          }
        }}
      />
    )
  }
}
