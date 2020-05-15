import React from 'react'
import { View, Icon } from '../'

export class BarItem extends React.Component {
  render() {
    let { size = SIZE.m, badge, beep = false } = this.props
    // alert(beep)
    return (
      <T.Center paddingVertical={SIZE.n} paddingHorizontal={SIZE.n}>
        <Icon
          badge={badge}
          // paddingTop={iOS ? SIZE.s : 0}
          size={size}
          beep={true}
          color="white"
          alignSelf="center"
          paddingTop={SIZE.s}
          // pad={SIZE.s}
          {...this.props}
        />
      </T.Center>
    )
  }
}
