import React from 'react'
import { StyleSheet } from 'react-native'
import { AutoGrowTextInput as TextInput } from 'react-native-auto-grow-textinput'

import { TagBase } from './TagBase'
let _navigation
export class P extends TagBase {
  componentDidMount() {
    _trace('P')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
    // if (prevProps.data !== this.props.data)
    //   this.setState({ data: { ...this.props.data } })
  }

  onChangeText = value => {
    this.setState({ value })
    let { data } = this.state
    data.item.content = value
    this.updateData(data)
  }

  render() {
    let { data, value, currentIndex } = this.state
    _log(data, 'data in P render()')
    if (!data) return null
    let { item = data } = data
    // log(item, 'item in P')
    let _tag = _.upperCase(item.tag).replace(' ', '')
    log(_tag, '_tag in P#render')
    let _style = T.TextStyles[_tag]
    return (
      <T.Row
        padding={rwd(10)}
        borderLeftWidth={5}
        marginBottom={this.marginBottom}
        borderColor={this.isMe() ? EDITOR_FOCUSED : EDITOR_NOT_FOCUSED}
        // paddingVertical={rwd(10)}
        // borderBottomWidth={0.2}
        color="rgba(235,232,232,.57)"
      >
        <TextInput
          value={value}
          autoFocus={this.isMe() ? true : false}
          // autoFocus={data.index == 0 ? true : false}
          onChangeText={this.onChangeText}
          numberOfLines={0}
          // borderBottomWidth={currentIndex == data.index ? 0.5 : 0}
          // theme={item.tag}
          style={_style}
          // onSubmitEditing={this.onSubmitEditing}
          onSelectionChange={this.onSelectionChange}
          enableScrollToCaret
          blurOnSubmit={true}
          onFocus={this.onFocus}
          onKeyPress={this.onKeyPress}
          onBlur={this.onBlur}
        />
      </T.Row>
    )
  }
  onKeyPress = e => {
    // log(e, 'e onKeyPress')
  }

  onSelectionChange = e => {
    // log(e, 'onSelectionChange')
  }

  onBlur = e => {}

  initStateData = onComplete => {
    let { data } = this.props
    let { item = data } = data
    let { content: value } = item
    this.mounted &&
      this.setState({ data, value }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
    // window.keyboardToolbar.close()
  }
  autoRun = () => {
    // window.keyboardToolbar.open(<T.TagsToolbar />, { modalHeight: rwd(50) })
  }
}
var styles = StyleSheet.create({})
