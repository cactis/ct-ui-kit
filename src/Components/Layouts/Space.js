import React from 'react'
import { FlatList, View as RNView } from 'react-native'
import { View } from './'
let THEME = {
    huge: rwd(50),
    large: rwd(30),
    medium: rwd(20),
    small: rwd(10),
    tiny: rwd(4),
}
export class Space extends React.Component {
    render() {
        let { theme, size = THEME[theme] || 4 } = this.props

        if (this.props.large) size = rwd(20)

        return <View padding={size} {...this.props} />
    }
}
