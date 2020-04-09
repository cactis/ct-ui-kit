import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Block extends React.PureComponent {
    state = {
        data: null,
        mounted: false,
    }

    componentDidMount() {
        _trace()
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
        return (
            <T.Div marginBottom={rwd(20)}>
                <T.Div padding={rwd(10)}>{this.props.children}</T.Div>
                <T.BarLine />
            </T.Div>
        )
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
