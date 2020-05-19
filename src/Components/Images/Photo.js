import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import * as T from '../../'
import ImageView from 'react-native-image-view'
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-crop-picker'
import ImageViewer from 'react-native-image-zoom-viewer'

let _navigation
export class Photo extends React.PureComponent {
  state = {
    data: null,
    preview: false,
  }

  componentDidMount() {
    _trace()
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
    this.setState({ thumbUri })
    // log(this.props.images, 'this.props.images')
    this.images = this.props.images
      ? this.getImages(this.props.images)
      : [
          {
            source: {
              uri: uri,
            },
            title: title,
            // width: SCREEN_WIDTH,
            // height: SCREEN_HEIGHT,
          },
        ]
    // log(this.images, 'this.images')
  }

  getImages = (images) => {
    // log(images, 'images')
    images = _.filter(images, { type: 'Photo' })
    log(images.length, 'images.length')
    return _.map(images, (img) => {
      return {
        source: {
          uri: img.file_url,
        },
        title: img.title,
        // width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
        // next: true,
        // prev: true,
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uri !== this.props.uri) this.setState({ uri: this.props.uri })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.aspectRatio !== this.props.aspectRatio)
  //     this.setState({ aspectRatio: this.props.aspectRatio })
  // }

  preview = () => {
    this.setState({ preview: true })
  }

  render() {
    let {
      url,
      uri = url,
      // thumbUri = uri,
      data,
      // size,
      // aspectRatio,
      title,
      // preview,
      // aspectRatio,
      // size,
      onChange,
      ...props
    } = this.props
    let { thumbUri = uri } = this.state
    let { preview } = this.state
    // if (!data) return null
    // let { item } = data
    // log(uri, 'uri - in Photo.js#uri')
    return (
      <T.Touch onPress={this.props.onPress || this.preview}>
        <T.Image
          // borderWidth={1}
          // size={size}
          // aspectRatio={aspectRatio}
          uri={thumbUri}
          {...props}
        />
        {/* <Modal visible={preview} transparent={true}> */}
        <ImageView
          images={this.images}
          imageUrls={this.images}
          imageIndex={this.props.index || 0}
          index={this.props.index || 0}
          enablePreload={true}
          enableSwipeDown={true}
          isVisible={preview}
          onClose={() => {
            this.setState({ preview: false })
          }}
          onCancel={() => {
            this.setState({ preview: false })
          }}
          renderFooter={(currentImage) => (
            <T.Grid padding={SAFEAREA_BOTTOM + rwd(10)}>
              <T.Text theme="H7" color="white">
                {title}
              </T.Text>
            </T.Grid>
          )}
        />
        {/* </Modal> */}
        {onChange ? (
          <T.Float right={-5} bottom={0}>
            <T.Center
              width={rwd(32)}
              height={rwd(32)}
              backgroundColor="rgba(235,238,241,1)"
              borderRadius={rwd(32)}
              onPress={this.onChange}
            >
              <T.Icon name="edit" iconSet="AntDesign" size={rwd(15)} />
            </T.Center>
          </T.Float>
        ) : null}
      </T.Touch>
    )
  }
  onChange = () => {
    let { onChange } = this.props
    if (onChange) {
      ImagePicker.openPicker({
        compressImageQuality: 1,
        // width: 300,
        // height: 400,
        // cropping: false,
        // cicular: true,
        mediaType: 'photo',

        includeBase64: true,
      }).then((image) => {
        // log(image, 'image 11111')
        this.setState({ thumbUri: image.path })
        onChange(image)
      })
    }
  }

  autoRun = () => {}
}
var styles = StyleSheet.create({})
