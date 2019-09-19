import React from 'react'
import { StyleSheet } from 'react-native'

import { Touch } from './'
import { View, Center } from '../Layouts'
import { Label } from '../Texts'
import { Icon } from '../Images'

// import Styles from '../../Styles'

// import tinycolor from 'tinycolor2'

export class Button extends React.Component {
  render() {
    let {
      theme = 'normal',
      title = 'Button',
      style,
      color,
      titleColor = color || '#111',
      rightIcon,
      titleStyle,
      onPress,
      fontSize = titleStyle?.fontSize || BASE_SIZE * 1.2,
      padding = fontSize * 0.5,
      // backgroundColor = disabled ? 'rgb(213,213,213)' : 'white',
      backgroundColor,
      ...props
    } = this.props
    let borderColor = 'rgba(161,171,166,.64)'
    // let {
    //   borderColor = backgroundColor
    //     ? tinycolor(backgroundColor)
    //         .lighten()
    //         .toString()
    //     : 'white',
    // } = props
    return (
      <Touch {...props} onPress={onPress}>
        <Center
          flex={0}
          style={{
            ...styles[theme],
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            flexDirection: 'row',
            paddingHorizontal: padding * 2,
            paddingVertical: padding,
            // ...Styles.shadow,
            ...style,
          }}
        >
          <Label
            theme="H5"
            style={{
              color: titleColor,
              // fontSize: fontSize,
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

const styles = StyleSheet.create({
  pill: {
    borderRadius: rwd(5),
    borderWidth: 0.5,
    borderColor: 'rgba(56,203,193,.66)',
    // padding: 6,
    lineHeight: 1.8,
    paddingHorizontal: 20,
    // backgroundColor: 'rgb(93,12,142)',
    // ...Styles.shadow,
  },
  normal: {
    borderRadius: 5,
    lineHeight: 2.5,
    borderWidth: 0.5,
    borderColor: 'rgba(56,203,193,.66)',
  },
})
