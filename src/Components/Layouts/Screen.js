import React from 'react'
import { Scroll, Grid, SafeArea } from './'
import { RefreshControl } from 'react-native'

let _navigation
export class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    log(_navigation, '--------------------------')
    // return {
    //   title: navigation.state.params?.title || '',
    // }
  }
  state = {
    refreshing: false,
  }

  scrollToBottom = () => {
    this.scroll?.scrollToBottom()
  }

  onOpen = () => {}
  onRefresh = () => {
    this.props.onRefresh && this.props.onRefresh()
  }

  componentDidMount() {
    if (this.props.navigation) _navigation = this.props.navigation
    this.initStateData(() => {
      this.onOpen(this)
    })
  }

  render() {
    let { refreshing } = this.state
    let {
      padding = 10,
      safeAreaDisabled = false,
      scrollable = false,
    } = this.props
    const content = scrollable ? (
      <Scroll
        ref={c => (this.scroll = c)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <Grid padding={padding} {...this.props} />
      </Scroll>
    ) : (
      <Grid padding={padding} {...this.props} />
    )
    const body = safeAreaDisabled ? (
      content
    ) : (
      <SafeArea flex={1}>{content}</SafeArea>
    )
    return body
  }

  initStateData = onComplete => {
    if (_navigation?.state?.params) {
      let { data, options } = _navigation.state.params
      if (options) {
        let { onOpen } = options
        if (onOpen) this.onOpen = onOpen
      }
    }
  }
}
