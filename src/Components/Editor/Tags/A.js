import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
import { TagBase } from './TagBase'
export class A extends TagBase {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace()
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
    let { parent } = this.props
    let { data } = this.state
    // log(data, 'data in A render()')
    if (!data) return null
    let { item = data } = data
    log(parent, 'parent')
    return (
      <T.Row padding={rwd(10)}>
        <T.Row flow="row">
          <T.Col flex={0}>
            <T.Label title="url" />
          </T.Col>
          <T.Space />
          <T.Col>
            <T.RNTextInput onFocus={this.onFocus} />
          </T.Col>
        </T.Row>
        <T.Row flow="row">
          <T.Col flex={0}>
            <T.Label title="title" />
          </T.Col>
          <T.Space />
          <T.Col>
            <T.RNTextInput onFocus={this.onFocus} />
          </T.Col>
        </T.Row>
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
