import React from 'react'

import { Space } from './Space'

export class Float extends React.Component {
  render() {
    let { style, ...props } = this.props
    return (
      <Space flex={0} style={{ position: 'absolute', ...style }} {...props} />
    )
  }
}
