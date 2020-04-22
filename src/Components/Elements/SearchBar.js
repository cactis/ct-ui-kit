import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList as RNList, View, TextInput } from 'react-native'
import { Div, Row, Grid, Col, RowLine, Cell, Space, Float, Hr } from '../'
let _navigation
export class SearchBar extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
  // log(data,  'data in SearchBar render()')
    // if (!data) return null
    // let { item = data} = data
    return (
      <Row padding={SIZE.n} backgroundColor__="rgb(255,255,255)">
        <Row
          borderRadius={rwd(3)}
          paddingVertical={rwd(5)}
          paddingHorizontal={rwd(10)}
          backgroundColor="rgba(255,255,255,.59)"
        >
          <TextInput
            placeholder="type keyword to search..."
            padding={rwd(4)}
            clearButtonMode="always"
            autoCapitalize="none"
            value={this.props.value}
            onChange={this.props.onChange}
            onChangeText={value => this.props.onChange(value)}
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

  initStateData = onComplete => {
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
