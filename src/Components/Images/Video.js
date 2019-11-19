import React, { useState, useEffect } from 'react'
import RNVideo from 'react-native-video'

export const Video = props => {
  let { navigation, url } = props
  let [data, setData] = useState(props.data)
  // if (!data) return null

  _onPress = () => {
    alert(url)
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
        resizeMode="cover"
        // style={styles.backgroundVideo}
        controls={true}
        style={{
          // position: 'absolute',
          flex: 1,
          // top: 0,
          // left: 0,
          // bottom: 0,
          // right: 0,
          // width: SCREEN_WIDTH,
          // height: SCREEN_HEIGHT * 0.8,
        }}
      />,
      { fullScreen: true, backgroundColor: 'black' }
    )
  }
  videoError = err => {
    log(err, 'err')
  }
  return (
    <T.Touch onPress={_onPress}>
      <T.Image {...props} />
    </T.Touch>
  )
}
