import React from 'react'
import { View, Icon } from '../'

export class BarItem extends React.Component {
  render() {
    let { size = rwd(20), badge, beep = false } = this.props
    // alert(beep)
    return (
      <Icon
        badge={badge}
        paddingTop={iOS ? SIZE.s : 0}
        size={size}
        beep={true}
        color="white"
        pad={rwd(10)}
        {...this.props}
      />
    )
  }
}
