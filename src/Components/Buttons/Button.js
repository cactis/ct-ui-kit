import React from 'react'
import { StyleSheet } from 'react-native'

import { Touch } from './'
import { View, Center } from '../Layouts'
import { Label } from '../Texts'
import { Icon } from '../Images'

import { Linking } from 'react-native'

export const Button1 = (props) => {
  let { color = 'white', backgroundColor = BUTTON_COLOR1, ...prop } = props
  return <Button color={color} backgroundColor={backgroundColor} {...prop} />
}

let _this, _navigation

export class Button extends React.PureComponent {
  state = { disabled: false }

  onPress = () => {
    let { url, onPress } = this.props
    // if (disabled) return
    if (url) {
      this.handleClick()
    } else {
      // log('onPress')
      onPress && onPress()
    }
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
    // _navigation = this.props.navigation
    // log(_navigation, '_navigation 22222')
    this.setState({ disabled: this.props.disabled })
  }

  componentDidUpdate(prevProps) {
    // log(this.props.disabled, 'this.props.disabled')
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
    if (prevProps.disabled !== this.props.disabled)
      this.setState({ disabled: this.props.disabled })
  }

  handleClick = () => {
    let { url } = this.props
    if (!url) return
    _log(url, 'url')
    log(this.props.inApp, 'inApp in handleClick')
    if (this.props.inApp) {
      // _log(url, 'url')
      // log(_navigation, '_navigation 22222')
      navigateTo(_navigation, 'WebViewScreen', {
        uri: url,
        title: 'abc',
      })
    } else {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url)
        } else {
          console.log("Don't know how to open URI: " + this.props.url)
        }
      })
    }
  }
  render() {
    let {
      flex = 0,
      theme = 'normal',
      title = 'Button',
      style,
      beep,
      // color,
      color,
      bordered = false,
      titleColor = color,
      rightIcon,
      leftIcon,
      titleStyle,
      labelTheme = 'H4',
      link,
      onPress,
      fontSize = titleStyle?.fontSize || BASE_SIZE * 1.2,
      padding = fontSize * 0.5,
      // disabled = false,
      backgroundColor,
      // backgroundColor,
      ...props
    } = this.props
    let { disabled } = this.state
    color = disabled ? 'rgba(0,0,0,1)' : color
    backgroundColor = disabled ? 'rgba(113,112,112,1)' : backgroundColor
    // let borderColor = 'rgba(255,255,255,.4)'
    // let {
    //   borderColor = backgroundColor
    //     ? tinycolor(backgroundColor)
    //         .lighten()
    //         .toString()
    //     : 'white',
    // } = props
    let _bordered = bordered ? { borderWidth: 0.5, borderColor: '#111' } : {}
    let negtive = this.props.negtive ? styles.negtive : {}
    // log(negtive, 'negtive')
    // alert(disabled)
    return (
      <Touch disabled={disabled} beep={beep} onPress={this.onPress}>
        <Center
          flex={flex}
          style={{
            ...styles[theme],
            ...negtive,
            backgroundColor: backgroundColor,
            // borderColor: borderColor,
            flexDirection: 'row',
            paddingHorizontal: padding * 2,
            paddingVertical: padding,
            // ...Styles.shadow,

            ...style,
          }}
          {..._bordered}
          {...props}
        >
          {leftIcon}
          <Label
            // theme={labelTheme}
            // disabled={disabled}
            onPress={!disabled ? this.onPress : null}
            style={{
              // fontSize: fontSize,
              ...styles[theme]['label'],
              color: titleColor,
              fontWeight: '600',
              ...titleStyle,

              // fontWeight: '400',
              // fontFamily: 'Verdana',
            }}
            {...props}
          >
            {title}
          </Label>
          {rightIcon}
        </Center>
      </Touch>
    )
  }
}

const styles = {
  pill: {
    borderRadius: BUTTON_RADIUS,
    // borderWidth: 0.5,
    borderColor: 'rgba(138,210,205,.66)',
    // padding: 6,
    lineHeight: 1.8,
    paddingHorizontal: BUTTON_RADIUS,
    paddingVertical: BUTTON_RADIUS / 2,
    // backgroundColor: 'rgb(93,12,142)',
    // ...Styles.shadow,
    label: {},
  },
  normal: {
    borderRadius: BUTTON_RADIUS,
    // lineHeight: 2.5,
    paddingHorizontal: BUTTON_RADIUS,
    paddingVertical: BUTTON_RADIUS / 2,
    // borderWidth: 0.5,
    backgroundColor: 'transparent',
    borderColor: BUTTON_BORDER_COLOR,
    label: {
      // color: 'rgba(#666,.75)',
      color: 'white',
    },

    // backgroundColor: 'rgb(245,197,66)',
  },
  negtive: {
    backgroundColor: 'red',
  },
}
