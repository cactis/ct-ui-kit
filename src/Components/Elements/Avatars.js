import React, { useState, useEffect } from 'react'

import { StyleSheet } from 'react-native'

let _navigation

export const Avatar0 = (props) => {
  let { size = 80, navigation, onChange, flow = 'column', title } = props
  let [data, setData] = useState(props.data)
  // log(data, 'data 000000000000')
  if (!data) return null
  let { item = data } = data
  // log(item.degree.title, 'item.degree.title---------')
  // let uri = item.avatar_url
  let [uri, setUri] = useState(item.avatar_url)
  useEffect(() => {
    // log('useEffect in Avatar0')
    setData(props.data)
    setUri(props.data.avatar_url)
  })
  return (
    <T.Row flex={0} opPress={() => navigateToObject(item)}>
      <T.Div align="center" flow={flow}>
        <T.Photo rounded uri={uri} size={size} onChange={onChange} />
        <T.Space />
        <T.Col>
          <T.Label text={item.name} theme="H3" size={size / 2} />
          <T.Text text={title || item.title} size={size / 3} />
        </T.Col>
        {/* <T.Space /> */}
      </T.Div>
    </T.Row>
  )
}

// export const Round = (props) => {
//   let { data, size = 60, navigation, uri } = props
//   let { item = data } = data
//   uri = uri || data?.cover?.thumb_file_url
//   return (
//     <T.View {...props}>
//       <T.Touch onPress={() => navigateToRecord(item, navigation)}>
//         <T.Image rounded uri={uri} size={size} />
//         <T.Float bottom={-10} right={-10}>
//           {props.icon}
//         </T.Float>
//       </T.Touch>
//     </T.View>
//   )
// }
//
// const Avatar = (props) => {
//   let { data, navigation, uri } = props
//   if (!data) return null
//   let { item = data } = data
//   return <Round {...props} uri={item.avatar_url} />
// }
//
// export const Avatar3 = (props) => {
//   let { data } = props
//   if (!data) return null
//   let { item = data } = data
//   let uri = item.avatar_url
//   return (
//     <T.Center {...props}>
//       <Avatar {...props} />
//       <T.Label text={item.name} style={{ textAlign: 'center' }} />
//     </T.Center>
//   )
// }
//
export class Avatar1 extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
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

  render() {
    let { size } = this.props
    let { data } = this.state
    // log(data, 'data in Avatar1 render()')
    if (!data) return null
    let { item = data } = data

    return (
      <T.Row flow="row" paddingVertical={rwd(4)} flex={0}>
        <T.Col flex={0}>
          {/* <Avatar data={data} size={size} navigation={_navigation} /> */}
          <T.Photo rounded uri={uri} size={size} onChange={onChange} />
        </T.Col>
        <T.Space />
        <T.Col xAlign="center" onPress={this.onPress}>
          <T.Label text={item.name} theme="H5" />
          <T.Label text={item.title} theme="H7" />
          {this.props.children}
        </T.Col>
      </T.Row>
    )
  }

  onPress = () => {
    let { data } = this.state
    let { item = data } = data
    navigateToRecord(item, _navigation)
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  autoRun = () => {
    _autoRun('profile', () => {
      this.onPress()
    })
  }
}

var styles = StyleSheet.create({})
