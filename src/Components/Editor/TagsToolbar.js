import React from 'react'
import { StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import RNFS from 'react-native-fs'

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
    // this.initStateData(() => {
    //   this.autoRun()
    // })
    window.tagsToolbar = this
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let { tagsBar = true } = window
    let { currentTag } = this.state
    // log(currentTag, 'currentTag in TagsToolbar render')
    // if (!data) return null
    // let { item = data } = data
    let stylesToolbar = (
      <T.Row flow="row" xAlign="flex-start" flex={0}>
        <Icon currentTag={currentTag} tagName="b">
          <T.Label
            size={rwd(16)}
            theme="H8"
            text="Bold"
            style={{ fontWeight: '800' }}
          />
        </Icon>
        <Icon currentTag={currentTag} tagName="i">
          <T.Label
            size={rwd(16)}
            theme="H8"
            text="Italic"
            style={{ fontStyle: 'italic' }}
          />
        </Icon>
        <Icon currentTag={currentTag} tagName="a">
          <T.Label size={rwd(16)} theme="H8" text="Link" />
        </Icon>
        <T.Space />
      </T.Row>
    )
    let tagsToolbar = (
      <T.Center flow="row" borderWidth_={1} flex={0}>
        <Icon currentTag={currentTag} tagName="h1">
          <T.Label theme="H4" text="H1" />
        </Icon>
        <Icon currentTag={currentTag} tagName="h2">
          <T.Label theme="H4" text="H2" />
        </Icon>
        <Icon currentTag={currentTag} tagName="p">
          <T.Label theme="H4" text="P" />
        </Icon>
        <Icon currentTag={currentTag} tagName="c">
          <T.Label theme="H4" text="C" size={rwd(10)} />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tagName="img">
          <T.Icon name="image" />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tagName="ul">
          <T.Icon name="list-ul" />
        </Icon>
        <Icon currentTag={currentTag} tagName="ol">
          <T.Icon name="list-ol" />
        </Icon>
        <Divide />
        <Icon currentTag={currentTag} tagName="hr">
          <T.Icon
            name="dots-three-horizontal"
            iconSet="Entypo"
            size={rwd(14)}
          />
        </Icon>
        <Divide />
        {/* <Icon currentTag={currentTag} tagName="a">
      <T.Icon name="link" />
    </Icon> */}
        <Divide />
        {/* <Icon currentTag={currentTag} tagName="trash">
          <T.Icon name="trash" iconSet="EvilIcons" size={rwd(24)} />
        </Icon> */}
        <Icon currentTag={currentTag} tagName="enter">
          <T.Icon name="playlist-plus" iconSet="MaterialCommunityIcons" />
        </Icon>
      </T.Center>
    )
    return (
      <T.Row borderWidth={1} flex={0}>
        {tagsBar ? tagsToolbar : stylesToolbar}
      </T.Row>
    )
  }

  // initStateData = onComplete => {
  //   let { data } = this.props
  //   this.mounted &&
  //     this.setState({ data }, () => {
  //       onComplete && onComplete()
  //     })
  // }

  setCurrentTag = currentTag => {
    log(currentTag, 'currentTag')
    this.setState({ currentTag })
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})

import { useState } from 'react'
const Icon = props => {
  let { navigation, currentTag, tagName } = props
  let [data, setData] = useState(props.data)
  onPress = () => {
    window.tagsToolbar.setCurrentTag(tagName)
    switch (tagName) {
      case 'enter':
        let index = window.tag.state.data.index
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
          log(image, 'image 11111')
          let { mime, path } = image
          if (mime.search(/mp4/) > -1) {
            log('read mp4')
            RNFS.readFile(path, 'base64')
              .then(base64 => {
                log(base64, 'base64')
                image.data = base64
                log(image, 'image 22222')
                window.tag.setTag(tagName, { image })
              })
              .catch(err => {
                log(err, 'err')
              })
          } else {
            window.tag.setTag(tagName, { image })
          }
        })
        break
      case 'h1':
      case 'h2':
      case 'c':
      case 'p':
      case 'ol':
      case 'ul':
      case 'hr':
      case 'a':
        window.tag.setTag(tagName)
        break
      default:
        alert()
    }
  }

  let flag =
    currentTag == tagName ? (
      <T.Float width="100%" height="100%" align="center">
        <T.Space
          size={rwd(20)}
          borderRadius={rwd(20)}
          backgroundColor="rgba(113,237,109,.39)"
        />
      </T.Float>
    ) : null
  return (
    <T.Center
      style={{ height: rwd(50) }}
      {...props}
      onPress={onPress}
      backgroundColor="transparent"
      // backgroundColor="yellow"
      borderWidth_={1}
      padding={SIZE.s}
    >
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
