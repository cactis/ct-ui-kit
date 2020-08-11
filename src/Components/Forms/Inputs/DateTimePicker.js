import React from 'react'
import { StyleSheet } from 'react-native'

import RNDateTimePicker from '@react-native-community/datetimepicker'

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
export class DateTimePicker extends React.PureComponent {
  state = {
    // data: toDate(new Date()),

    date: null,
    editable: true,
    // dateLabel: new Date().toLocaleDateString(),
    // timeLabel: new Date().toLocaleTimeString(),
    showDatePicker: false,
    showTimePicker: false,
    // data: toDate(new Date(new Date().toISOString())),
  }

  onChanged = (event, value) => {
    let date = value || this.state.date
    let dateLabel = date.toLocaleDateString()
    let timeLabel = date.toLocaleTimeString()
    this.setState({
      date,
      dateLabel,
      timeLabel,
      showDatePicker: false,
      showTimePicker: false,
    })
    this.props.onUpdated && this.props.onUpdated(date)
  }

  showDatePicker = () => {
    if (!this.state.editable) return
    T.RNKeyboard.dismiss()
    if (iOS) {
      let { date } = this.state
      flexPopup.open(
        <RNDateTimePicker value={date} mode="date" onChange={this.onChanged} />
      )
    } else {
      this.setState({ showDatePicker: true })
    }
  }

  showTimePicker = () => {
    if (!this.state.editable) return
    T.RNKeyboard.dismiss()

    if (iOS) {
      let { date } = this.state
      flexPopup.open(
        <RNDateTimePicker value={date} mode="time" onChange={this.onChanged} />
      )
    } else {
      this.setState({ showTimePicker: true })
    }
  }

  render() {
    // alert(new Date(new Date().toISOString()))
    // alert(new Date())
    let { date, showDatePicker, showTimePicker } = this.state
    // log(data,  'data in DateTimePicker render()')
    if (!date) return null
    // log(date, 'date#render')
    let dateLabel = date.toLocaleDateString()
    let timeLabel = date.toLocaleTimeString()
    // let { item = data } = data
    return (
      <T.Center borderRadius={rwd(3)} padding={SIZE.t} flow="row">
        <T.Col yAlign="flex-end">
          <T.Label text={dateLabel} onPress={this.showDatePicker} theme="H5" />
        </T.Col>
        <T.Space />
        <T.Col>
          <T.Label text={timeLabel} onPress={this.showTimePicker} theme="H5" />
        </T.Col>
        {!iOS && showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            onChange={this.onChanged}
          />
        )}
        {!iOS && showTimePicker && (
          <RNDateTimePicker
            value={date}
            mode="time"
            onChange={this.onChanged}
          />
        )}
      </T.Center>
    )
  }

  initStateData = (onComplete) => {
    let { data, editable = true } = this.props
    // log(data, 'data#initStateData')
    let date = new Date(data)
    // log(date, 'date#initStateData')
    // this.props.onUpdated && this.props.onUpdated(data)
    this.mounted &&
      this.setState({ date, editable }, () => {
        onComplete && onComplete()
      })
    // this.props.onUpdated && this.props.onUpdated(this.state.data)
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
