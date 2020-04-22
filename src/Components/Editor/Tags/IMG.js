import React from 'react'
import { StyleSheet } from 'react-native'
import Video from 'react-native-video'

import { TagBase } from './TagBase'
let _navigation
export class IMG extends TagBase {
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

  render() {
    let { data, currentIndex } = this.state
    // log(data, 'data in IMG render()')
    if (!data) return null
    let { item = data } = data
  // log(item, 'item in IMG#render')
    // log(data.index, 'data.index')
    return (
      <T.Row
        borderWidth={EDITOR_LEFT_BORDER_WIDTH}
        marginBottom={this.marginBottom}
        onPress={this.onFocus}
        borderColor={this.isMe() ? EDITOR_FOCUSED : EDITOR_NOT_FOCUSED}
      >
        {/* {item.src.search(/mp4/) > -1 ? (
          <Video
            source={{ uri: item.src }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref
            }} // Store reference
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            // onError={this.videoError} // Callback when video cannot be loaded
          />
        ) : ( */}
        {item.src.search(/mp4/) > -1 ? (
          <Video
            muted={true}
            paused={true}
            source={{ uri: item.src }}
            style={{ height: 200 }}
          />
        ) : (
          <T.Image uri={item.src} />
        )}

        {/* )} */}
      </T.Row>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
