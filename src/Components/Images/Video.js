import React, { useState, useEffect } from 'react'
import RNVideo from 'react-native-video'

import { Thumbnail } from 'react-native-thumbnail-video'

export const Video = props => {
  let { navigation, url } = props
  let [paused = false, setPaused] = useState(props.data)
  // if (!data) return null
  let player = React.forwardRef()
  _onPress = () => {
    // alert(url)
    popup.open(
      <RNVideo
        source={{ uri: url }}
        {...props}
        flex={1}
        // ref={ref => {
        //   this.player = ref
        // }} // Store reference
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={videoError} // Callback when video cannot be loaded
        resizeMode={iOS ? 'contain' : 'contain'}
        // style={styles.backgroundVideo}
        controls={true}
        playInBackground={true}
        ignoreSilentSwitch={'ignore'}
        playWhenInactive={true}
        style={{
          // position: 'absolute',
          flex: 1,
          // top: 0,
          // left: 0,
          // bottom: 0,
          // right: 0,
          width: SCREEN_WIDTH,
          // height: SCREEN_HEIGHT * 0.8,
        }}
      />,
      {
        fullScreen: true,
        backgroundColor: 'black',
        padding: 0,
        swipeToClose: true,
      }
    )
  }
  videoError = err => {
    log(err, 'err')
  }
  log(url, 'url')
  return (
    <T.Touch onPress={_onPress}>
      {/* <T.Image {...props} /> */}
      {true ? (
        <RNVideo
          flex={1}
          ref={c => (player = c)}
          // flex={1}
          allowsFullscreenVideo={true}
          // originWhitelist={['*']}
          source={{ uri: url }}
          playWhenInactive={false}
          muted={true}
          resizeMode="cover"
          paused={paused}
          onLoad={() => {
            player.seek(0)
            // delayed(() => {
            setPaused(true)
            // })
            // player.restoreUserInterfaceForPictureInPictureStopCompleted(true)
          }}
          style={{
            // flex: 1,
            width: '100%',
            height: SCREEN_WIDTH / 1.5,
            // height: 300,
            // height: T.size.contentHeight,
          }}
        />
      ) : (
        <Thumbnail
          imageWidth={SCREEN_WIDTH}
          imageHeight={300}
          url={url}
          style={{
            // flex: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH / (iOS ? 1.5 : 3),
            height: 300,
            // height: T.size.contentHeight,
          }}
        />
      )}
    </T.Touch>
  )
}
