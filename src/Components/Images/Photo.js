import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import * as T from '../../'
// import ImageView from 'react-native-image-view'
import ImageView from 'react-native-image-viewing'
// import ImageView from 'react-native-image-viewing'

import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-crop-picker'
import ImageViewer from 'react-native-image-zoom-viewer'

let _navigation
export class Photo extends React.PureComponent {
  state = {
    data: null,
    preview: false,
  }

  render() {
    log(this.images, 'this.images')
    let {
      url,
      uri = url,
      // thumbUri = uri,
      data,
      // size,
      // aspectRatio,
      editable = false,
      title,
      // preview,
      // aspectRatio,
      // size,
      onChanged,
      onChange = onChanged,
      parent,
      index,
      ...props
    } = this.props
    let { thumbUri = uri } = this.state
    let { preview } = this.state
    // if (!data) return null
    // let { item } = data
    // log(uri, 'uri - in Photo.js#uri')
    // log(this.images, 'this.images#')
    let bg = 'rgb(246, 246, 246)'
    if (parent?.uploads[index]._destroy) return null

    return (
      <T.Touch onPress={this.props.onPress || this.preview}>
        <T.Row flex={0}>
          <T.Image
            // borderWidth={1}
            // size={size}
            // aspectRatio={aspectRatio}
            uri={thumbUri}
            {...props}
          />
          {editable ? (
            <T.Float right={rwd(SIZE.t)} top={rwd(SIZE.t)}>
              <T.Icon
                name="close"
                smaller={10}
                backgroundColor="rgba(255,255,255,.87)"
                onPress={() => {
                  // T.RNKeyboard.dismiss()
                  this.setState({ data: { ...data } }, () => {
                    // confirm(
                    //   () => {

                    parent.uploads[index]._destroy = true
                    this.setState({ data: null, thumbUri: null })
                    this.props.onUpdated({ ...parent })
                    // },
                    // { title: `確定刪除?` }
                    // )
                  })
                }}
              />
            </T.Float>
          ) : null}
        </T.Row>
        {/* <Modal visible={preview} transparent={true}> */}
        <ImageView
          images={this.images}
          imageIndex={0}
          visible={preview}
          backgroundColor={bg}
          onRequestClose={() => this.setState({ preview: false })}
          HeaderComponent={({ imageIndex }) => (
            <T.Row
              // padding={SIZE.l}
              // __b__
              // height={SCREEN_HEIGHT - 100}
              backgroundColor={bg}
              xAlign="flex-end"
              yAlign="center"
            >
              <T.Space size={SAFEAREA_TOP} />
              <T.Space>
                <T.Text
                  numberOfLines={1}
                  text={this.images[imageIndex].title}
                  theme="H5"
                />
              </T.Space>

              {/* <T.Row align="center">
                <T.Label
                  text={`${imageIndex + 1} / ${this.images.length}`}
                  color="rgb(104, 104, 104)"
                  theme="H9"
                />
              </T.Row> */}
            </T.Row>
          )}
          FooterComponent={({ imageIndex }) => (
            <>
              <T.Row backgroundColor={bg} padding={SIZE.m} __b____>
                {/* <T.Center padding={SIZE.s}>
                <T.Text
                  numberOfLines={0}
                  text={this.images[imageIndex].title}
                  color={LIGHT_COLOR}
                />
              </T.Center> */}
                <T.Text
                  numberOfLines={10}
                  text={this.images[imageIndex].description}
                  theme="H7"
                />
              </T.Row>
              <T.Row align="center" padding={SIZE.l}>
                <T.Label
                  text={`${imageIndex + 1} / ${this.images.length}`}
                  color="rgb(104, 104, 104)"
                  theme="H9"
                />
                <T.Float right={SIZE.s} bottom={SIZE.l * 0.8}>
                  <T.Icon
                    smaller={10}
                    name="close"
                    size={SIZE.m * 1.2}
                    name={CLOSE_ICON_NAME}
                    iconSet={CLOSE_ICON_SET}
                    // backgroundColor="#efefef"
                    color={TColor.mostReadable('efefef', ['#efefef', '#111'])}
                    onPress={() => this.setState({ preview: false })}
                  />
                </T.Float>
              </T.Row>
              <T.Space size={SAFEAREA_BOTTOM} />
            </>
          )}
        />

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
    // log(images.length, 'images.length')
    return _.map(images, (img) => {
      return { uri: img.large_file_url }
      return {
        source: {
          uri: img.large_file_url || img.fiel_url,
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
    if (prevProps.parent !== this.props.parent)
      this.setState({ parent: this.props.parent })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.aspectRatio !== this.props.aspectRatio)
  //     this.setState({ aspectRatio: this.props.aspectRatio })
  // }

  preview = () => {
    this.setState({ preview: true })
  }
  onChange = () => {
    let { onChange } = this.props
    if (onChange) {
      ImagePicker.openPicker({
        compressImageQuality: 0.75,
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
