import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Delete extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in Delete render()')
    if (!data) return null
    let { item = data } = data
    return item.editable ? (
      <T.Icon
        onPress={this.onPress}
        name="minuscircleo"
        iconSet="AntDesign"
        // size={SIZE.m - 2}
        color={STRONG_COLOR}
      />
    ) : null
  }
  onPress = () => {
    let { data } = this.state
    let { item = data } = data
    let { onDeleted } = this.props
    confirm(
      () => {
        T.Api.delete(item.routes, (res) => {
          onDeleted && onDeleted()
        })
      },
      { title: `Confirm to delete this recording?` }
    )

    // if (this.props.onPress) {
    //   this.props.onPress()
    // } else {
    //   log('need to set onPress on item')
    // }
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
