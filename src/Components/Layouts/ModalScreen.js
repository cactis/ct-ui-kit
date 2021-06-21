log('!!!! ModalScreen')
import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import * as T from 'ct-ui-kit'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class ModalScreen extends ModalBase {

  render() {
    let { content, options, modalHeight, keyboardHeight = 0 } = this.state
    let { children = content, title: propTitle } = this.props
    let {
      backgroundColor = SCREEN_BACKGROUNDCOLOR, // 'rgba(255,255,255,1)',
      safeArea = true,
      direction = 'bottom',
      scrollable = true,
      swipeToClose = false,
      title = propTitle,
      titleColor = '#333', //BFCOLOR,
      quoteable,
      statusBar = true,
      fullScreen = true,
      height,
      keyboardAware = false,
      padding = SIZE.n,
      safeAreaColor = backgroundColor, //BCOLOR,
      nowrap = false,
      button,
      ...opts
    } = options
    if((scrollable || fullScreen) && !swipeToClose) swipeToClose = false
    modalHeight = fullScreen ? SCREEN_HEIGHT : modalHeight
    let rowHeight = SCREEN_HEIGHT - keyboardHeight// - (iOS ? rwd(-10) : rwd(10))

    // height = (scrollable ? modalHeight : rowHeight)
    // height = rowHeight
    // height = modalHeight
    height = SCREEN_HEIGHT - keyboardHeight
    // height = 426
    log(height, 'height # ModalScreen render')
    let position = fullScreen ? 'top' : 'bottom'
    let closeIcon = (
      <T.Icon
        onPress={this.close}
        size={SIZE.m}
        name={CLOSE_ICON_NAME}
        iconSet={CLOSE_ICON_SET}
        color={TColor.mostReadable(backgroundColor, ['#efefef', '#aaa'])}
        theme="H1"
      />
    )
    return (
      <><StatusBar hidden={!statusBar} />
        <ModalBox
          useNativeDriver={true}
          ref={(c) => (this.modal = c)}
          swipeToClose={swipeToClose}
          swipeToClose={false}
          position={position}
          entry={direction}
          keyboardTopOffset={0}
          onClosed={() => {
            StatusBar.setHidden(false, 'slide');
            this.setState({ myTitle: null })
          }}
          coverScreen={false} // !!!!
          {...opts}
          {...this.props}
          style={{
            height: height,
            zIndex: 10000,
            borderRadius: 0,
            backgroundColor: backgroundColor,
          }}
        >
          {nowrap ? (
            <>
              {children}
              <T.Float top={iPhoneX && isPortrait() ? SIZE.s + SAFEAREA_TOP : SIZE.s} right={SIZE.s}>{closeIcon}</T.Float>
            </>
          ) : (
            <T.Row
              flex={1}
              borderWidth_={3}
              borderColor_="red"
            >
              <T.Row
                flex={0}
                padding={padding / 2}
                paddingTop={padding}
                marginTop={
                  fullScreen ? SAFEAREA_TOP + (iPhoneX ? 0.5 : 0) * SIZE.s : 0
                }
                flow="row"
              >
                <T.Space
                  width={SIZE.l * 4}
                  borderWidth_={1}
                  // paddingLeft={SIZE.t}
                  flex={0}
                  xAlign="center"
                >
                  {button ? closeIcon : null}
                </T.Space>
                <T.Col borderWidth_={0} align="center" paddingHorizontal={SIZE.m}>
                  {title && (
                    <T.Label
                      theme="H1"
                      color={titleColor}
                      size={rwd(17)}
                      marginBottom={0}
                      text={title}
                    />
                  )}
                </T.Col>
                <T.Space
                  width={SIZE.l * 4}
                  borderWidth_={1}
                  flex={0}
                  xAlign="center"
                  yAlign="flex-end"
                  paddingRight={SIZE.s}
                >
                  {button ? button : closeIcon}
                </T.Space>
              </T.Row>
              <T.Row>
                <T.Grid
                  padding={padding}
                  keyboardAware={keyboardAware}
                  safeAreaDisabled={!safeArea}
                >
                  {children}
                </T.Grid>
                {/* )} */}
              </T.Row>
              <T.Space
                size={keyboardHeight == 0 ? SAFEAREA_BOTTOM : 0}
              />
            </T.Row>
          )
          }

        </ModalBox ></>
    )
  }

  updateHeight = (keyboardHeight) => {
    log('updateHeight called in ModalScreen')
    this.setState({ keyboardHeight })
  }

  componentDidMount() {
    this.mounted = true
    _trace()
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  autoRun = () => { }

  componentWillUnmount() {
    this.mounted = false
    // _.each(window._popups, (p => window[p] = p))
  }
}
var styles = StyleSheet.create({})
