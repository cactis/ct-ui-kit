import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Title extends React.PureComponent {
    state = {
        data: null,
        mounted: false,
    }

    componentDidMount() {
        _trace('Title')
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
        let { data } = this.state
        log(data, 'data in Title render()')
        // if (!data) return null
        // let { item = data } = data
        return (
            <T.Div>
                <T.Text theme="H3" {...this.props} />
                <T.Space />
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
