import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from '../../'
import ImageView from 'react-native-image-view'
import FastImage from 'react-native-fast-image'
let _navigation
export class Photo extends React.PureComponent {
  state = {
    data: null,
    preview: false,
  }

  componentDidMount() {
    _trace('Photo')
    _navigation = this.props.navigation
    // let { uri, url, aspectRatio, data, title, preview, size = 50 } = this.props
    // this.setState({ uri, url, data, title, preview, size })
    this.autoRun()
    let {
      url,
      uri = url,
      thumbUri = uri,
      data,
      // size,
      // aspectRatio,
      title,
      // preview,
      // aspectRatio,
      // size,
      ...props
    } = this.props
    this.images = [
      {
        source: {
          uri: uri,
          title: title,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        },
      },
    ]
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.aspectRatio !== this.props.aspectRatio)
  //     this.setState({ aspectRatio: this.props.aspectRatio })
  // }

  render() {
    let {
      url,
      uri = url,
      thumbUri = uri,
      data,
      // size,
      // aspectRatio,
      title,
      // preview,
      // aspectRatio,
      // size,
      ...props
    } = this.props
    let { preview } = this.state
    // if (!data) return null
    // let { item } = data
    // log(uri, 'uri - in Photo.js#uri')
    return (
      <T.Touch
        onPress={() => {
          // _log(uri, 'uri')
          // alert(uri)
          this.setState({ preview: true })
        }}
      >
        <T.Image
          // borderWidth={1}
          // size={size}
          // aspectRatio={aspectRatio}
          uri={thumbUri}
          {...props}
        />
        <ImageView
          images={this.images}
          imageIndex={0}
          isVisible={preview}
          onClose={() => {
            this.setState({ preview: false })
          }}
          renderFooter={currentImage => (
            <T.Grid padding={SAFEAREA_BOTTOM + rwd(10)}>
              <T.Text theme="H7" color="white">
                {title}
              </T.Text>
            </T.Grid>
          )}
        />
      </T.Touch>
    )
  }

  autoRun = () => {}
}
var styles = StyleSheet.create({})
