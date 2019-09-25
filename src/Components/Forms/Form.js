import React, { PureComponent as Component } from 'react'

import { Keyboard, KeyboardAvoidingView } from 'react-native'

export class Form extends Component {
    constructor(props) {
        super(props)
        window.form = this
    }

    _scrollToInput(reactNode: any) {
        this.scroll?.scrollToFocusedInput(reactNode, 120)
    }

    render() {
        let {
            scrollable = true,
            backgroundColor = 'white',
            padding = 0,
            children = (
                <T.Div>
                    <T.Field />
                    <T.Field />
                    <T.Submit />
                </T.Div>
            ),
            ...props
        } = this.props
        return scrollable ? (
            <KeyboardAvoidingView
                // flex={1}
                enableOnAndroid={true}
                backgroundColor={backgroundColor}
                ref={ref => (this.scroll = ref)}
                {...this.props}
            >
                <T.Grid
                    padding={padding}
                    onPress={Keyboard.dismiss}
                    {...props}
                    flex={0}
                >
                    {children}
                </T.Grid>
            </KeyboardAvoidingView>
        ) : (
            <T.Grid flex={0} padding={padding} {...props}>
                {children}
            </T.Grid>
        )
    }
}
