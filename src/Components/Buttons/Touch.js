import React, { PureComponent as Component } from 'react'
import { TouchableOpacity } from 'react-native'

export class Touch extends Component {
  render() {
    let { disabled = false, onPress, ...props } = this.props
    if (disabled) onPress = null
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        onPress={onPress}
        {...props}
      />
    )
  }
}
