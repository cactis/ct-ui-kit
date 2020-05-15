import React from 'react'
import { View } from 'react-native'

import { Label } from '..'
import { Div, Row, Grid, Col } from '..'
import { Avatar, Icon } from '..'
import { Touch } from '..'

export const IconLabel = (props) => {
  let {
    name,
    icon = name,
    smaller = 0,
    larger = 0,
    iconSize = SIZE.m + rwd(larger) - rwd(smaller),
    labelSize = iconSize * 0.8,
    color = ICON_COLOR,
    iconColor = color || ICON_COLOR,
    labelColor = iconColor,
    bordered,
    theme = 'H3',
    pill,
    image,
    text,
    disabled = false,
    onPress,
    space = SIZE.n,
    ...extra
  } = props

  let borderStyle = bordered
    ? {
        borderWidth: 0.3,
        backgroundColor: disabled ? 'white' : SUBMIT_COLOR,
        borderColor: disabled ? '#999' : '#333',
        borderRadius: rwd(3),
        paddingRight: SIZE.s,
      }
    : {}
  // color = disabled ? color : '#eee'
  let _icon = icon ? (
    <Icon
      color={iconColor}
      pad={iconSize * 0.1}
      name={icon}
      size={iconSize}
      {...extra}
    />
  ) : null

  let pillStyle = pill
    ? {
        borderRadius: rwd(20),
        borderWidth: 0.5,
        borderColor: 'rgb(184,174,180)',
        paddingHorizontal: SIZE.s,
        paddingVertical: rwd(0),
      }
    : {}

  let label = (
    <Label
      color={labelColor}
      text={text}
      // theme={theme}
      size={labelSize}
      disabled={disabled}
      // backgroundColor="blue"
      {...extra}
    />
  )
  let size = iconSize * 2

  _onPress = () => {
    if (onPress) {
      onPress()
    } else {
      // if (__DEV__) alert()
    }
  }

  let button = (
    <Row
      flow="row"
      yAlign="center"
      style={{ ...borderStyle, ...pillStyle }}
      // borderWidth={3}
      // backgroundColor="yellow"
      // xAlign="flex-end"
      {...extra}
      flex={0}
    >
      {/* <Col
        flex={0}
        yAlign="center"
        height_={size}
        borderWidth={1}
        paddingRight={space}
      > */}
      {_icon}
      {image}
      {/* <T.Space width={space} /> */}
      {/* </Col> */}

      {/* <Col borderWidth={1} flex={0} yAlign="center"> */}
      {label}
      {/* </Col> */}
      {/* <Col flex={0}>{props.rightIcon}</Col> */}
      {props.rightIcon}
    </Row>
  )
  return onPress ? (
    <Touch onPress={disabled ? null : _onPress}>{button}</Touch>
  ) : (
    button
  )
}
