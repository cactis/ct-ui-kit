import React, { useState, useEffect } from 'react'
import RNVideo from 'react-native-video'

export const Video = (props) => {
  let { navigation } = props
  // log(url, 'url')
  let [paused = false, setPaused] = useState(null)
  let [color = 'rgba(38,38,38,.78)', setColor] = useState(null)
  let [url, setUrl] = useState(props.url)
  // useEffect(() => {
  //   setUrl(props.url)
  // })
  useEffect(() => {
    return () => {}
  })
  // if (!data) return null

  let player = React.createRef()
  _onPress = () => {
    // alert(url)
    popupScreen.open(
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
        // resizeMode='cover'
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
  videoError = (err) => {
    log(err, 'err')
  }
  // log(url, 'url')
  // log(props.style, 'ssssss')
  return (
    <T.Grid>
      <RNVideo
        flex={1}
        ref={(c) => (player = c)}
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
          setColor('white')
          // })
          // player.restoreUserInterfaceForPictureInPictureStopCompleted(true)
        }}
        style={{
          // flex: 1,
          width: '100%',
          height: SCREEN_WIDTH / 1.5,
          height: '100%',
          // height: 300,
          // height: T.size.contentHeight,
          ...props.style,
        }}
      />
      <T.Float
        flex={1}
        // backgroundColor="rgba(255,255,255,.22)"
        width="100%"
        height="100%"
      >
        <T.Center>
          <T.Icon
            onPress={_onPress}
            size={rwd(60)}
            name="play"
            color={color}
            iconSet="AntDesign"
            // borderWidth={0.5}
            // borderColor="white"
            // padding={rwd(20)}
            // backgroundColor="black"
          />
        </T.Center>
      </T.Float>
    </T.Grid>
  )
}

import { StyleSheet } from 'react-native'

let _navigation
export class Video2 extends React.PureComponent {
  state = {
    data: null,
    paused: false,
  }
  // let player = React.createRef()
  render() {
    let { url, paused, color = 'rgba(38,38,38,.78)' } = this.state
    log(url, 'url')
    // log(data, 'data in Video render()')
    // if (!data) return null
    // let { item = data} = data
    return (
      <T.Grid>
        <RNVideo
          flex={1}
          ref={(c) => (this.player = c)}
          // flex={1}
          allowsFullscreenVideo={true}
          // originWhitelist={['*']}
          source={{ uri: url }}
          playWhenInactive={false}
          muted={true}
          resizeMode="cover"
          paused={paused}
          onLoad={() => {
            this.player.seek(0)
            // delayed(() => {
            this.setState({ paused: true, color: 'white' })

            // })
            // player.restoreUserInterfaceForPictureInPictureStopCompleted(true)
          }}
          style={{
            // flex: 1,
            width: '100%',
            height: SCREEN_WIDTH / 1.5,
            height: '100%',
            // height: 300,
            // height: T.size.contentHeight,
            ...this.props.style,
          }}
        />
        <T.Float
          flex={1}
          // backgroundColor="rgba(255,255,255,.22)"
          width="100%"
          height="100%"
        >
          <T.Center>
            <T.Icon
              onPress={this.onPress}
              size={rwd(60)}
              name="play"
              color={color}
              iconSet="AntDesign"
              // borderWidth={0.5}
              // borderColor="white"
              // padding={rwd(20)}
              // backgroundColor="black"
            />
          </T.Center>
        </T.Float>
      </T.Grid>
    )
  }
  videoError = (err) => {
    log(err, 'err')
  }
  onPress = () => {
    popupScreen.open(
      <RNVideo
        source={{ uri: url }}
        {...props}
        flex={1}
        // ref={ref => {
        //   this.player = ref
        // }} // Store reference
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        resizeMode={iOS ? 'contain' : 'contain'}
        // resizeMode='cover'
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

  initStateData = (onComplete) => {
    let { data, url } = this.props
    this.mounted &&
      this.setState({ data, url }, () => {
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
    if (prevProps.url !== this.props.url) this.setState({ url: this.props.url })
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
