import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Back extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in Back render()')
    // if (!data) return null
    // let { item = data} = data
    return (
      <T.BarItem
        name="angle-left"
        iconSet="Fontisto"
        size={rwd(14)}
        color="white"
        beep={true}
        paddingRight={0}
        onPress={() => {
          // window.currentRoom = null
          T.NavigationService.goBack()
          // //
          // log(window.currentRoom, 'window.currentRoom')
        }}
      />
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
