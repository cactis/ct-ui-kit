import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList as RNList, View, TextInput } from 'react-native'
import { Div, Row, Grid, Col, RowLine, Cell, Space, Float, Hr } from '../'
let _navigation
export class SearchBar extends React.PureComponent {
  state = {
    data: null,
  }

  search = (keyword) => {
    // alert(keyword)
    this.props.onChange(keyword)
    this.setState({ value: keyword })
  }

  render() {
    let { data, value } = this.state
    // log(data,  'data in SearchBar render()')
    // if (!data) return null
    // let { item = data} = data
    let { style = {}, width = SCREEN_WIDTH - SIZE.m } = this.props
    let {
      borderRadius,
      placeholderTextColor = window.SEARCHBAR_PLACEHOLDER_COLOR,
      backgroundColor = window.SEARCHBAR_BACKGROUND_COLOR,
    } = style
    return (
      <Row padding={SIZE.n} flex={1} backgroundColor__="red" width={width}>
        <Row
          borderRadius={borderRadius}
          paddingVertical={rwd(5)}
          paddingHorizontal={rwd(10)}
          marginBottom={SIZE.s * 1.2}
          // backgroundColor="rgba(255,255,255,.59)"
          // backgroundColor="#E4E8EB"
          backgroundColor={backgroundColor}
          // backgroundColor="red"
        >
          <TextInput
            placeholder="type keyword to search..."
            placeholder="#hashtag search"
            padding={rwd(4)}
            clearButtonMode="always"
            autoCapitalize="none"
            placeholderTextColor={placeholderTextColor}
            value={value || this.props.value}
            onChange={this.props.onChange}
            onChangeText={(value) => {
              this.setState({ value: value })
              this.props.onChange(value)
            }}
            onSubmitEditing={this.props.onSubmit}
          />
        </Row>
      </Row>
    )
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
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
