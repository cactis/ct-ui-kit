import React from 'react'
import { Touch, Text, Float, Badge } from '../'

import { Vibration } from 'react-native'

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Free'
// import FontAwesome5Meta from 'react-native-vector-icons/FontAwesome5Free_meta'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Evil from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import FontAwesome5g from 'react-native-vector-icons/FontAwesome5Pro'
// import FontAwesome5s from 'react-native-vector-icons/FontAwesome5_Solid'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'

export class Icon extends React.Component {
  iconSets = {
    ...window.ICON_SETS,
    FontAwesome: FontAwesome,
    AntDesign: AntDesign,
    Entypo: Entypo,
    Evil: Evil,
    Feather: Feather,
    // FontAwesome5: FontAwesome5,
    // FontAwesome5s: FontAwesome5s,
    // FontAwesome5g: FontAwesome5g,
    Fontisto: Fontisto,
    Foundation: Foundation,
    Ion: Ionicons,
    Material: Material,
    MaterialCommunity: MaterialCommunity,
    Oct: Octicons,
    SimpleLine: SimpleLine,
    Zocial: Zocial,
  }
  render() {
    // log(ICON_COLOR, 'ICON_COLOR')
    let {
      name = window.DEFAULT_ICON_NAME,
      larger = 0,
      smaller = 0,
      size = window.ICON_SIZE * (isTablet ? 1 : 1) + rwd(larger) - rwd(smaller),
      ratio = this.props.backgroundColor || this.props.style?.backgroundColor
        ? 1.2
        : 1,
      iconSize = size * ratio,
      padding,
      pad = padding || iconSize * (this.props.backgroundColor ? 0.3 : 0.3),
      // paddingTop = 0, //iOS ? pad + 2 : pad,
      disabled,
      color = disabled ? '#ddd' : ICON_COLOR,
      backgroundColor = 'transparent',
      width = 3 * pad + iconSize,
      height = width,
      onPress,
      onPressIn,
      onPressOut,
      badge,
      animation,
      text,
      ...props
    } = this.props
    // log(color, 'color in Icon#render')
    let key = (this.props.iconSet || window.DEFAULT_ICON_SET).replace(
      /icons/gi,
      ''
    )
    // log(key, 'key')
    const TagName = this.iconSets[key]
    const child = (
      <T.Center
        flex={0}
        animation={animation}
        // align="center"
        backgroundColor={backgroundColor}
        borderRadius={backgroundColor ? width / 2 : 2}
        width={width}
        height={height}
        padding={pad}
        // paddingTop={paddingTop}
        marginHorizontal={pad}
        {...props}
      >
        <Badge badge={badge} />
        {text ? (
          <Float style={{ right: 0, top: 0 }}>
            <Text
              style={{
                fontSize: rwd(9),
                color: 'red',
              }}
              children={text}
            />
          </Float>
        ) : null}
        <TagName
          // allowFontScaling={true}
          name={name}
          color={color}
          backgroundColor="green"
          // style={{color: color}}
          size={size}
          {...props}
        />
        {/* <Space style={{position: 'absolute', backgroundColor: backgroundColor, width: '100%', height: '100%'}} borderRadius={width / 2} flex={1}></Space> */}
      </T.Center>
    )
    return (onPress && !disabled) || onPressIn || onPressOut ? (
      <Touch
        disabled={disabled}
        // onPressOut={this.onPress}
        // onPressIn={this.onPress}
        onPress={this.onPress}
      >
        {child}
      </Touch>
    ) : (
      child
    )
  }

  onPress = () => {
    if (__DEV__) {
      const DURATION = 0.0001
      const PATTERN = [1000, 2000, 3000]
      // Vibration.vibrate(DURATION)
    }
    beep()
    this.props.onPress && this.props.onPress()
    // this.props.onPressIn && this.props.onPressIn()
    // this.props.onPressOut && this.props.onPressOut()
  }
}
