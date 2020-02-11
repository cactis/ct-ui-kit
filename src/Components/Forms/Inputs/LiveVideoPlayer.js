import React from 'react'
import { StyleSheet } from 'react-native'

// import { RNCamera, FaceDetector } from 'react-native-camera'
import ModalBox from 'react-native-modalbox'
import { NodeCameraView } from 'react-native-nodemediaclient'
import { NodePlayerView } from 'react-native-nodemediaclient'

let _navigation
export class LiveVideoPlayer extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data, recording = false } = this.state
    log(data, 'data in LiveVideoPlayer render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.ModalBox
        ref={c => (this.modal = c)}
        padding={SIZE.n}
        height={SCREEN_HEIGHT}
        style={{ height: SCREEN_HEIGHT }}
      >
        <NodePlayerView
          style={{ height: SCREEN_HEIGHT }}
          ref={vp => {
            this.vp = vp
          }}
          inputUrl={'rtmp://dev.theampdr.com:1935/live/stream'}
          scaleMode={'ScaleAspectFit'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
        />

        <T.Float right={-0.5 * SIZE.l} padding={SIZE.l} top={SAFEAREA_TOP}>
          <T.Icon
            name="close"
            iconSet="AntDesign"
            onPress={() => this.onClose()}
            size={SIZE.l}
            color="white"
            backgroundColor="rgba(51,51,51,.61)"
          />
        </T.Float>
      </T.ModalBox>
    )
  }

  open = () => {
    this.modal.open()
  }
  onClose = () => {
    this.modal.close()
    this.vp?.stop()
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('LiveVideoPlayer')
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
    this.vp?.close()
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
