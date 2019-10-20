import React from 'react'
import { Scroll, Grid, SafeArea } from './'
import { RefreshControl } from 'react-native'
export class Screen extends React.Component {
  state = {
    refreshing: false,
  }
  onRefresh = () => {
    this.props.onRefresh && this.props.onRefresh()
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
}
