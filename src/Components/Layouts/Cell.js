import React from 'react'
import { Row } from './Row'
import { Touch } from '../Buttons'
import { Label } from '../Texts'
export class Cell extends React.Component {
  render() {
    let {
      borderBottomWidth = rwd(0.5),
      backgroundColor = 'white',
      children = <Label />,
    } = this.props
    return (
      // <Touch {...this.props}>
      <Row
        padding={rwd(10)}
        {...this.props}
        backgroundColor={backgroundColor}
        borderBottomWidth={borderBottomWidth}
        borderColor="rgba(92,103,103,.29)"
        marginBottom={0.5}
      >
        {children}
      </Row>
      // </Touch>
    )
  }
}
