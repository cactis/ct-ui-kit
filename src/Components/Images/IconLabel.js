import React from 'react'
import { View } from 'react-native'

import { Label } from '..'
import { Div, Row, Grid, Col } from '..'
import { Avatar, Icon } from '..'
import { Touch } from '..'

export const IconLabel = props => {
  let {
    name,
    icon = name,
    iconSize = rwd(20),
    labelSize = iconSize * 0.8,
    color = ICON_COLOR,
    iconColor = ICON_COLOR,
    bordered,
    theme = 'H3',
    pill,
    image,
    text,
    disabled = false,
    onPress,
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
      color={color}
      text={text}
      size={labelSize}
      theme={theme}
      disabled={disabled}
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
    <Div
      flow="row"
      flex={0}
      yAlign="center"
      style={{ ...borderStyle, ...pillStyle, backgroundColor_: 'red' }}
    >
      <Col flex={0} xAlign="center" height_={size} borderWidth_={1}>
        {_icon}
        {image}
      </Col>
      <Col borderWidth_={1} flex={0} align="center" height_={size} flow="row">
        {label}
      </Col>
      <Col>{props.rightIcon}</Col>
    </Div>
  )
  return onPress ? (
    <Touch onPress={disabled ? null : _onPress}>{button}</Touch>
  ) : (
    <T.Center flex={0}>{button}</T.Center>
  )
}
