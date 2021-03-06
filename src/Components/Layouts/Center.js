import React from 'react'
import { StyleSheet } from 'react-native'
import { Grid } from './Grid'

let _navigation
export class Center extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }
  disappear = (callback) => {
    this.view.disappear(callback)
  }

  render() {
    return <Grid ref={(c) => (this.view = c)} align="center" {...this.props} />
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
