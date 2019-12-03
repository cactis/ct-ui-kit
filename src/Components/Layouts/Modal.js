import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class Modal extends ModalBase {
  // state = {
  //   data: null,
  //   content: null,
  //   // title: null,
  //   options: {},
  //   _options: {
  //     swipeToClose: true,
  //     height: SCREEN_HEIGHT * (iOS ? 0.6 : 0.8),
  //     direction: 'bottom',
  //     title: null,
  //   },
  // }

  componentDidMount() {
    this.mounted = true
    _trace('Modal')
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let { content, options } = this.state
    let { children = content, title: propTitle, height } = this.props
    let {
      height: modalHeight = height,
      backgroundColor = 'rgba(255,255,255,.98)',

      direction = 'bottom',
      scrollable = false,
      swipeToClose,
      title = propTitle,
      quoteable,
      fullScreen,
      paddable = true,
      padding = rwd(10),
      ...opts
    } = options
    if ((scrollable || fullScreen) && !swipeToClose) swipeToClose = false
    modalHeight = fullScreen ? SCREEN_HEIGHT : modalHeight
    // alert([fullScreen, modalHeight])
    return (
      <ModalBox
        ref={c => (this.modal = c)}
        swipeToClose={swipeToClose}
        position={direction}
        entry={direction}
        keyboardTopOffset={0}
        onClosed={() => this.setState({ myTitle: null })}
        // coverScreen={true}
        style={{
          height: modalHeight,
          zIndex: 10000,
          borderRadius: fullScreen ? 0 : rwd(20),
          backgroundColor: backgroundColor,
        }}
        {...opts}
        {...this.props}
      >
        <T.Space size={fullScreen ? SAFEAREA_TOP / 2 : SIZE.s} />
        <T.Float
          flex={0}
          // borderWidth={1}
          // padding={padding}
          flow="row"
          // xAlign="center"
          right={SIZE.s}
          top={fullScreen ? SAFEAREA_TOP : SIZE.s}
          zIndex={1000}
        >
          <T.Col borderWidth={0} flex={0} xAlign="center">
            {title && (
              <T.Label
                theme="H0"
                marginTop={0}
                numberOfLines={0}
                marginBottom={0}
                text={title}
              />
            )}
          </T.Col>
          <T.Col
            borderWidth={0}
            flex={0}
            align="center"
            padding={padding == 0 ? rwd(15) : 0}
          >
            <T.Icon
              onPress={this.close}
              name="close"
              size={rwd(18)}
              iconSet="AntDesign"
              color="rgb(131,131,131)"
            />
          </T.Col>
        </T.Float>
        {scrollable ? (
          <T.List
            quoteable={quoteable}
            ListHeaderComponent={children}
            contentContainerStyle={{ padding: rwd(10) }}
          />
        ) : (
          <T.Screen padding={padding}>{children}</T.Screen>
        )}
        <T.Space size={fullScreen ? SAFEAREA_BOTTOM : 0} />
      </ModalBox>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  autoRun = () => {}

  componentWillUnmount() {
    this.mounted = false
  }
}
var styles = StyleSheet.create({})
