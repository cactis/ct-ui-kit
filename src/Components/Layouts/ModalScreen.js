import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import ModalBox from 'react-native-modalbox'

let _navigation
import { ModalBase } from './ModalBase'
export class ModalScreen extends ModalBase {
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
      backgroundColor = BCOLOR, // 'rgba(255,255,255,1)',
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
        }}
        {...opts}
        {...this.props}
      >
        <T.Row
          flex={0}
          padding={padding / 2}
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
          <T.Space borderWidth={0} paddingLeft={SIZE.m} flex={0} align="center">
            {/* <T.Icon
              onPress={this.close}
              name="close"
              size={rwd(18)}
              color="transparent"
              iconSet="AntDesign"
              // color="rgb(131,131,131)"
            /> */}
            <T.Icon
              onPress={this.close}
              name="close-a"
              size={rwd(16)}
              iconSet="Fontisto"
              color="rgb(131,131,131)"
              color={BFCOLOR}
              theme="H1"
            />
          </T.Space>
          <T.Col borderWidth={0} align="center" paddingHorizontal={SIZE.l}>
            {title && (
              <T.Label
                // theme="H0"
                // marginTop={0}
                theme="H1"
                size={rwd(16)}
                // numberOfLines={1}
                marginBottom={0}
                color={BFCOLOR}
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
            {button}
          </T.Space>
        </T.Row>
        {scrollable ? (
          <T.List
            quoteable={quoteable}
            ListHeaderComponent={children}
            contentContainerStyle={{ padding: rwd(10) }}
          />
        ) : (
          <T.Scroll
            // backgroundColor="green"
            // backgroundColor="white"
            padding={padding}
            keyboardAware={keyboardAware}
            safeAreaDisabled={!safeArea}
          >
            {children}
          </T.Scroll>
        )}
        {/* <T.Space size={fullScreen && safeArea ? SAFEAREA_BOTTOM : 0} /> */}
        <T.SafeArea flex={0} backgroundColor={BCOLOR} />
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
