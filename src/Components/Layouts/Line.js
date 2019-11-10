import React from 'react'
import { Row, Space } from '.'

export class Line extends React.Component {
  render() {
    let {
      flex = 0,
      size = 0.4,
      style,
      color = 'rgb(182,182,182)',
      ...props
    } = this.props
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
