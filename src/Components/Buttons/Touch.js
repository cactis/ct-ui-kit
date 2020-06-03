import React, { PureComponent as Component } from 'react'
import { TouchableOpacity as RNTouch } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler' // TODO: 這裡 Android 有點選問題

// import { Vibration } from 'react-native'

import ReactNativeHaptic from 'react-native-haptic'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
// let Tag = iOS ? TouchableOpacity : RNTouch
let Tag = TouchableOpacity
window.beep = () => {
  // if (__DEV__) alert('beep')
  if (iOS) {
    ReactNativeHaptic.generate('notification')
  } else {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    }
    let effect = [
      'selection',
      'impactLight',
      'impactMedium',
      'impactHeavy',
      'notificationSuccess',
      'notificationWarning',
      'notificationError',
    ][0]
    ReactNativeHapticFeedback.trigger(effect, options)
    // _alert(effect)
  }
}
export class Touch extends Component {
  state = { disabled: false }
  _beep = (beep) => {
    // log(beep, 'beep')
    // let { beep = false } = this.props
    if (beep) window.beep()
  }

  onLongPress = () => {
    log('onLongPress in Touch')
    this._beep(true)
    let { disabled = false, onLongPress } = this.props
    log(onLongPress, 'onLongPress')
    log(!disabled, '!disabled')
    if (!disabled) onLongPress && onLongPress()
  }

  running = false
  onPress = () => {
    // runOnly(() => {
    let { disabled = false, onPress, beep } = this.props
    if (!disabled && !this.running) {
      onPress && onPress()
      this.running = true
      delayed(() => {
        this.running = false
      })
    }
    this._beep(beep)
    // }, 300)
  }

  render() {
    let {
      // disabled = false,
      onPress,
      onLongPress,
      children,
      ...props
    } = this.props

    let { disabled } = this.state

    return (
      <Tag
        activeOpacity={disabled || !onPress ? 1 : 0.8}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        {...props}
      >
        <T.View __color>{children}</T.View>
      </Tag>
    )
  }
  componentDidMount() {
    _trace()
    this.mounted = true
    this.setState({ disabled: this.props.disabled })
  }
  componentDidUpdate(prevProps) {
    // log(this.props.disabled, 'this.props.disabled')
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
    if (prevProps.disabled !== this.props.disabled)
      this.setState({ disabled: this.props.disabled })
  }
}

// import React, { PureComponent as Component } from 'react'
// import { TouchableOpacity } from 'react-native'
//
// import ReactNativeHaptic from 'react-native-haptic'
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
//
// window.beep = () => {
//   if (__DEV__) alert('test beep')
//   if (iOS) {
//     ReactNativeHaptic.generate('notification')
//   } else {
//     const options = {
//       enableVibrateFallback: true,
//       ignoreAndroidSystemSettings: false,
//     }
//     // let effect = [
//     //   'selection',
//     //   'impactLight',
//     //   'impactMedium',
//     //   'impactHeavy',
//     //   'notificationSuccess',
//     //   'notificationWarning',
//     //   'notificationError',
//     // ].sample()
//     effect = 'notificationSuccess'
//     ReactNativeHapticFeedback.trigger(effect, options)
//     if (__DEV__) alert(effect)
//   }
// }
//
// export class Touch extends Component {
//   // static getDerivedStateFromProps(props, state) {
//   //   // _navigation = props.navigation
//   // }
//   _beep = beep => {
//     // log(beep, 'beep')
//     // let { beep = false } = this.props
//     if (beep) window.beep()
//   }
//
//   constructor(props) {
//     super(props)
//     this.id = randId()
//     this.state = {}
//   }
//   onPress = () => {
//     let { disabled = false, onPress, beep, ...props } = this.props
//     this._beep(beep)
//     // log(this, 'this')
//     if (disabled) return
//     // log(global.justRun, this.id, 'global.justRun, this.id')
//     runLast(() => {
//       global.justRun = null
//     })
//     if (global.justRun == this.id) {
//       log(global.justRun, 'justRun')
//       return
//     }
//
//     onPress && onPress()
//     global.justRun = this.id
//   }
//
//   onLongPress = () => {
//     log('onLongPress in Touch')
//     this._beep(true)
//     let { disabled = false, onLongPress } = this.props
//     if (!disabled) onLongPress && onLongPress()
//   }
//
//   render() {
//     let { disabled = false, ...props } = this.props
//     // if (disabled) this.onPress = null
//     return (
//       <TouchableOpacity
//         activeOpacity={disabled ? 1 : 0.8}
//         onPress={this.onPress}
//         onLongPress={this.onLongPress}
//         {...props}
//       />
//     )
//   }
// }
