import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { WebSocketBase } from './WebSocketBase'
export { WebView }
import { Header } from 'react-navigation-stack';



let _this, _navigation
export class WebViewScreen extends WebSocketBase {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    return {
      title: navigation.state.params?.title || '',
      // headerShown: false,

    }
  }
  state = {
    data: null,
    room: window.room,
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

  onMessage = event => {
    // log(uri, 'uri onMessage')
    log(event, 'event # onMessage')
    const { data } = event.nativeEvent;
    log(data, 'data in onMessage')
    let _data = JSON.parse(data)
    log(_data, '_data # ')

    let { href, title = this.state.title } = _data
    log(href, 'href in onMessage')
    let { scrollable = true, safeAreaDisabled = true } = this.props
    let { height = scrollable ? SCREEN_HEIGHT - Header.HEIGHT : SCREEN_HEIGHT } = this.props
    // alert(data)
    // let { uri } = uri
    if(href) {
      log(href.indexOf('reader') > -1, "href.indexOf('reader') > -1")
      if(href.indexOf('reader') > -1) {
        popupScreen.open(<T.Grid flow={isPortrait() ? 'column' : 'row'}><T.Col >
          <T.WebView
            ref={c => window.reader = c}
            applicationNameForUserAgent={`ReadusWebView/1.0.0_${window.accessTokens}`}
            injectedJavascript={window.injectedJavascript}
            source={{ uri: href, headers: HTTP_HEADERS }}
            onMessage={this.onMessage}
            style={{
              // backgroundColor: 'red',
              width: '100%',
              height: height,
            }}
          />
        </T.Col></T.Grid>, {
          nowrap: true, statusBar: false, onClose: () => { window.reader?.injectJavaScript('savePosition("popupScreen close button")') }
        })
      } else {
        // gotoScreen('WebViewScreen', { title: title, uri: href })
        pushTo(_navigation, 'WebViewScreen', { title: title, uri: href })
        // navigateTo(_navigation, 'WebViewScreen', {
        //   title: 'Your Bookshelves',
        //   uri: href,
        //   // headerShow: false,
        //   // padding: 0,
        //   // safeArea: false
        //   // fullScreen: true
        // })
        // this.setState({ data });
      }
    }
    if(title) {
      _navigation.setParams({ title: title })
    }
  };

  reload = () => {
    this.webview?.reload()
  }

  render() {
    let { title, data, uri = this.props.url || this.props.uri, fullScreen, padding } = this.state
    // if(!uri) return null
    let { scrollable = true, safeAreaDisabled = true } = this.props
    let { height = scrollable ? SCREEN_HEIGHT - Header.HEIGHT : SCREEN_HEIGHT } = this.props
    log(uri, 'uri in WebViewScreen render')
    padding = padding || fullScreen ? SIZE.s : SIZE.n
    uri = uri && uri[0] == '/' ? `${AppConfig.web}${uri}` : uri
    log(uri, 'uri in WebViewScreen render')
    let header = <T.Row flex={0} flow='row' paddingTop={SAFEAREA_TOP + SIZE.m}
      backgroundColor={BCOLOR}>
      <T.Center padding={SIZE.m} flex={0}>
        <T.Icon name="angle-left"
          iconSet="Fontisto"
          color='white'
          size={rwd(11)} onPress={() => {
            this.webview.goBack()
          }} />
      </T.Center>
      <T.Center paddingBottom={SIZE.s}>
        <T.Label text={title} theme='H3' size={SIZE.s * 2.5} color='white' />
      </T.Center>
      <T.Center padding={SIZE.m} flex={0}>
        <T.Icon name="angle-left"
          iconSet="Fontisto"
          color={BCOLOR}
          size={rwd(11)} /></T.Center>
    </T.Row>
    return (
      <T.Screen padding={0} safeAreaDisabled={safeAreaDisabled} backgroundColor_='red' scrollable={scrollable} onRefresh={() => {
        log('reloading')
        this.webview.reload()
      }}>
        {/* {header} */}
        <T.Row>
          <WebView
            // flex={1}
            ref={c => this.webview = c}
            source={{
              uri: uri,
              headers: HTTP_HEADERS
            }}
            applicationNameForUserAgent={`ReadusWebView/1.0.0_${window.accessTokens}`}

            injectedJavaScript={window.injectedJavascript}
            onMessage={this.onMessage}
            style={{
              // backgroundColor: 'red',
              width: '100%',
              height: height,
            }}
          />
        </T.Row>
      </T.Screen>
    )
  }

  initStateData = (onComplete) => {
    if(_navigation?.state.params) {
      let { data, uri, title, fullScreen = true, padding } = _navigation?.state.params
      // _navigation.setParams({title: '改為新標題' })
      this.setState({ data, uri, title, fullScreen, padding }, () => {
        onComplete && onComplete()
      })
    } else {
      onComplete && onComplete()
    }
  }
  autoRun = () => {
    // document.addEventListener("message", event => {
    //   alert(event.data)
    //   this.setState({ msg: event.data });
    // });
    // window.addEventListener("message", event => {
    //   alert(event.data)
    //   this.setState({ msg: event.data });
    // });
    // window.ReactNativeWebView.postMessage('data');

  }
}
var styles = StyleSheet.create({})
