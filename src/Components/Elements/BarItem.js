import React from 'react'
import { View, Icon } from '../'

export class BarItem extends React.Component {
  render() {
    let { size = rwd(16), badge } = this.props
    return (
      <Icon
        badge={badge}
        size={size}
        color="white"
        pad={rwd(10)}
        {...this.props}
      />
    )
  }
}
