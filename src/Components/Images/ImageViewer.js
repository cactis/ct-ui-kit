import React from 'react'
import { StyleSheet } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import ImageView from 'react-native-image-viewing'

let _navigation
export class ImageViewer extends React.PureComponent {
  state = {
    data: null,
    visible: true,
  }

  render() {
    let { data, visible } = this.state
    log(data, 'data in ImageViewer render()')
    if (!data) return null
    let { item = data } = data
    log(item, 'item#ImageViewer')
    let images = item.uploads.map((i) => {
      uri: i.large_file_url
    })
    log(images, 'images#')
    return (
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => this.setState({ visible: false })}
      />
    )
  }
  // <ImageZoom
  //   cropWidth={SCREEN_WIDTH}
  //   cropHeight={SCREEN_HEIGHT}
  //   imageWidth={SCREEN_WIDTH}
  //   imageHeight={SCREEN_HEIGHT}
  // >
  //   <T.RNImage
  //     style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
  //     source={{
  //       uri: item.uploads[0].file_url,
  //     }}
  //   />
  // </ImageZoom>
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
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
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
