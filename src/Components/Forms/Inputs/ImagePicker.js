import React, { useState, useEffect } from 'react'

import RNImagePicker from 'react-native-image-crop-picker'
import RNFS from 'react-native-fs'
export { RNImagePicker }
export const ImagePicker = (props) => {
  let { navigation, onChanged = () => {}, size } = props
  let [data, setData] = useState(props.data)
  log(data, 'data')
  // if (!data) return null
  getImage = async () => {
    RNImagePicker.openPicker({
      compressImageQuality: 1,
      // width: 300,
      // height: 400,
      // cropping: false,
      // cicular: true,
      includeBase64: true,
    }).then((image) => {
      // log(image, 'image')
      // let a = {}
      // Object.assign(a, image)
      // log(a, 'a')
      // a.data = '[filter]'
      // log(a, 'a')
      image = base64Image(image)
      // log(image, 'image ====')
      data = { ...data, ...image }
      // log(data, 'data')
      setData({ data: { ...data } })
      onChanged({ ...data, ...image })
      return { data: { ...data } }
    })
  }
  return data ? (
    <T.Photo
      uri={data.path || data.small_file_url || data.thumb_file_url}
      size={size}
      onChange={onChanged}
    />
  ) : (
    <T.Icon size={size} name="photo" color="rgb(96,96,96)" onPress={getImage} />
  )
}

window.base64Image = async (image) => {
  // log(image, 'image in base64Image')
  let { mime, path } = image
  log(path, 'path')
  // if (mime.search(/mp4/) > -1) {
  // log('read mp4')
  let base64 = await RNFS.readFile(path, 'base64')
  image.data = base64
  // log(image, 'image')
  // .then(async base64 => {
  //   // log(base64, 'base64 222222222222')
  //   image.data = await base64
  // log(image, 'image')
  //   // onGetImage(image)
  //   return image
  // })
  // .catch(err => {
  //   log(err, 'err')
  // })
  return image
  // } else {
  //   // onGetImage(image)
  //   return image
  // }
}
