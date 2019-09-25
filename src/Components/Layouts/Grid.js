import React, { Component } from 'react'
import { Touch, View } from '../'

export class Grid extends React.PureComponent {
    render() {
        let {
            layout = 'column',
            flow = layout,
            flex = 1,
            style,
            disabled = false,
            ...props
        } = this.props
        let _style = {
            flex: flex,
            flexDirection: flow,
            ...style,
        }
        let borderStyle =
            this.props.theme == 'bordered'
                ? {
                      padding: rwd(8),
                      borderWidth: 0.5,
                      borderColor: '#666',
                      borderRadius: rwd(3),
                  }
                : {}
        let _styleWithBordered = { ..._style, ...borderStyle }

        return !disabled && props.onPress ? (
            <Touch
                onPress={props.onPress}
                style={_styleWithBordered}
                {...props}
            >
                <View style={_style} {...props} />
            </Touch>
        ) : (
            <View style={_styleWithBordered} {...props} />
        )
    }

    // direction() {
    //   let debug = this.props._
    //   var row = true
    //   React.Children.forEach(this.props.children, function(child) {
    //     if (debug) {
    //       // console.log(child)
    //       // console.log(child?.type.name)
    //     }
    //     if (child?.type?.name?.includes('Col')) row = false
    //     if (child?.type?.name?.includes('Row')) row = true
    //   })
    //   return row ? 'column' : 'row'
    // }
}
