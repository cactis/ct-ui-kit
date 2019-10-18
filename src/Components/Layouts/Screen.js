import React from 'react'
import { Scroll, Grid, SafeArea } from './'

export class Screen extends React.Component {
    render() {
        let {
            padding = 10,
            safeAreaDisabled = false,
            scrollable = false,
        } = this.props
        const content = scrollable ? (
            <Scroll>
                <Grid padding={padding} {...this.props} />
            </Scroll>
        ) : (
            <Grid padding={padding} {...this.props} />
        )
        const body = safeAreaDisabled ? (
            content
        ) : (
            <SafeArea flex={1}>{content}</SafeArea>
        )
        return body
    }
}
