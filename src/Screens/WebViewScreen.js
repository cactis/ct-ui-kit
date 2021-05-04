import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { WebSocketBase } from './WebSocketBase'
export { WebView }
let _this, _navigation
export class WebViewScreen extends WebSocketBase {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params?.title || '預設標題',
    }
  }
  state = {
    data: null,
    room: global.room,
  }

  componentDidMount() {
    _trace()
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
    this.connectSocket()
  }

  render() {
    let { data, uri = this.props.url, fullScreen } = this.state
    // if (!data) return null
    // __DEV__ && alert(uri)
    // log(data,  'data in WebViewScreen render() ')
    log(uri, 'uri')
    let padding = fullScreen ? SIZE.s : SIZE.n
    return (
      <>
        <T.Screen padding={padding}>
          {fullScreen && (
            <T.BarItem
              name="angle-left"
              color="#333"
              onPress={() => T.NavigationService.goBack()}
            />
          )}
          {/* <T.Html uri={uri} /> */}
          <WebView
            // flex={1}
            source={{ uri: uri }}
            style={{
              // backgroundColor: 'red',
              width: '100%',
              height: SCREEN_HEIGHT,
            }}
          />
        </T.Screen>
      </>
    )
  }

  initStateData = (onComplete) => {
    if(_navigation?.state.params) {
      let { data, uri, fullScreen = true } = _navigation?.state.params
      // _navigation.setParams({ title: '改為新標題' })
      this.setState({ data, uri, fullScreen }, () => {
        onComplete && onComplete()
      })
    } else {
      onComplete && onComplete()
    }
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
