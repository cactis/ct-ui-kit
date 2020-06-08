import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Toolbar extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in Toolbar render()')
    // if (!data) return null
    // let { item = data} = data
    return (
      <T.Row
        flex={0}
        xAlign="flex-end"
        yAlign="center"
        flow="row"
        onPress={this.onPress}
        padding={SIZE.s}
      >
        {this.props.children}
      </T.Row>
    )
  }
  onPress = () => {
    if (this.props.onPress) {
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
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
