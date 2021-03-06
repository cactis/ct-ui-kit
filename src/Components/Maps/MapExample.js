import React from 'react'
import { StyleSheet } from 'react-native'

let _this, _navigation
export class MapExample extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    return {
      title: navigation.state.params?.title || '預設標題',
    }
  }
  state = {
    data: null,
    mounted: false,
  }

  render() {
    let { data } = this.state
    let { navigation } = this.props
    // if (!data) return null
  // log(data,  'data in MapExample render() ')
    return (
      <T.Screen padding={0}>
        <T.Map navigation={navigation} />
      </T.Screen>
    )
  }

  initStateData = onComplete => {
    if (_navigation?.state.params) {
      let { data } = _navigation.state.params
      // _navigation.setParams({ title: '改為新標題' })
      this.mounted &&
        this.setState({ data }, () => {
          onComplete && onComplete()
        })
    } else {
      onComplete && onComplete()
    }
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
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
