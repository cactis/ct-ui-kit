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
    log(keyword, 'keyword')
    this.props.onChange && this.props.onChange(keyword)
    this.setState({ value: keyword })
  }

  render() {
    let { data, value } = this.state
    // log(data,  'data in SearchBar render()')
    // if (!data) return null
    // let { item = data} = data
    let { style = {}, width = SCREEN_WIDTH - SIZE.m, paddingHorizontal = SIZE.s } = this.props
    let {
      borderRadius = SIZE.s,
      placeholderTextColor = window.SEARCHBAR_PLACEHOLDER_COLOR,
      backgroundColor = window.SEARCHBAR_BACKGROUND_COLOR
    } = style
    return (
      <Row paddingTop={SIZE.s} paddingBottom={SIZE.n} flex={1} backgroundColor_="red" width__={width}
        paddingHorizontal={this.props.searchBarCustomButton ? SIZE.s : paddingHorizontal}
        flow='row'
        width='100%' marginVertical={SIZE.t} {...this.props}  >
        <T.Col>
          <Row
            // borderRadius={borderRadius}
            style={{ borderRadius: borderRadius }}
            paddingVertical={SIZE.t}
            backgroundColor={backgroundColor}
          // backgroundColor='red'
          >
            <TextInput
              placeholder="search"
              // style={{ borderRadius: SIZE.m }}
              padding={SIZE.s}
              paddingHorizontal={SIZE.m}
              clearButtonMode="always"
              autoCapitalize="none"
              placeholderTextColor={placeholderTextColor}
              value={value || this.props.keyword || this.props.value}
              // onChange={this.props.onChange}
              onChangeText={(value) => {
                this.setState({ value: value })
                this.props.onChange && this.props.onChange(value)
              }}
              onSubmitEditing={() =>
                this.props.onSubmit && this.props.onSubmit(value)
              }
            />
          </Row>
        </T.Col>
        {this.props.searchBarCustomButton}
      </Row>
    )
  }
  onPress = () => {
    if(this.props.onPress) {
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
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
