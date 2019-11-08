import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class TagBase extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
    currentIndex: window.currentIndex,
  }

  isMe = () => {
    let { data, currentIndex } = this.state
    log(data.index, currentIndex, 'data.index, currentIndex')
    return data.index == currentIndex
  }
  marginBottom = 5

  onFocus = e => {
    // alert('onFocus')
    // window.keyboardToolbar.open(<T.TagsToolbar />, { modalHeight: rwd(50) })
    // log(e, 'onFocus')
    // this.tagsToolbar.open()
    window.prevTag = window.tag
    window.currentIndex = this.state.data.index
    window.tag = this
    window.prevTag &&
      window.prevTag.setState({ currentIndex: window.currentIndex })
    // log(window.currentIndex, 'window.currentIndex')
    this.setState({ currentIndex: window.currentIndex })
    // alert(window.tag.state.data.index)
    // log(window.tag, 'window.tag')
    window.tagsToolbar.setCurrentTag(this.state.data.item.tag)
  }

  setTag = tagName => {
    _clear()
    log(tagName, 'tagName in P#setTag')
    let { data } = this.state
    data.item.tag = tagName
    this.mounted && this.setState({ data: { ...data } })
    this.forceUpdate()
    this.mounted && this.setState({ state: this.state })

    this.updateData({ ...data })
    window.tagsToolbar.setCurrentTag(tagName)
  }

  updateData = data => {
    let { parent } = this.props
    if (parent) {
      parent.updateData(data)
    }
  }
}
