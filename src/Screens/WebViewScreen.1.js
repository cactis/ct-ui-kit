// import React from 'react'
// import { StyleSheet } from 'react-native'
// import { WebView } from 'react-native-webview'
// import { Header } from 'react-navigation-stack';
// const headerHeight = Header.HEIGHT;
// import { WebSocketBase } from './WebSocketBase'
// export { WebView }
// let _this, _navigation
// export class WebViewScreen extends WebSocketBase {
//   static navigationOptions = ({ navigation }) => {
//     _navigation = navigation
//     return {
//       title: navigation.state.params?.title || '',
//       // headerShown: false,

//     }
//   }
//   state = {
//     data: null,
//     room: window.room,
//   }

//   reload = () => {
//     this.webview.reload()
//   }
//   componentDidMount() {
//     _trace()
//     _this = this
//     _navigation = this.props.navigation
//     this.initStateData(() => {
//       this.autoRun()
//     })
//     this.connectSocket()
//   }

//   onMessage = event => {
//     // log(uri, 'uri onMessage')
//     log(event, 'event # onMessage')
//     const { data } = event.nativeEvent;
//     log(data, 'data in onMessage')
//     let _data = JSON.parse(data)
//     let { href, title } = _data
//     log(href, 'href in onMessage')
//     // alert(data)
//     // let { uri } = uri
//     if(href) {
//       if(href.indexOf('reader') > -1) {
//         log('111111')
//         popupScreen.open(<T.Grid
//           keyboardAware={true}
//           flow={isPortrait() ? 'column' : 'row'}>
//           <T.WebView ref={c => window.reader = c}
//             injectedJavascript={window.injectedJavascript}
//             source={{ uri: href }}
//             applicationNameForUserAgent={`ReadusWebView/1.0.0_${window.accessTokens}`}
//             onMessage={this.onMessage}
//             style={{}}
//           />
//         </T.Grid>, {
//           nowrap: true,
//           onClose: () => {
//             window.reader?.injectJavaScript('savePosition("popupScreen close button")')
//           }
//         })
//       } else {
//         log('222222222')
//         // gotoScreen('WebViewScreen', { title: title, uri: href })
//         pushTo(_navigation, 'WebViewScreen', { title: title, uri: href })
//         // navigateTo(_navigation, 'WebViewScreen', {
//         //   title: 'Your Bookshelves',
//         //   uri: href,
//         //   // headerShow: false,
//         //   // padding: 0,
//         //   // safeArea: false
//         //   // fullScreen: true
//         // })
//         // this.setState({ data });
//       }
//     }
//     if(title) {
//       _navigation.setParams({ title: title })
//     }
//   };

//   render() {
//     let { title, data, uri = this.props.url, fullScreen, padding } = this.state
//     log(uri, 'uri in WebViewScreen render')
//     if(uri && uri.indexOf('http') == -1) {
//       uri = `${AppConfig.web}${uri}`
//     }
//     let source = {
//       uri: uri,
//       headers: HTTP_HEADERS
//     }
//     log(source, 'source # ')

//     padding = padding || fullScreen ? SIZE.s : SIZE.n
//     // let header = <T.Row
//     //   flex={0}
//     //   flow='row'

//     //   paddingTop={SAFEAREA_TOP + SIZE.m}
//     //   backgroundColor={BCOLOR}

//     // >
//     //   <T.Center padding={SIZE.m} flex={0}>
//     //     <T.Icon name="angle-left"
//     //       iconSet="Fontisto"
//     //       color='white'
//     //       size={rwd(11)} onPress={() => {
//     //         this.webview.goBack()
//     //       }} />
//     //   </T.Center>
//     //   <T.Center paddingBottom={SIZE.s}>
//     //     <T.Label text={title} theme='H3' size={SIZE.s * 2.5} color='white' />
//     //   </T.Center>
//     //   <T.Center padding={SIZE.m} flex={0}>
//     //     <T.Icon name="angle-left"
//     //       iconSet="Fontisto"
//     //       color={BCOLOR}
//     //       size={rwd(11)} /></T.Center>
//     // </T.Row>
//     return (
//       <T.Screen flex={0} padding={0}
//         // backgroundColor='red'
//         safeAreaDisabled={true}
//         scrollable={true}
//         onRefresh={() => {
//           log('reloading')
//           this.webview.reload()
//         }}
//         height={this.props.height || '100%'}
//       >
//         <WebView
//           // flex={1}
//           ref={c => this.webview = c}
//           source={source}
//           applicationNameForUserAgent={`ReadusWebView/1.0.0_${window.accessTokens}`}
//           injectedJavaScript={window.injectedJavascript}
//           onMessage={this.onMessage}
//           style={{
//             // flex: 1
//             // backgroundColor: 'red',
//             // width: '100%',
//             height: SCREEN_HEIGHT - headerHeight,
//           }}
//         />
//       </T.Screen>
//     )
//   }

//   initStateData = (onComplete) => {
//     if(_navigation?.state.params) {
//       let { data, uri, title, fullScreen = true, padding } = _navigation?.state.params
//       // _navigation.setParams({title: '改為新標題' })
//       this.setState({ data, uri, title, fullScreen, padding }, () => {
//         onComplete && onComplete()
//       })
//     } else {
//       onComplete && onComplete()
//     }
//   }
//   autoRun = () => {
//     // document.addEventListener("message", event => {
//     //   alert(event.data)
//     //   this.setState({ msg: event.data });
//     // });
//     // window.addEventListener("message", event => {
//     //   alert(event.data)
//     //   this.setState({ msg: event.data });
//     // });
//     // window.ReactNativeWebView.postMessage('data');

//   }
// }
// var styles = StyleSheet.create({})
