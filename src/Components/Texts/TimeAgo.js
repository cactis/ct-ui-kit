import React, { useState } from 'react'

export const TimeAgo = props => {
  let [data, setData] = useState(props.data)
  if (!data) return null

  let { align = 'flex-start', ..._props } = props
  return (
    <>
      <T.Label
        theme="H8"
        color="rgb(125,125,125)"
        // style={{ alignSelf: align }}
        text={timeAgo(data)}
        {..._props}
      />
    </>
  )
}
