import React from 'react'
import { StyleSheet } from 'react-native'

import { TagBase } from './TagBase'
let _navigation
export class IMG extends TagBase {
  componentDidMount() {
    _trace('IMG')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let { data, currentIndex } = this.state
    log(data, 'data in IMG render()')
    if (!data) return null
    let { item = data } = data
    log(data.index, 'data.index')
    return (
      <T.Row
        borderWidth={5}
        marginBottom={this.marginBottom}
        onPress={this.onFocus}
        borderColor={
          currentIndex == data.index ? EDITOR_FOCUSED : EDITOR_NOT_FOCUSED
        }
      >
        <T.Image uri={item.src} />
      </T.Row>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
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
