import React from 'react'
import { Row, Space } from '.'

export class Line extends React.Component {
  render() {
    let {
      flex = 0,
      size = 0.2,
      style,
      color = Background, //'rgba(182,182,182, 0.5)',
      ...props
    } = this.props
    // color = 'red'
    return (
      <Row
        style={{
          flex: flex,
          backgroundColor: color,
          padding: 0,
          ...style,
        }}
        {...props}
      >
        <Space size={size} />
      </Row>
    )
  }
}
