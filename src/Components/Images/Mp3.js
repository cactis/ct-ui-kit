import React from 'react'
import { StyleSheet } from 'react-native'
// import Sound from 'react-native-sound'
import SoundPlayer from 'react-native-sound-player'

let _navigation
export class Mp3 extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in Mp3 render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.Div flex={0} onPress={this.onPress} borderWidth_={1}>
        <T.Icon name="playcircleo" iconSet="AntDesign" onPress={this.onPress} />
      </T.Div>
    )
  }
  onPress = () => {
    let { data } = this.state
    let { item = data } = data
    // alert(item.url)
    try {
      log(item.url, 'item.url to play')
      SoundPlayer.playUrl(item.url)
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
    // return
    // setTimeout(() => {
    //   var sound = new Sound(item.url, '', error => {
    //     if (error) {
    //       console.log('failed to load the sound', error)
    //     }
    //   })
    //
    //   setTimeout(() => {
    //     sound.play(success => {
    //       if (success) {
    //         this.setState({ playing: false })
    //         console.log('successfully finished playing')
    //       } else {
    //         console.log('playback failed due to audio decoding errors')
    //       }
    //     })
    //   }, 100)
    // }, 100)
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
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

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
