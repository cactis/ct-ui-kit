import React, { useState } from 'react'

export const ChattingItem = props => {
  let [data, setData] = useState(props.data)
  if (!data) return null
  let { item = data } = data
  // log(item, 'item')
  let { message } = item

  _autoRun('showChatting', () => {
    props.onPress()
  })
  return (
    <T.Cell onPress={props.onPress} flow="row">
      <T.Center flex={0}>
        <R.Round data={item.chatable} navigation={props.navigation} />
      </T.Center>
      <T.Space />
      <T.Col xAlign="center">
        <T.Space />
        <T.Label text={`${message?.user?.name}`} theme="H5" />
        <T.Text text={message?.content} />
        <T.Space />
        <T.Label text={item.title} theme="H8" />
        <T.Space />
        <R.TimeAgo align="flex-end" data={message?.created_at} />
      </T.Col>
    </T.Cell>
  )
}
