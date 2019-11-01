import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

let _this, _navigation
export class WebViewScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params?.title || '預設標題',
    }
  }
  state = {
    data: null,
  }

  componentDidMount() {
    _trace()
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  render() {
    let { data, uri } = this.state
    // if (!data) return null
    log(data, 'data in WebViewScreen render() ')
    return (
      <>
        <T.Screen>
          <T.BarItem
            name="angle-left"
            color="#333"
            onPress={() => T.NavigationService.goBack()}
          />
          {/* <T.Html uri={uri} /> */}
          <WebView
            // flex={1}
            source={{ uri: uri }}
            style={{
              width: '100%',
              height: T.size.contentHeight,
            }}
          />
        </T.Screen>
      </>
    )
  }

  initStateData = onComplete => {
    if (_navigation.state.params) {
      let { data, uri } = _navigation.state.params
      // _navigation.setParams({ title: '改為新標題' })
      this.setState({ data, uri }, () => {
        onComplete && onComplete()
      })
    } else {
      onComplete && onComplete()
    }
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
