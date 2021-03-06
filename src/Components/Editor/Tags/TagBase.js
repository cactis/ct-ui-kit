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
    log(window.currentIndex, 'window.currentIndex in TagBase#isMe()')
    let { data, currentIndex } = this.state
    // log(data.index, currentIndex, 'data.index, currentIndex in TagBase#isMe()')
    // return data.index == currentIndex
    return data.index == window.currentIndex
  }
  marginBottom = 5

  onFocus = e => {
    // alert('onFocus')
    // window.keyboardToolbar.open(<T.TagsToolbar />, { modalHeight: rwd(50) })
    // log(e, 'e in TagBase#onFocus')
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

  setTag = (tagName, options = {}) => {
    // _clear()
    // log(options, 'options')
    // log(tagName, 'tagName in TagBase#setTag')
    let { data } = this.state
    data.item.tag = tagName

    let { image } = options
    // log(image, 'image from options')
    if(image) {
      // log(image.data, 'base64data')
      // data.item.content = null
      // log(image, data.item, 'image, data.item1111')
      data.item.src = image.path // for preview
      data.item.data = image.data
      data.item.mime = image.mime
      // data.item = { ...data.item, ...image }
      log(data.item, 'data.item2222')
    } else {
      data.item.src = null
      data.item.data = null
    }
    // log(data.item.base64, 'data.item.base64')

    this.mounted && this.setState({ data: { ...data } })
    this.forceUpdate()
    this.mounted && this.setState({ state: this.state })

    this.updateData({ ...data })
    // window.tagsToolbar.setCurrentTag(tagName)
  }

  updateData = data => {
    let { parent } = this.props
    if(parent) {
      parent.updateData(data)
    }
  }
}
