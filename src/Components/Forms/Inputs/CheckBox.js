import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class CheckBox extends React.PureComponent {
  state = {
    checked: undefined,
  }

  render() {
    let { checked } = this.state
    let {
      checkedIconName = 'ios-checkmark-circle',
      unCheckedIconName = 'ios-checkmark-circle-outline',
      iconSet = 'Ionicons',
    } = this.props
    // log(checked, 'checked in CheckBox render()')
    // if (!checked) return null
    // let { item = checked } = checked

    let name = checked ? checkedIconName : unCheckedIconName
    let color = checked ? '#333' : '#999'
    return (
      // <T.Row flex={0} onPress={this._onChecked}>
      <T.Center flex={0}>
        <T.Icon
          name={name}
          color={color}
          iconSet={iconSet}
          // size={rwd(25)}
          onPress={this._onChecked}
          {...this.props}
          larger={checked ? 8 : 7}
        />
      </T.Center>
      // </T.Row>
    )
  }
  toggle = () => {
    log('toggle')
    this._onChecked()
  }

  _onChecked = () => {
    let { confirm: title } = this.props
    if (confirm) {
      confirm(
        () => {
          let { checked } = this.state
          checked = !checked
          this.setState({ checked })
          let { onChecked } = this.props
          onChecked && onChecked(checked)
        },
        { title: title }
      )
    } else {
      let { checked } = this.state
      checked = !checked
      this.setState({ checked })
      let { onChecked } = this.props
      onChecked && onChecked(checked)
    }
  }

  initStateData = (onComplete) => {
    let { checked = false } = this.props
    this.mounted &&
      this.setState({ checked }, () => {
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
