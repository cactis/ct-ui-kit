import React, { PureComponent as Component } from 'react'
import { TouchableOpacity } from 'react-native'

import ReactNativeHaptic from 'react-native-haptic'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

window.beep = () => {
  if (__DEV__) alert('test beep')
  if (iOS) {
    ReactNativeHaptic.generate('notification')
  } else {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    }
    // let effect = [
    //   'selection',
    //   'impactLight',
    //   'impactMedium',
    //   'impactHeavy',
    //   'notificationSuccess',
    //   'notificationWarning',
    //   'notificationError',
    // ].sample()
    effect = 'notificationSuccess'
    ReactNativeHapticFeedback.trigger(effect, options)
    if (__DEV__) alert(effect)
  }
}

export class Touch extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   // _navigation = props.navigation
  // }
  _beep = beep => {
    log(beep, 'beep')
    // let { beep = false } = this.props
    if (beep) window.beep()
  }

  constructor(props) {
    super(props)
    this.id = randId()
    this.state = {}
  }
  onPress = () => {
    let { disabled = false, onPress, beep, ...props } = this.props
    this._beep(beep)
    // log(this, 'this')
    if (disabled) return
    // log(global.justRun, this.id, 'global.justRun, this.id')
    runLast(() => {
      global.justRun = null
    })
    if (global.justRun == this.id) {
      log(global.justRun, 'justRun')
      return
    }

    onPress && onPress()
    global.justRun = this.id
  }

  onLongPress = () => {
    log('onLongPress in Touch')
    this._beep(true)
    let { disabled = false, onLongPress } = this.props
    if (!disabled) onLongPress && onLongPress()
  }

  render() {
    let { disabled = false, ...props } = this.props
    // if (disabled) this.onPress = null
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        {...props}
      />
    )
  }
}
