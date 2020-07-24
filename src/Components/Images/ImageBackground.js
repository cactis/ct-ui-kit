import React from 'react'
import { ImageBackground as RNImageBackground } from 'react-native'
export { RNImageBackground }
export class ImageBackground extends React.PureComponent {
  reload = () => {
    let uri = this.randomUri()
    this.setState({
      uri: uri,
    })
  }

  randomUri = () => {
    let s = randId(1, 3, true)
    let w = parseInt(SCREEN_WIDTH * s)
    let h = parseInt(SCREEN_HEIGHT * s)
    let url0 = `https://source.unsplash.com/random/${w}x${h}/?random&${s}`
    let url1 = `https://picsum.photos/${w}/${h}/?random&${s}`
    let url = [url0, url1].sample()
    log(url, 'url')
    return url
  }
  render() {
    let {
      placeholdered = true,
      source,
      uri = source && source.uri,
      resizeMode = 'cover', //'stretch', //
    } = this.props
    // log(source, 'source')
    // log(uri, 'uri')
    if (placeholdered && !uri) {
      // uri = 'https://picsum.photos/1000/1400/?random'
      uri = `https://picsum.photos/${SCREEN_WIDTH}/${SCREEN_HEIGHT}/?random&${randId()}`
      uri = 'https://nofriends.goodsforfree.com.tw/images/introSlide/bg.png'
    } else {
    }
    if (source) {
      return (
        <RNImageBackground
          style={{ flex: 1, resizeMode: resizeMode }}
          {...this.props}
          // padding={50}
          source={source}
        />
      )
    } else if (uri) {
      log(uri, 'uri#ImageBackgroud')
      return (
        <RNImageBackground
          {...this.props}
          style={{
            flex: 1,
            resizeMode: resizeMode,
            justifyContent: 'center',
            ...this.props.style,
          }}
          // padding={50}
          source={{ uri: uri }}
        />
      )
    } else {
      return (
        <RNImageBackground
          style={{ flex: 1 }}
          {...this.props}
          // padding={50}
        />
      )
    }
  }
}
