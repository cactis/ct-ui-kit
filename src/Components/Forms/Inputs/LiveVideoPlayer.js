import React from 'react'
import { StyleSheet } from 'react-native'

// import { RNCamera, FaceDetector } from 'react-native-camera'
import ModalBox from 'react-native-modalbox'
// import { NodeCameraView } from 'react-native-nodemediaclient'
import { NodePlayerView } from 'react-native-nodemediaclient'

let _navigation
export class LiveVideoPlayer extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data, url } = this.state
    // log(data,  'data in LiveVideoPlayer render()')
    // let { item = data } = data
    return (
      <T.ModalBox
        ref={(c) => (this.modal = c)}
        padding={SIZE.n}
        height={SCREEN_HEIGHT}
        style={{ height: SCREEN_HEIGHT }}
      >
        <NodePlayerView
          style={{ height: SCREEN_HEIGHT }}
          ref={(vp) => {
            this.vp = vp
          }}
          inputUrl={url}
          scaleMode={'ScaleAspectFit'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
          onStatus={this.onStatus}
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
  onStatus = (status) => {
    alert('status changed')
    log(status, 'status')
  }

  open = (url) => {
    if (url) {
      this.setState({ url })

      this.modal.open()
    } else {
      alert('No url for live streaming to play.')
    }
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

  initStateData = (onComplete) => {
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
    this.vp?.close()
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
