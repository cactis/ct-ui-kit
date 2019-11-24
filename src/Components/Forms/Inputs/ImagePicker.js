import React, { useState, useEffect } from 'react'

import RNImagePicker from 'react-native-image-crop-picker'
import RNFS from 'react-native-fs'

export const ImagePicker = props => {
  let { navigation, onGetImage = () => {} } = props
  let [data, setData] = useState(props.data)
  // if (!data) return null
  getImage = async () => {
    RNImagePicker.openPicker({
      compressImageQuality: 1,
      // width: 300,
      // height: 400,
      // cropping: false,
      // cicular: true,
      includeBase64: true,
    }).then(image => {
      return formatImage(image)
    })
  }

  return (
    <T.Icon
      // size={rwd(40)}
      name="photo"
      color="rgb(96,96,96)"
      onPress={getImage}
    />
  )
}

window.base64Image = async image => {
  log(image, 'image 11111')
  let { mime, path } = image
  if (mime.search(/mp4/) > -1) {
    log('read mp4')
    RNFS.readFile(path, 'base64')
      .then(base64 => {
        log(base64, 'base64')
        image.data = base64
        log(image, 'image 22222')
        // onGetImage(image)
        return image
      })
      .catch(err => {
        log(err, 'err')
      })
  } else {
    // onGetImage(image)
    return image
  }
}
