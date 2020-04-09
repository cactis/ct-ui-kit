import React from 'react'
import { StyleSheet, Share as RNShare } from 'react-native'

let _navigation
export class Share extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in Share render()')
    // if (!data) return null
    // let { item = data} = data
    return (
      <T.Icon
        name="share"
        iconSet="Feather"
        {...this.props}
        onPress={this.onPress}
      />
    )
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      let { title, message, options } = this.props
      copyToClipboard(message)
      let content = {
        title: title,
        message: message,
      }

      RNShare.share(content, options)
    }
  }

  initStateData = onComplete => {
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
