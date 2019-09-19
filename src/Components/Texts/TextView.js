import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class TextView extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace('TextView')
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
    let { data } = this.state
    log(data, 'data in TextView render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.RNTextInput
        numberOfLines={0}
        multiline={true}
        editable={false}
        value={item}
        style={{ lineHeight: rwd(18), fonwSize: rwd(20) }}
      />
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
