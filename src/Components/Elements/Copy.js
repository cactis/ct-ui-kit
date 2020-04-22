import React from 'react'
import { StyleSheet, Clipboard } from 'react-native'

let _navigation
export class Copy extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
  // log(data,  'data in Copy render()')
    // if (!data) return null
    // let { item = data} = data
    return <T.Icon name="share" iconSet="Feather" onPress={this.onPress} />
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      alert('need to set onPress on item')
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

window.copyToClipboard = message => {
  // alert('Copy to Clipboard...')
  if (__DEV__) alert(message)
  Clipboard.setString(message)
}
