import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'

let _this, _navigation
export class AuthLoadingScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params
        ? navigation.state.params.title
        : '預設標題',
    }
  }
  state = {
    data: null,
  }

  componentDidMount() {
    _trace()
    _this = this
    _navigation = this.props.navigation
    this.initStateData()
  }

  static boot = async (onComplete) => {
    log('will validateToken')
    let isLogged = await T.User.validateToken()
    // log(isLogged, 'isLogged')
    onComplete && onComplete(isLogged)
  }

  render() {
    let { source } = this.props
    return <T.Grid {...this.props} />
  }

  initStateData = () => {
    // if (_navigation.state.params) {
    //   let { data } = _navigation.state.params
    //   this.setState({ data })
    // }
    // navigation.setParams({ title: '改為新標題' })
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
