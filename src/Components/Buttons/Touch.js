import React, { PureComponent as Component } from 'react'
import { TouchableOpacity } from 'react-native'

export class Touch extends Component {
  onPress = () => {
    let { disabled = false, onPress, ...props } = this.props
    // log(this, 'this')
    if (disabled) return
    // log(global.justRun, this.id, 'global.justRun, this.id')
    if (global.justRun == this.id) {
      return
    }

    this.props.onPress()
    global.justRun = this.id
    delayed(() => {
      global.justRun = null
    })
  }

  componentWillMount() {
    this.id = randId()
  }

  render() {
    let { disabled = false, onPress, ...props } = this.props
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
