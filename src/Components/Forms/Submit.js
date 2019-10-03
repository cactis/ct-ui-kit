import React from 'react'
import { StyleSheet } from 'react-native'

let _this
export class Submit extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        _trace('Submit')
        _this = this
        this.autoRun()
    }

    render() {
        let { data } = this.state
        let backgroundColor = this.props.disabled
            ? 'rgb(210,210,210)'
            : SUBMIT_COLOR
        return (
            <T.Row margin={20} flex={0}>
                <T.Button
                    backgroundColor={backgroundColor}
                    // theme="H3"
                    {...this.props}
                    style={styles.submit}
                    // titleColor="white"
                />
            </T.Row>
        )
    }

    autoRun = () => {}
}
var styles = StyleSheet.create({
    submit: {
        borderRadius: 3,
        // color: 'white',
        // backgroundColor: 'rgb(99,209,231)',
        // fontWeight: '500',
    },
})
