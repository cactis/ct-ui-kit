import React from 'react'
import { StyleSheet } from 'react-native'

import DateTimePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker'

toDate = (date, mode) => {
  if (mode == 'date') {
    return date.toLocaleDateString('en-US')
  } else {
    return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString(
      'en-US'
    )}`
  }
}

let _navigation
export class DatePicker extends React.PureComponent {
  state = {
    data: toDate(new Date()),
    // data: toDate(new Date(new Date().toISOString())),
  }

  setDate = data => {
  // log(data,  'data')
    let { mode = 'date' } = this.props
    this.setState({ data: toDate(data, mode) })
    this.props.onUpdated && this.props.onUpdated(this.state.data)
  }

  show = () => {
    let { data } = this.state
    let { mode = 'date' } = this.props
    popup1.open(
      <DateTimePicker
        date={new Date(data)}
        mode={mode}
        onDateChange={this.setDate}
      />
    )
  }

  render() {
    // alert(new Date(new Date().toISOString()))
    // alert(new Date())
    let { data } = this.state
  // log(data,  'data in DatePicker render()')
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
      this.setState({ data: data }, () => {
        onComplete && onComplete()
      })
    this.props.onUpdated && this.props.onUpdated(this.state.data)
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
