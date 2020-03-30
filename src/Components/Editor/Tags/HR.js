import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
import { TagBase } from './TagBase'
export class HR extends TagBase {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace('HR')
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
    let { data, value } = this.state
    // _log(data, 'data in P render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Center
        padding={SIZE.m}
        padding={rwd(10)}
        borderLeftWidth={EDITOR_LEFT_BORDER_WIDTH}
        borderColor={this.isMe() ? EDITOR_FOCUSED : EDITOR_NOT_FOCUSED}
      >
        <T.RNTextInput
          value="．．．"
          onFocus={this.onFocus}
          autoFocus={this.isMe() ? true : false}
          autoFocus={true}
          style={{ fontWeight: '500', fontSize: rwd(18) }}
        />
      </T.Center>
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

export { HR as Hr }
