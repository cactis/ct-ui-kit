import React, { PureComponent as Component } from 'react'
import { TouchableOpacity } from 'react-native'

export class Touch extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   // _navigation = props.navigation
  // }

  constructor(props) {
    super(props)
    this.id = randId()
    this.state = {}
  }
  onPress = () => {
    let { disabled = false, onPress, ...props } = this.props
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

  render() {
    let { disabled = false, ...props } = this.props
    // if (disabled) this.onPress = null
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        onPress={this.onPress}
        {...props}
      />
    )
  }
}
