import React from 'react'
import { StyleSheet } from 'react-native'

import { RNCamera, FaceDetector } from 'react-native-camera'
import ModalBox from 'react-native-modalbox'
import { NodeCameraView } from 'react-native-nodemediaclient'
import { NodePlayerView } from 'react-native-nodemediaclient'

let _navigation
export class LiveVideoRecorder extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data, recording = false } = this.state
    log(data, 'data in LiveVideoRecorder render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.ModalBox
        ref={c => (this.modal = c)}
        padding={SIZE.n}
        height={SCREEN_HEIGHT}
        style={{ height: SCREEN_HEIGHT }}
      >
        {/* <RNCamera
          height={SCREEN_HEIGHT}
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        /> */}
        <NodeCameraView
          style={{ height: SCREEN_HEIGHT }}
          ref={vb => {
            this.vb = vb
          }}
          outputUrl={'rtmp://dev.theampdr.com:1935/live/stream'}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />

        <T.Float
          width="100%"
          yAlign="center"
          bottom={SAFEAREA_BOTTOM + SIZE.l}
          // padding={SIZE.l}
        >
          <T.Icon
            name="camera"
            size={SIZE.l * 2}
            color={recording ? WARNING_COLOR : LIGHT_COLOR}
            backgroundColor="rgba(1,1,1,0.3)"
            onPress={this.onCameraPress}
          />
        </T.Float>
        <T.Float right={-0.5 * SIZE.l} padding={SIZE.l} top={SAFEAREA_TOP}>
          <T.Icon
            name="close"
            iconSet="AntDesign"
            backgroundColor="rgba(51,51,51,.61)"
            onPress={this.onClose}
            size={SIZE.l}
            color="white"
          />
        </T.Float>
      </T.ModalBox>
    )
  }
  onCameraPress = async () => {
    // alert(SIZE.l)
    let { recording } = this.state
    recording = !recording
    if (!recording) {
      this.setState({
        publishBtnTitle: 'Start Publish',
        isPublish: false,
        recording: false,
      })
      this.vb.stop()
    } else {
      this.setState({
        publishBtnTitle: 'Stop Publish',
        isPublish: true,
        recording: true,
      })
      this.vb.start()
    }
    // this.setState({ recording })
    // if (recording) {
    //   const { uri, codec = 'mp4' } = await this.camera.recordAsync()
    // } else {
    //   tgis.camera.stopRecording()
    // }
  }

  open = () => {
    this.modal.open()
  }
  onClose = () => {
    this.modal.close()
    let { recording } = this.state
    if (recording) {
      this.setState({ recording: false })
      this.vb?.stop()
    }
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
    _trace('LiveVideoRecorder')
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
    let { recording } = this.state
    if (recording) {
      this.setState({ recording: false })
      this.vb?.stop()
    }
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
