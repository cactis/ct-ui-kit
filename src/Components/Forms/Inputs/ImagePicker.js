import React, { useState, useEffect } from 'react'

import RNImagePicker from 'react-native-image-crop-picker'
import RNFS from 'react-native-fs'
export { RNImagePicker }
export const ImagePicker = (props) => {
  let { navigation, onChanged = () => { }, size } = props
  let [data, setData] = useState(props.data)
  // log(data, 'data')
  // if (!data) return null
  getImage = async () => {
    RNImagePicker.openPicker({
      compressImageQuality: 0.75,
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
      base64Image(image).then((image) => {
        // log(image, 'image ====')
        data = { ...data, ...image }
        // log(data, 'data')
        setData({ data: { ...data } })
        onChanged(data)
        // return { data: { ...data } }
      })
    })
  }
  return data ? (
    <T.Photo
      uri={data.path || data.small_file_url || data.thumb_file_url}
      size={size}
      // bordered
      // borderRadius={SIZE.s}
      // padding={SIZE.l}
      onChange={onChanged}
    />
  ) : (
    <T.Icon size={size} name="photo" color="rgb(96,96,96)" onPress={getImage} />
  )
}

window.correctFilename = (files) => {
  return files.map((file) => {
    let names = file.uri.split('/')
    names[names.length - 1] = file.name
    file.uri = names.join('/')
    // file.fileCopyUri = file.uri
    return file
  })
}

window.readBase64FromFile = async (file) => {
  let { filename, path } = file
  log(path, 'path#readBase64FromFile')
  let base64 = await RNFS.readFile(path, 'base64')
  // log(base64.length, 'base64.length # ')
  // base64 = T.GZip.compress(base64)
  // log(base64.length, 'base64.length # ')
  file.base64 = base64
  return file
}


window.base64Image = async (image) => {
  // log(image, 'image in base64Image')
  let { mime, path } = image
  // log(path, 'path')
  // if (mime.search(/mp4/) > -1) {
  // log('read mp4')
  let base64 = await RNFS.readFile(path, 'base64')
  // log(base64, 'base64')
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
  // log(image, 'image')
  return image
  // } else {
  //   // onGetImage(image)
  //   return image
  // }
}
