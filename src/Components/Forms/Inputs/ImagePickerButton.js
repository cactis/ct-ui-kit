import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class ImagePickerButton extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    let { ...props } = this.props
    // log(data, 'data in ImagePickerButton render()')
    // if (!data) return null
    // let { item = data} = data
    return <T.Icon {...props} onPress={this.onPress} />
  }
  onPress = () => {
    if (this.props.onPress) {
      this.openAlbums(
        this.props.type,
        this.props.options,
        this.props.onPress
      ).then((image) => {
        // log(image, 'image 2222 in ImagePickerButton#onPress')
        this.props.onPress(image)
      })
    } else {
      alert('need to set onPress on item')
    }
  }

  openAlbums = async (type = 'photo', options = {}, callback) => {
    let { multiple = false } = options
    if (type == 'photo') {
      T.RNImagePicker.openPicker({
        compressImageQuality: 0.75,
        ...options,
        multiple: multiple,
        // width: 300,
        // height: 400,
        // cropping: false,
        // cicular: true,
        includeBase64: true,
      }).then(async (images) => {
        // log(image, 'image 00000')
        log(111111)
        // log(images, 'images')
        // alert(images.length)
        if (multiple) {
          Promise.all(
            images.map(async (image) => {
              return await base64Image(image)
            })
          ).then((photos) => {
            callback(photos)
            return photos
          })
        } else {
          log(2222)
          // log(typeof images)
          base64Image([images][0]).then((image) => {
            // log(
            //   image,
            //   'image 1111 after base64Image in ImagePickerButton#openAlbums'
            // )
            // setData(image)
            // onChanged(image)
            callback([image])
            return [image]
          })
        }
      })
    } else {
      // if (DEVICE_INFO.isSimulator) return alert('相機不支援模擬器。')
      T.RNImagePicker.openCamera({
        compressImageQuality: 0.75,
        // width: 300,
        // height: 400,
        // cropping: false,
        // cicular: true,
        includeBase64: true,
      }).then((image) => {
        // log(image, 'image 00000')
        base64Image(image).then((image) => {
          // log(
          //   image,
          //   'image 1111 after base64Image in ImagePickerButton#openAlbums'
          // )
          // setData(image)
          // onChanged(image)
          callback([image])
          return image
        })
      })
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
