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
    iconSize = rwd(18),
    labelSize = iconSize * 0.8,
    color = ICON_COLOR,
    iconColor = ICON_COLOR,
    bordered,
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
        paddingRight: rwd(8),
      }
    : {}
  // color = disabled ? color : '#eee'
  let _icon = icon ? (
    <Icon color={iconColor} name={icon} size={iconSize} {...extra} />
  ) : null

  let pillStyle = pill
    ? {
        borderRadius: rwd(20),
        borderWidth: 0.5,
        borderColor: 'rgb(184,174,180)',
        paddingHorizontal: rwd(16),
        paddingVertical: rwd(0),
      }
    : {}

  let label = (
    <Label
      color={color}
      text={text}
      // theme="H5"
      disabled={disabled}
      size={labelSize}
      {...extra}
    />
  )
  let size = iconSize * 2

  _onPress = () => {
    if (onPress) {
      onPress()
    } else {
      if (__DEV__) alert()
    }
  }
  return (
    <Touch onPress={disabled ? null : _onPress}>
      <Div
        flow="row"
        flex={0}
        yAlign="center"
        style={{ ...borderStyle, ...pillStyle }}
      >
        <Col flex={0} xAlign="center" height={size}>
          {_icon}
          {image}
        </Col>
        <Col flex={0} align="center" height={size} flow="row">
          {label}
        </Col>
        <Col>{props.rightIcon}</Col>
      </Div>
    </Touch>
  )
}

{
  /* <TwoCols col1={_icon} col2={label} {...props} /> */
}
