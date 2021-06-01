import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class DevFlag extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in DevFlag render()')
    // if (!data) return null
    // let { item = data} = data
    return __DEV__ ? (
      <T.Float
        bottom={4 * SIZE.l}
        right={-1 * SIZE.t}
        backgroundColor="rgb(28, 67, 60)"
        borderRadius={SIZE.t}
        padding={SIZE.s}
      >
        <T.Label text={window.host} theme="H9" color="white" />
      </T.Float>
    ) : null
  }
  onPress = () => {
    if(this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
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
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
