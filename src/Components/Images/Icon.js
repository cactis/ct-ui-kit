import React from 'react'
import { View, Space, Touch, Text, Float, Badge } from '../'

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
    AntDesign: AntDesign,
    Entypo: Entypo,
    Evil: Evil,
    Feather: Feather,
    FontAwesome: FontAwesome,
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
    let {
      name = 'angle-right',
      size = rwd(18),
      ratio = this.props.backgroundColor || this.props.style?.backgroundColor
        ? 1.2
        : 1,
      iconSize = size * ratio,
      padding,
      pad = padding || iconSize * 0.1,
      paddingTop = 0, //iOS ? pad + 2 : pad,
      color = '#333',
      width = 3 * pad + iconSize,
      height = width,
      backgroundColor = 'transparent',
      onPress,
      onPressIn,
      onPressOut,
      badge,
      text,
      disabled,
      ...props
    } = this.props

    let key = (this.props.iconSet || 'FontAwesome').replace(/icons/gi, '')
    // log(key, 'key')
    const TagName = this.iconSets[key]
    const child = (
      <T.Center
        flex={0}
        // align="center"
        backgroundColor={backgroundColor}
        borderRadius={backgroundColor ? width / 2 : 2}
        width={width}
        height={height}
        // padding={padding}
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
          // style={{color: color}}
          size={size}
          {...props}
        />
        {/* <Space style={{position: 'absolute', backgroundColor: backgroundColor, width: '100%', height: '100%'}} borderRadius={width / 2} flex={1}></Space> */}
      </T.Center>
    )
    return onPress || onPressIn || onPressOut ? (
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
    this.props.onPress && this.props.onPress()
    // this.props.onPressIn && this.props.onPressIn()
    // this.props.onPressOut && this.props.onPressOut()
  }
}
