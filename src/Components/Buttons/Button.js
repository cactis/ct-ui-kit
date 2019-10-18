import React from 'react'
import { StyleSheet } from 'react-native'

import { Touch } from './'
import { View, Center } from '../Layouts'
import { Label } from '../Texts'
import { Icon } from '../Images'

export const Button1 = props => {
    let { color = 'white', backgroundColor = BUTTON_COLOR1, ...prop } = props
    return <Button color={color} backgroundColor={backgroundColor} {...prop} />
}

export class Button extends React.Component {
    render() {
        let {
            flex = 0,
            theme = 'normal',
            title = 'Button',
            style,
            color,
            titleColor = color,
            rightIcon,
            leftIcon,
            titleStyle,
            labelTheme = 'H5',
            onPress,
            fontSize = titleStyle?.fontSize || BASE_SIZE * 1.2,
            padding = fontSize * 0.5,
            // backgroundColor = disabled ? 'rgb(213,213,213)' : 'white',
            backgroundColor,
            ...props
        } = this.props
        // let borderColor = 'rgba(255,255,255,.4)'
        // let {
        //   borderColor = backgroundColor
        //     ? tinycolor(backgroundColor)
        //         .lighten()
        //         .toString()
        //     : 'white',
        // } = props
        let negtive = this.props.negtive ? styles.negtive : {}
        log(negtive, 'negtive')
        return (
            <Touch onPress={onPress}>
                <Center
                    flex={flex}
                    style={{
                        ...styles[theme],
                        ...negtive,
                        backgroundColor: backgroundColor,
                        // borderColor: borderColor,
                        flexDirection: 'row',
                        paddingHorizontal: padding * 2,
                        paddingVertical: padding,
                        // ...Styles.shadow,

                        ...style,
                    }}
                    {...props}
                >
                    {leftIcon}
                    <Label
                        theme={labelTheme}
                        style={{
                            // fontSize: fontSize,
                            ...styles[theme]['label'],
                            color: titleColor,
                            ...titleStyle,

                            // fontWeight: '400',
                            // fontFamily: 'Verdana',
                        }}
                        {...props}
                    >
                        {title}
                    </Label>
                    {rightIcon}
                </Center>
            </Touch>
        )
    }
}

const styles = {
    pill: {
        borderRadius: rwd(5),
        borderWidth: 0.5,
        borderColor: 'rgba(56,203,193,.66)',
        // padding: 6,
        lineHeight: 1.8,
        paddingHorizontal: 20,
        // backgroundColor: 'rgb(93,12,142)',
        // ...Styles.shadow,
        label: {},
    },
    normal: {
        borderRadius: 5,
        // lineHeight: 2.5,
        paddingHorizontal: rwd(10),
        paddingVertical: rwd(5),
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(29,29,29,.3)',
        label: {
            color: 'rgba(#666,.75)',
        },

        // backgroundColor: 'rgb(245,197,66)',
    },
    negtive: {
        backgroundColor: 'red',
    },
}
