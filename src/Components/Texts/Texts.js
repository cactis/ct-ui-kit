import React from 'react'
import {
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import * as T from 'ct-ui-kit'

let _navigation
export class Texts extends React.PureComponent {
  state = {
    data: null,
    editable: iOS ? false : true,
  }

  componentDidMount() {
    _trace('Texts')
    _navigation = this.props.navigation
    let { data } = this.props
    this.setState({ data }, () => {})
    this.autoRun()
    delayed(() => {
      this.setState({ editable: false })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text)
      this.setState({ text: this.props.text })
    // if (prevProps.editable !== this.props.editable)
    //   this.setState({ editable: this.props.editable })
  }

  onSelectionChange = e => {
    let { text } = this.props
    const { start, end } = e.nativeEvent.selection
    if (!text || start == end) return
    log(start, end, text)
    let selected = text.slice(start, end)
    log(selected, 'selected')

    let texts = selected.split(' ')
    if (texts.length == 1) {
      runLast(() => {
        T.Api.get(`/looks/${selected}`, {}, result => {
          // log(result, 'result')
          if (window.HistoryScreenNeedUpdateTags)
            HistoryScreenNeedUpdateTags(selected)
        })
      }, 5000)
    } else if (texts.length > 1) {
    }
  }

  render() {
    let {
      text,
      color = '#333',
      theme = 'H6',
      fontSize = BASE_SIZE + (9 - parseInt(theme.split('')[1])),
      scrollEnabled = false,
      numberOfLines = 0,
      ...props
    } = this.props
    let { editable } = this.state
    // log(text, 'text in Texts render()')
    // if (!data) return null
    // let { item } = data
    return (
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TextInput
        // borderWidth={1}
        // keyboardType="numeric"
        // borderColor="rgb(233,161,194)"
        value={text}
        editable={editable}
        flex={1}
        // color="white"
        fontSize={fontSize}
        lineHeight={rwd(18)}
        onSelectionChange={this.onSelectionChange}
        // color="rgb(97,92,98)"
        // textIsSelectable={true}
        selectable={true}
        multiline={true}
        scrollEnabled={scrollEnabled}
        numberOfLines={numberOfLines}
        style={{ color: color }}
        {...props}
      />
      // </TouchableWithoutFeedback>
    )
  }

  autoRun = () => {}
}
var styles = StyleSheet.create({})
