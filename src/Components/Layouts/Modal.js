import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class Modal extends ModalBase {
  componentDidMount() {
    this.mounted = true
    _trace()
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
      backgroundColor = 'rgba(255,255,255,1)',
      // backgroundColor = 'rgba(204,57,57,.98)',
      safeArea = true,
      direction = 'bottom',
      scrollable = false,
      swipeToClose,
      title = propTitle,
      quoteable,
      fullScreen,
      keyboardAware = false,
      paddable = true,
      padding = SIZE.s,
      noHeader = false,
      ...opts
    } = options
    if ((scrollable || fullScreen) && !swipeToClose) swipeToClose = false
    modalHeight = fullScreen ? SCREEN_HEIGHT : modalHeight
    // alert([fullScreen, modalHeight])
    return (
      <ModalBox
        useNativeDriver={true}
        ref={(c) => (this.modal = c)}
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
        {noHeader ? null : (
          <T.Row
            flex={0}
            paddingHorizontal={SIZE.m}
            paddingVertical={SIZE.n}
            // paddingBottom={padding / 2}
            marginTop={fullScreen ? SAFEAREA_TOP : SIZE.s}
            flow="row"
          >
            <T.Space borderWidth={0} flex={0} align="center">
              <T.Icon
                onPress={this.close}
                size={rwd(18)}
                color="transparent"
                name="closecircleo"
                iconSet="AntDesign"
              />
            </T.Space>
            <T.Col borderWidth={0} align="center">
              {title && <T.Label theme="H5" text={title} />}
            </T.Col>
            <T.Div borderWidth={0} flex={0}>
              <T.Icon
                onPress={this.close}
                size={SIZE.m * 1.2}
                // name="closecircleo"
                // iconSet="AntDesign"
                name={CLOSE_ICON_NAME}
                iconSet={CLOSE_ICON_SET}
                color="rgb(131,131,131)"
              />
            </T.Div>
          </T.Row>
        )}
        {/* {scrollable ? (
          // <T.List
          //   quoteable={quoteable}
          //   ListHeaderComponent={children}
          //   contentContainerStyle={{ padding: rwd(10) }}
          // />
          <T.Screen scrollable>{children}</T.Screen>
        ) : ( */}
        <T.Screen
          scrollable={scrollable}
          borderWidth__={3}
          padding={padding}
          backgroundColor={backgroundColor}
          keyboardAware={keyboardAware}
          safeAreaDisabled={!safeArea}
        >
          {children}
        </T.Screen>
        {/* )} */}
        {noHeader ? (
          <T.Float marginTop={SAFEAREA_TOP} right={SIZE.m} top={SIZE.m}>
            <T.Icon
              onPress={this.close}
              size={rwd(18)}
              name="closecircleo"
              iconSet="AntDesign"
              color="rgb(131,131,131)"
            />
          </T.Float>
        ) : null}
      </ModalBox>
    )
  }

  initStateData = (onComplete) => {
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
