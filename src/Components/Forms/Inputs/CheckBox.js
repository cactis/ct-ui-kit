import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class CheckBox extends React.PureComponent {
  state = {
    checked: undefined,
  }

  render() {
    let { checked } = this.state
    log(checked, 'checked in CheckBox render()')
    // if (!checked) return null
    // let { item = checked } = checked
    let name = checked ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'
    let color = checked ? '#333' : '#999'
    return (
      <T.Center onPress={this._onChecked}>
        <T.Icon name={name} color={color} iconSet="Ionicons" size={rwd(25)} />
      </T.Center>
    )
  }

  _onChecked = () => {
    let { checked } = this.state
    checked = !checked
    this.setState({ checked })
    let { onChecked } = this.props
    onChecked && onChecked(checked)
  }

  initStateData = onComplete => {
    let { checked = false } = this.props
    this.mounted &&
      this.setState({ checked }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('CheckBox')
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
