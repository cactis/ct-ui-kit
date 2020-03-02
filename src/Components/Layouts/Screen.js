import React from 'react'
import { Scroll, Grid, SafeArea } from './'
import { RefreshControl } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let _navigation
export class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    // log(_navigation, '--------------------------')
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
  onLayout = e => {
    // window.SCREEN_WIDTH = e.nativeEvent.layout.width
    // window.SCREEN_HEIGHT = e.nativeEvent.layout.height
    // alert(window.SCREEN_WIDTH)
  }
  render() {
    let { refreshing } = this.state
    let {
      padding = SIZE.s,
      keyboardAware = false,
      safeAreaDisabled = false,
      scrollable = false,
    } = this.props
    let content = scrollable ? (
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
    content = keyboardAware ? (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        // backgroundColor={backgroundColor}
        ref={ref => (this.scroll = ref)}
        {...this.props}
      >
        <Grid padding={padding} {...this.props} />
      </KeyboardAwareScrollView>
    ) : (
      content
    )

    const body = safeAreaDisabled ? (
      content
    ) : (
      <SafeArea flex={1} backgroundColor={BCOLOR}>
        {content}
      </SafeArea>
    )
    return <Grid onLayout={this.onLayout}>{body}</Grid>
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
