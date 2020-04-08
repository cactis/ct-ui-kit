import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class BarLine extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
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

  render() {
    let { data } = this.state
    // log(data, 'data in BarLine render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.Row>
        {/* <T.Space theme="small" /> */}
        <T.View backgroundColor="rgba(181,181,181,.20)" height={rwd(8)} />
        <T.Space />
      </T.Row>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
