import React, { useState } from 'react'

export const UL = props => {
  let { navigation } = props
  let [data = [{ content: 'list' }], setData] = useState(props.data)
  if (!data) return null
  log(data, 'data')
  return null
  return_(
    <T.List
      data={data}
      renderItem={({ item }) => (
        <T.Row>
          <T.Center flex={0}>
            <T.Label text="．" />
          </T.Center>
          <T.Col>
            <T.RNText value={item.content} />
          </T.Col>
        </T.Row>
      )}
    />
  )
}
