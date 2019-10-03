import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import ModalBox from 'react-native-modalbox'

let _navigation
export class Modal extends React.PureComponent {
    state = {
        data: null,
        content: null,
        // title: null,
        options: {},
        _options: {
            swipeToClose: true,
            height: SCREEN_HEIGHT * (iOS ? 0.6 : 0.8),
            direction: 'bottom',
            title: null,
        },
    }

    componentDidMount() {
        this.mounted = true
        _trace('Modal')
        _navigation = this.props.navigation
        this.initStateData(() => {
            this.autoRun()
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.navigation !== this.props.navigation)
            _navigation = this.props.navigation
    }

    open = (content, options = {}) => {
        log(options, 'options')
        this.mounted &&
            this.setState({
                content,
                options: {
                    ...{ title: null, ...this.state._options, ...options },
                },
            })
        log(this.state, 'this.state')
        this.modal.open()
    }

    close = () => {
        this.modal.close()
    }

    render() {
        let { content, options } = this.state
        let { children = content, title: propTitle, height } = this.props
        let {
            height: modalHeight = height,
            backgroundColor = 'rgba(255,255,255,.98)',

            direction = 'bottom',
            scrollable = false,
            swipeToClose,
            title = propTitle,
            quoteable,
            fullScreen,
            paddable = true,
            ...opts
        } = options
        if (scrollable || fullScreen) swipeToClose = false
        modalHeight = fullScreen ? SCREEN_HEIGHT : modalHeight
        let padding = paddable ? rwd(15) : 0
        return (
            <ModalBox
                ref={c => (this.modal = c)}
                swipeToClose={swipeToClose}
                position={direction}
                entry={direction}
                keyboardTopOffset={0}
                onClosed={() => this.setState({ myTitle: null })}
                // coverScreen={true}
                style={{
                    height: modalHeight,
                    zIndex: 10000,
                    borderRadius: fullScreen ? 0 : rwd(20),
                    backgroundColor: backgroundColor,
                }}
                {...opts}
                {...this.props}
            >
                <T.Space size={fullScreen ? SAFEAREA_TOP / 2 : 0} />
                <T.Row flex={0} padding={rwd(15)} flow="row" xAlign="center">
                    <T.Col borderWidth={0} xAlign="center">
                        {title && (
                            <T.Label
                                theme="H0"
                                marginTop={0}
                                numberOfLines={0}
                                marginBottom={0}
                                text={title}
                            />
                        )}
                    </T.Col>
                    <T.Col borderWidth={0} flex={0} align="center">
                        <T.Icon
                            onPress={this.modal?.close}
                            name="close"
                            size={rwd(18)}
                            iconSet="AntDesign"
                            color="rgb(131,131,131)"
                        />
                    </T.Col>
                </T.Row>
                {scrollable ? (
                    <T.List
                        quoteable={quoteable}
                        ListHeaderComponent={children}
                        contentContainerStyle={{ padding: rwd(10) }}
                    />
                ) : (
                    <T.Screen padding={padding}>{children}</T.Screen>
                )}
                <T.Space size={fullScreen ? SAFEAREA_BOTTOM : 0} />
            </ModalBox>
        )
    }

    initStateData = onComplete => {
        let { data } = this.props
        this.mounted &&
            this.setState({ data }, () => {
                onComplete && onComplete()
            })
    }

    autoRun = () => {}

    componentWillUnmount() {
        this.mounted = false
    }
}
var styles = StyleSheet.create({})
