log('!!!! ModalScreen')
import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import * as T from 'ct-ui-kit'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class ModalScreen extends ModalBase {
  // updateHeight = () => {
  //   alert(`now:${this.keyboardHeight}`)
  //   this.setState({ keyboardHeight: this.keyboardHeight })
  // }
  render() {
    // alert(modalHeight)
    let { content, options, modalHeight, keyboardHeight = 0 } = this.state
    // log(keyboardHeight, 'keyboardHeight')
    let { children = content, title: propTitle, height } = this.props

    let {
      // height: modalHeight = height,
      backgroundColor = SCREEN_BACKGROUNDCOLOR, // 'rgba(255,255,255,1)',
      // backgroundColor = 'rgba(204,57,57,.98)',
      safeArea = true,
      direction = 'bottom',
      scrollable = true,
      swipeToClose = false,
      title = propTitle,
      titleColor = '#333', //BFCOLOR,
      quoteable,
      statusBar = true,
      fullScreen = true,
      keyboardAware = false,
      // paddable = true,
      padding = SIZE.n,
      safeAreaColor = backgroundColor, //BCOLOR,
      nowrap = false,
      button,
      ...opts
    } = options
    if((scrollable || fullScreen) && !swipeToClose) swipeToClose = false
    modalHeight = fullScreen ? SCREEN_HEIGHT : modalHeight
    // alert([fullScreen, modalHeight])
    // modalHeight = SCREEN_HEIGHT
    let rowHeight = SCREEN_HEIGHT - keyboardHeight - (iOS ? rwd(-10) : rwd(10))
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
    // alert(SAFEAREA_TOP)
    // alert(swipeToClose)
    // alert(scrollable)
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
          // backgroundColor={backgroundColor}
          coverScreen={true}
          style={{
            height: scrollable ? modalHeight : rowHeight,
            // height: SCREEN_HEIGHT,
            zIndex: 10000,
            // borderWidth: 3,
            borderRadius: 0,
            backgroundColor: backgroundColor,
            // backgroundColor: 'red',
            // paddingTop: SAFEAREA_TOP,
            // paddingBottom: SAFEAREA_BOTTOM,
            // borderWidth: 10,
            // borderColor: 'blue',
          }}
          {...opts}
          {...this.props}
        >
          {/* <T.Space size={fullScreen && safeArea ? SAFEAREA_TOP : 0} /> */}
          {nowrap ? (
            <>{children}
              <T.Float top={iPhoneX && isPortrait() ? SIZE.s + SAFEAREA_TOP : SIZE.s} right={SIZE.s}>{closeIcon}</T.Float>
            </>
          ) : (
            <T.Row
              flex={1}
              // height={rowHeight}
              // height={modalHeight}
              borderWidth_={3}
              borderColor_="red"
            >
              <T.Row
                flex={0}
                padding={padding / 2}
                // onLayout={e => alert(e.nativeEvent.layout.height)}
                paddingTop={padding}
                marginTop={
                  fullScreen ? SAFEAREA_TOP + (iPhoneX ? 0.5 : 0) * SIZE.s : 0
                }
                // borderWidth={1}
                // padding={padding}

                flow="row"
              // xAlign="center"
              // right={SIZE.s}
              // top={fullScreen ? SAFEAREA_TOP + SIZE.s : SIZE.s}
              // zIndex={1000}
              >
                <T.Space
                  width={SIZE.l * 4}
                  borderWidth_={1}
                  // paddingLeft={SIZE.t}
                  flex={0}
                  xAlign="center"
                >
                  {/* <T.Icon
              onPress={this.close}
              name="close"
              size={rwd(18)}
              color="transparent"
              iconSet="AntDesign"
              // color="rgb(131,131,131)"
            /> */}
                  {button ? closeIcon : null}
                </T.Space>
                <T.Col borderWidth_={0} align="center" paddingHorizontal={SIZE.m}>
                  {title && (
                    <T.Label
                      // theme="H0"
                      // paddingTop={SIZE.s}
                      theme="H1"
                      color={titleColor}
                      size={rwd(17)}
                      // numberOfLines={1}
                      marginBottom={0}
                      // color={BCOLOR}
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
                {/* {scrollable ? (
                <T.List
                  quoteable={quoteable}
                  ListHeaderComponent={children}
                  contentContainerStyle={{ padding: rwd(10) }}
                />
              ) : ( */}
                <T.Grid
                  // backgroundColor="green"
                  // backgroundColor="white"
                  padding={padding}
                  keyboardAware={keyboardAware}
                  safeAreaDisabled={!safeArea}
                >
                  {children}
                </T.Grid>
                {/* )} */}
              </T.Row>
              <T.Space size={keyboardHeight == 0 ? SAFEAREA_BOTTOM : 0} />
              {/* <T.SafeArea flex={0} backgroundColor={safeAreaColor} /> */}
            </T.Row>
          )
          }
        </ModalBox></>
    )
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
  }
}
var styles = StyleSheet.create({})
