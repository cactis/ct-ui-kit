import React, { useState, useEffect } from 'react'

export const Media = (props) => {
  // let _ref = React.forwardRef()
  let { navigation, image } = props
  let [data, setData] = useState(props.data)
  if (!data) return null
  let { item = data } = data
  // log(item, 'item in Media')
  // useEffect(() => {
  //   return () => {}
  // })

  // let Tag
  log(item.type, 'item.type')
  switch (item.type) {
    case 'Video':
      return <T.Video url={item.path || item.data || item.file_url} />
      break
    case 'Photo':
      return (
        <T.Photo
          uri={item.path || item.data || item.small_file_url || item.file_url}
          ref={(c) => (this.photo = c)}
          {...props}
        />
      )
      break
    case 'Pdf':
      return <T.Pdf data={item} {...props} />
      return
  }
  // alert(item.mime)
  switch (item.mime) {
    case 'audio/mp3':
      return (
        <T.Mp3
          data={item}
          url={item.url || item.path || item.data || item.file_url}
        />
      )
      {
        /* <T.Video url={item.url || item.path || item.data || item.file_url} /> */
      }
      return
    case 'video/mp4':
      return (
        <T.Video {...props} url={item.path || item.data || item.file_url} />
      )
      break
    case 'application/pdf':
      return <T.Pdf data={item} {...props} />
      break
    default:
      return (
        <T.Photo
          uri={item.path || item.data || item.small_file_url || item.file_url}
          {...props}
        />
      )
  }
}
