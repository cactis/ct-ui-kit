import React from 'react'
import { StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

let _navigation
export class TagsToolbar extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace('TagsToolbar')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
    window.tagsToolbar = this
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  setCurrentTag = currentTag => {
    log(currentTag, 'currentTag')
    this.setState({ currentTag })
  }

  render() {
    let { currentTag } = this.state
    // log(currentTag, 'currentTag in TagsToolbar render')
    // if (!data) return null
    // let { item = data } = data

    return (
      <T.Center flow="row">
        <Icon currentTag={currentTag} tag="h1">
          <T.Label theme="H4" text="H1" />
        </Icon>
        <Icon currentTag={currentTag} tag="h2">
          <T.Label theme="H4" text="H2" />
        </Icon>
        <Icon currentTag={currentTag} tag="p">
          <T.Label theme="H4" text="P" />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tag="img">
          <T.Icon name="image" />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tag="ul">
          <T.Icon name="list-ul" />
        </Icon>
        <Icon currentTag={currentTag} tag="ol">
          <T.Icon name="list-ol" />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tag="link">
          <T.Icon name="link" />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tag="enter">
          <T.Icon name="playlist-plus" iconSet="MaterialCommunityIcons" />
        </Icon>
      </T.Center>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})

import { useState } from 'react'
const Icon = props => {
  onPress = () => {
    switch (tag) {
      case 'enter':
        log(window.tag.state.data)
        let index = window.tag.state.data.index
        // alert(index)
        window.editor.insertItem(index + 1)
        break
      case 'img':
        ImagePicker.openPicker({
          compressImageQuality: 1,
          // width: 300,
          // height: 400,
          // cropping: false,
          // cicular: true,
          includeBase64: true,
        }).then(image => {
          log(image, 'image')
          window.tag.setTag(tag, { image })
        })
        break
      case 'h1':
      case 'h2':
      case 'p':
        window.tag.setTag(tag)
        break
      case 'ul':
        log(tag, ' tag')
        // window.tag.setTag(tag)
        alert()
        break
      default:
        alert()
    }
  }
  let { navigation, currentTag, tag } = props
  let [data, setData] = useState(props.data)
  let flag =
    currentTag == tag ? (
      <T.Float width="100%" height="100%" align="center">
        <T.Space
          size={rwd(20)}
          borderRadius={rwd(20)}
          backgroundColor="rgba(180,147,9,.26)"
        />
      </T.Float>
    ) : null
  return (
    <T.Center {...props} onPress={onPress}>
      {flag}
      {props.children}
    </T.Center>
  )
}

export const Divide = props => {
  let { navigation } = props
  let [data, setData] = useState(props.data)
  // if (!data) return null
  return (
    <T.Div backgroundColor="rgba(74,74,74,.5)" width={0.4} height={rwd(22)} />
  )
}
