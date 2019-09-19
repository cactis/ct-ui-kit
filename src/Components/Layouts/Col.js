import React from 'react'
import { Grid } from './Grid'

export class Col extends React.Component {
  render() {
    return <Grid {...this.props} />
  }
}
