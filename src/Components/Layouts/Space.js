import React from 'react'
import { FlatList, View as RNView } from 'react-native'
import { View } from './'
export class Space extends React.Component {
  render() {
    let { size = 4, theme = 'tiny' } = this.props

    if (this.props.large) size = rwd(20)
    let THEME = {
      large: rwd(30),
      medium: rwd(20),
      small: rwd(10),
      tiny: rwd(4),
    }
    return <View padding={size || THEME[theme]} {...this.props} />
  }
}
