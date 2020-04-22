import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class FriendItem extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data,  'data in FriendItem render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Cell onPress={this.refs.checkbox?.toggle} flow="row" paddingLeft={0}>
        <T.Center flex={0} borderWidth_={1} padding={0}>
          <T.CheckBox
            ref="checkbox"
            onChecked={(checked) => this.onChecked(checked)}
          />
        </T.Center>
        <T.Col xAlign="center">
          <R.Avatar1
            onPress={this.refs.checkbox?.toggle}
            size={SIZE.l * 1.5}
            data={item}
          />
        </T.Col>
      </T.Cell>
    )
  }

  onChecked = (checked) => {
    let { data } = this.state
    let { item = data } = data
    item.checked = checked
    this.setState({ data })
    // this.props.onChecked(data)
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
