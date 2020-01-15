import React from 'react'
import { StyleSheet } from 'react-native'

import DateTimePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker'

toDate = date => {
  return date.toLocaleDateString('en-US')
}

let _navigation
export class DatePicker extends React.PureComponent {
  state = {
    data: toDate(new Date()),
  }

  setDate = data => {
    log(data, 'data')
    this.setState({ data: toDate(data) })
    this.props.onUpdated && this.props.onUpdated(toDate(data))
  }

  show = () => {
    let { data } = this.state
    popup1.open(
      <DateTimePicker
        date={new Date(data)}
        mode="date"
        onDateChange={this.setDate}
      />
    )
  }

  render() {
    let { data } = this.state
    log(data, 'data in DatePicker render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.Center
        borderWidth={0.5}
        borderColor="rgb(217,208,214)"
        borderRadius={rwd(3)}
        padding={SIZE.t}
      >
        <T.Label text={data} onPress={this.show} theme="H5" />
      </T.Center>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      data &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('DatePicker')
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
