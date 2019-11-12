import React from 'react'
import { StyleSheet } from 'react-native'

import { TagBase } from './TagBase'

let _navigation
export class UL extends TagBase {
  // state = {
  //   data: null,
  //   mounted: false,
  // }

  componentDidMount() {
    _trace('UL')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  editable = true
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  onChangeText = (index, content) => {
    log(index, 'content')
    let { data } = this.state
    let { item = data } = data
    item.children[index] = { tag: 'li', content }
    _log(item, 'item')
    this.mounted && this.setState({ data: { ...data } })
    _log(this.state.data.item.children, 'this.state.data.item.children')
  }

  render() {
    let { data } = this.state
    log(data, 'data in UL render()')
    if (!data) return null
    let { item = data } = data
    if (item.content) {
      item.children = [{ tag: 'li', content: item.content }]
    }
    return (
      <T.Grid
        marginBottom={rwd(10)}
        paddingHorizontal={rwd(10)}
        borderLeftWidth={this.editable ? 5 : 0}
        borderColor={
          this.editable
            ? this.isMe()
              ? EDITOR_FOCUSED
              : EDITOR_NOT_FOCUSED
            : 'transparent'
        }
      >
        <T.List
          data={item.children}
          renderItem={item => (
            <T.LI onChangeText={this.onChangeText} data={item} parent={this} />
          )}
        />
      </T.Grid>
    )
  }

  initStateData = onComplete => {
    let { data, editable = this.editable } = this.props
    this.editable = editable
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
