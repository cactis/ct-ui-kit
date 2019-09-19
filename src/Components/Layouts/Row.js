import React from 'react'
import { Grid } from './Grid'

export class Row extends React.Component {
  render() {
    return <Grid {...this.props} />
  }
}
