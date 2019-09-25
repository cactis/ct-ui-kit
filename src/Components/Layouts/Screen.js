import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Scroll, Grid, SafeArea } from './'

let _navigation
export class Screen extends React.PureComponent {
    state = {
        data: null,
        mounted: false,
    }

    componentDidMount() {
        _trace('Screen')
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

    render() {
        let {
            padding = 10,
            safeAreaDisabled = false,
            scrollable = false,
        } = this.props
        const content = scrollable ? (
            <Scroll>
                <StatusBar
                    backgroundColor={STATUSBAR_COLOR}
                    barStyle="light-content"
                />
                <Grid padding={padding} {...this.props} />
            </Scroll>
        ) : (
            <>
                <StatusBar
                    backgroundColor={STATUSBAR_COLOR}
                    barStyle="light-content"
                />

                <Grid padding={padding} {...this.props} />
            </>
        )
        const body = safeAreaDisabled ? (
            content
        ) : (
            <SafeArea flex={1}>{content}</SafeArea>
        )
        return body
    }

    initStateData = onComplete => {
        let { data } = this.props
        this.mounted &&
            this.setState({ data }, () => {
                onComplete && onComplete()
            })
    }
    componentWillUnmount() {
        this.mounted = false
    }
    autoRun = () => {}
}
var styles = StyleSheet.create({})
