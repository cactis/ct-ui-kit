import React from 'react'
import { StyleSheet } from 'react-native'

// import { RNCamera, FaceDetector } from 'react-native-camera'
import ModalBox from 'react-native-modalbox'
import { NodeCameraView } from 'react-native-nodemediaclient'
import { NodePlayerView } from 'react-native-nodemediaclient'

let _navigation
export class LiveVideoRecorder extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { outputUrl, data, recording = false, appName, streamName } = this.state
    log(data, 'data in LiveVideoRecorder render()')
    log(outputUrl, 'outputUrl')
    // if (!data) return null
    return (
      <T.ModalBox
        ref={c => (this.modal = c)}
        padding={SIZE.l}
        height={SCREEN_HEIGHT}
        style={{ height: SCREEN_HEIGHT }}
        swipeToClose={false}
      >
        <NodeCameraView
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            padding: SIZE.l,
            // borderWidth: 10,
            // borderColor: 'rgba(25,143,182,1)',
          }}
          ref={vb => {
            this.vb = vb
          }}
          outputUrl={outputUrl}
          camera={{ cameraId: 1, cameraFrontMirror: iOS }}
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
            backgroundColor={BCOLOR}
            onPress={this.onCameraPress}
          />
        </T.Float>
        <T.Float
          right={-0.5 * SIZE.l}
          padding={SIZE.l}
          bottom={SAFEAREA_BOTTOM + SIZE.l}
        >
          <T.Icon
            name="camera-retake-outline"
            iconSet="MaterialCommunityIcons"
            backgroundColor="rgba(0,0,0,.23)"
            onPress={this.toggleCamera}
            size={SIZE.l}
            color="white"
          />
        </T.Float>
        <T.Float
          right={-0.5 * SIZE.l}
          width="100%"
          padding={SIZE.l}
          top={SAFEAREA_TOP}
          flow="row"
          xAlign="space-between"
          yAlign="center"
        >
          {data ? (
            <T.Share
              title="title"
              color={LIGHT_COLOR}
              message={`url: ${data?.url} live: ${data?.live}`}
              options={{ subject: 'subject' }}
            />
          ) : (
            <T.Space />
          )}

          <T.Icon
            name="closecircleo"
            iconSet="AntDesign"
            // backgroundColor="rgba(255,255,255,.3)"
            // borderColor={STRONG_COLOR}
            // borderWidth={0.5}
            onPress={this.onClose}
            size={SIZE.l}
            // color="white"
            color={LIGHT_COLOR}
          />
        </T.Float>
      </T.ModalBox>
    )
  }

  toggleCamera = () => {
    this.vb.switchCamera()
    this.vb.startPreview()
  }
  onCameraPress = async () => {
    // alert(SIZE.l)

    // this.setState({ data, outputUrl })
    // let { data } = this.state
    let { recording, appName, streamName } = this.state
    recording = !recording
    if (!recording) {
      this.setState({
        recording: false,
      })
      this.vb.stop()
    } else {
      this.vb.start()
      this.setState({ recording: true })
    }
    // this.setState({ recording })
    // if (recording) {
    //   const { uri, codec = 'mp4' } = await this.camera.recordAsync()
    // } else {
    //   tgis.camera.stopRecording()
    // }
  }

  open = (options = {}) => {
    // alert(options.appName)
    log(options, 'options')
    let { appName = 'app', streamName = 'stream', data } = options
    let { item = data } = data
    this.setState({ appName, streamName })
    // T.Api.get('/streamings/new', {}, res => {
    //   let { data } = res
    //   T.Api.post(data.routes, { resource: data }, res => {})
    let outputUrl = `rtmp://${
      AppConfig.domain
    }:1935/${appName}/${streamName}?filename=${item.filename}`
    log(outputUrl, 'outputUrl')
    this.setState(
      {
        data,
        outputUrl,
      },
      () => {
        this.modal.open()
      }
    )
    // })
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
