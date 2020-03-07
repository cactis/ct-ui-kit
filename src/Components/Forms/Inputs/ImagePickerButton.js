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
    log(data, 'data in ImagePickerButton render()')
    // if (!data) return null
    // let { item = data} = data
    return <T.Icon {...props} onPress={this.onPress} />
  }
  onPress = () => {
    if (this.props.onPress) {
      getImage().then(image => {
        this.props.onPress(image)
      })
    } else {
      alert('need to set onPress on item')
    }
  }

  getImage = async () => {
    RNImagePicker.openPicker({
      compressImageQuality: 1,
      // width: 300,
      // height: 400,
      // cropping: false,
      // cicular: true,
      includeBase64: true,
    }).then(image => {
      image = base64Image(image)
      log(image, 'image ====')
      setData(image)
      onChanged(image)
      return image
    })
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('ImagePickerButton')
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
