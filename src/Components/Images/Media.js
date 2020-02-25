import React, { useState, useEffect } from 'react'

export const Media = props => {
  // let _ref = React.forwardRef()
  let { navigation } = props
  let [data, setData] = useState(props.data)
  if (!data) return null
  let { item = data } = data
  // log(item, 'item in Media')
  // useEffect(() => {
  //   return () => {}
  // })

  // let Tag
  switch (item.type) {
    case 'Video':
      return <T.Video url={item.path || item.data || item.file_url} />

      break
    case 'Photo':
      return (
        <T.Photo
          uri={item.path || item.data || item.small_file_url || item.file_url}
          {...props}
        />
      )
  }

  switch (item.mime) {
    case 'video/mp4':
      return <T.Video url={item.path || item.data || item.file_url} />
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
