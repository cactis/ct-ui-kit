import React from 'react'
// import { StyleSheet } from 'react-native'

// import { AudioRecorder as Recorder, AudioUtils } from 'react-native-audio'

let _navigation

// import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
} from 'react-native'

import Sound from 'react-native-sound'
import { AudioRecorder, AudioUtils } from 'react-native-audio'

class AudioRecorder1 extends React.PureComponent {
  state = {
    uploadable: false,
    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
    hasPermission: undefined,
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    })
  }

  componentDidMount() {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      this.setState({ hasPermission: isAuthorised })

      if (!isAuthorised) return

      this.prepareRecordingPath(this.state.audioPath)

      AudioRecorder.onProgress = data => {
        this.setState({ currentTime: Math.floor(data.currentTime) })
      }

      AudioRecorder.onFinished = data => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(
            data.status === 'OK',
            data.audioFileURL,
            data.audioFileSize
          )
        }
      }
    })
  }

  _renderPauseButton(onPress, active) {
    var style = active ? styles.activeButtonText : styles.buttonText
    var title = this.state.paused ? 'RESUME' : 'PAUSE'
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>{title}</Text>
      </TouchableHighlight>
    )
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn("Can't pause, not recording!")

      return
    }

    try {
      const filePath = await AudioRecorder.pauseRecording()
      this.setState({ paused: true })
    } catch (error) {
      console.error(error)
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn("Can't resume, not paused!")
      return
    }

    try {
      await AudioRecorder.resumeRecording()
      this.setState({ paused: false })
    } catch (error) {
      console.error(error)
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!")
      return
    }

    this.setState({
      readyToPlay: true,
      stoppedRecording: true,
      recording: false,
      paused: false,
    })

    try {
      const filePath = await AudioRecorder.stopRecording()

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath)
      }
      return filePath
    } catch (error) {
      console.error(error)
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop()
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', error => {
        if (error) {
          console.log('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            this.setState({ playing: false, uploadable: true })
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!')

      return
    }

    if (!this.state.hasPermission) {
      console.warn("Can't record, no permission granted!")
      return
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath)
    }

    this.setState({ readyToPlay: false, recording: true, paused: false })

    try {
      const filePath = await AudioRecorder.startRecording()
    } catch (error) {
      console.error(error)
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({ finished: didSucceed })
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`
    )
  }

  _renderButton() {
    let { recording, playing, currentTime } = this.state
    // var style = active ? styles.activeButtonText : styles.buttonText
    let name, iconSet, title
    let color = BFCOLOR
    let size = SIZE.l * 3
    if (this.state.currentTime > 0) {
      if (recording) {
        title = 'STOP_RECORDING'
        color = STRONG_COLOR
      } else {
        title = 'PLAY'
        if (playing) {
          color = 'rgba(255,183,0,1)'
        }
      }
    } else {
      title = 'Record'
    }
    switch (title) {
      case 'STOP_RECORDING':
      case 'Record':
        name = 'microphone'
        iconSet = 'FontAwesome'
        break
      case 'PLAY':
        name = 'play'
        iconSet = 'AntDesign'
      case 'STOP':
        name = 'playcircleo'
        iconSet = 'AntDesign'
        break
      default:
    }
    size = SIZE.l * 3
    return (
      <T.Icon
        name={name}
        iconSet={iconSet}
        size={size}
        onPress={() => this.action()}
        color={color}
      />
    )
  }

  action = () => {
    let name, iconSet
    let { readyToPlay, playing, recording } = this.state
    if (readyToPlay) {
      if (playing) {
        // this._pause()
      } else {
        this._play()
        this.setState({ playing: true })
      }
    } else {
      if (recording) {
        this._stop()
      } else {
        this._record()
      }
    }
  }
  reset = () => {
    this.setState({ currentTime: 0, readyToPlay: false, uploadable: false })
  }
  uploadAudio = () => {
    let { data, options = {} } = this.props
    let { onCreated } = options
    let { item = data } = data
    let url = `${item.routes}/recordings/new`
    T.Api.get(url, {}, res => {
      let { data } = res
      log(data, 'data')
      data.mime = 'mp4'
      data.path = this.state.audioPath
      base64Image(data).then(data => {
        log(data, 'data')
        T.Api.post(data.routes, { resource: data }, res => {
          let { data } = res
          log(data, 'data')
          onCreated && onCreated(data)
        })
      })
    })
    // T.Api.post(url, {})
  }
  render() {
    let { currentTime, uploadable } = this.state
    return (
      <T.Row flex={0} width="100%">
        {/* <T.Float flex={0} right={0} top={0} padding={SIZE.m} yAlign="center">
          {this._renderButton('PLAY', () => {
            this._play()
          })}
        </T.Float> */}
        <T.Row flex={0} yAlign="center">
          {this._renderButton()}
          <T.Text color={BCOLOR}>{currentTime} s</T.Text>
          <T.Space />
          <T.Row
            flex={0}
            flow="row"
            xAlign="space-between"
            yAlign="center"
            width="100%"
            borderTopWidth={0.5}
            borderColor={BCOLOR}
            paddingTop={SIZE.s}
          >
            <T.IconLabel
              // text="RESET"
              size={SIZE.l}
              name="replay"
              // color={BFCOLOR}
              iconSet="MaterialCommunityIcons"
              onPress={this.reset}
            />
            <T.Icon
              size={SIZE.l * 2}
              name="clouduploado"
              iconSet="AntDesign"
              onPress={this.uploadAudio}
              // disabled={!uploadable}
            />
          </T.Row>
          {/* {this._renderButton('STOP', () => {
            this._stop()
          })} */}
          {/* {this._renderButton("PAUSE", () => {this._pause()} )} */}
          {/* {this._renderPauseButton(() => {
            this.state.paused ? this._resume() : this._pause()
          })} */}
        </T.Row>
      </T.Row>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b608a',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: '#fff',
  },
  button: {
    padding: 20,
  },
  disabledButtonText: {
    color: '#eee',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00',
  },
})

// export default AudioExample;

export class AudioRecorder2 extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in AudioRecorder render()')

    // if (!data) return null
    // let { item = data} = data
    return (
      <T.Div onPress={this.onPress}>
        <T.Icon
          size={SIZE.l * 2}
          backgroundColor={BCOLOR}
          name="microphone"
          onPress={this.onPress}
          onPress_={() =>
            window.confirm(
              () => {
                alert('recording')
              },
              { title: 'Overwite this reocrd?' }
            )
          }
        />
      </T.Div>
    )
  }
  onPress = () => {
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac'
    alert(audioPath)
    Recorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Height',
      AudioEncoding: 'aac',
    })

    // if (this.props.onPress) {
    //   this.props.onPress()
    // } else {
    //   log('need to set onPress on item')
    // }
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('AudioRecorder')
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

export { AudioRecorder1 as AudioRecorder }
