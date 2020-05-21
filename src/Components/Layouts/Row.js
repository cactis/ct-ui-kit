import React from 'react'
import { Grid } from './Grid'

export class Row extends React.Component {
  disappear = (callback) => {
    this.grid.disappear(callback)
  }
  render() {
    return <Grid ref={(c) => (this.grid = c)} {...this.props} />
  }
}
