import React from 'react'
import { StyleSheet } from 'react-native'
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
    let { content, options, keyboardHeight = 0 } = this.state
    log(keyboardHeight, 'keyboardHeight')
    let { children = content, title: propTitle, height } = this.props
    let {
      height: modalHeight = height,
      backgroundColor = SCREEN_BACKGROUNDCOLOR, // 'rgba(255,255,255,1)',
      // backgroundColor = 'rgba(204,57,57,.98)',
      safeArea = true,
      direction = 'bottom',
      scrollable = false,
      swipeToClose,
      title = propTitle,
      quoteable,
      fullScreen = true,
      keyboardAware = false,
      paddable = true,
      padding = 2 * SIZE.s,
      button,
      ...opts
    } = options
    if ((scrollable || fullScreen) && !swipeToClose) swipeToClose = false
    modalHeight = fullScreen ? SCREEN_HEIGHT : modalHeight
    // alert([fullScreen, modalHeight])
    modalHeight = SCREEN_HEIGHT
    let rowHeight = SCREEN_HEIGHT - keyboardHeight - (iOS ? rwd(-10) : rwd(10))
    let close = (
      <T.Icon
        onPress={this.close}
        name="close"
        size={rwd(30)}
        iconSet="AntDesign"
        // color="rgb(131,131,131)"
        // color={BFCOLOR}
        theme="H1"
      />
    )
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
          // borderWidth: 3,
          borderRadius: 0,
          backgroundColor: backgroundColor,
          // backgroundColor: 'red',
        }}
        {...opts}
        {...this.props}
      >
        <T.Row flex={0} height={rowHeight} borderWidth__={3} borderColor="red">
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
              width={SIZE.l * 3}
              borderWidth__={1}
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
              {button ? close : null}
            </T.Space>
            <T.Col borderWidth={0} align="center" paddingHorizontal={SIZE.m}>
              {title && (
                <T.Label
                  // theme="H0"
                  // marginTop={0}
                  theme="H1"
                  color={BFCOLOR}
                  size={rwd(20)}
                  // numberOfLines={1}
                  marginBottom={0}
                  // color={BCOLOR}
                  text={title}
                />
              )}
            </T.Col>
            <T.Space
              borderWidth={0}
              flex={0}
              align="center"
              paddingRight={SIZE.s}
            >
              <T.Div width={SIZE.l * 3}>{button ? button : close}</T.Div>
            </T.Space>
          </T.Row>
          <T.Row>
            {scrollable ? (
              <T.List
                quoteable={quoteable}
                ListHeaderComponent={children}
                contentContainerStyle={{ padding: rwd(10) }}
              />
            ) : (
              <T.Grid
                // backgroundColor="green"
                // backgroundColor="white"
                padding={padding}
                keyboardAware={keyboardAware}
                safeAreaDisabled={!safeArea}
              >
                {children}
              </T.Grid>
            )}
          </T.Row>
          {/* <T.Space size={fullScreen && safeArea ? SAFEAREA_BOTTOM : 0} /> */}
          <T.SafeArea flex={0} backgroundColor={BCOLOR} />
        </T.Row>
      </ModalBox>
    )
  }

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
