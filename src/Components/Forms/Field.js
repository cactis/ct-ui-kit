import React, { PureComponent as Component } from 'react'

import ReactNative, { StyleSheet } from 'react-native'

import * as Inputs from './Inputs'

let please_input = window.language == 'en' ? 'please enter ' : '請輸入'
export class Field extends Component {
  render() {
    let {
      title = '',
      placeholder = `${please_input}${title}`,
      // height = rwd(32),
      // backgroundColor = 'white',
      padding = rwd(5),
      theme = 'H6',
      type = 'TextInput',
      children,
      color = 'rgb(92,92,92)',
      height,
      preIcon,
      backgroundColor,
      fieldStyle,
      bordered,
      ...props
    } = this.props
    // let titleTag = title ? <GLabel color='#aaa'>{title}</GLabel> : null
    let borderStyle = bordered ? STYLES.bordered : {}
    let InputTag = Inputs[type]
    let heightStyle = title && height ? { height: height - rwd(60) } : {}
    let preIconTag = preIcon ? (
      <T.Col
        align="center"
        flex={0}
        // padding={rwd(5)}
        marginLeft={rwd(5)}
        // marginBottom={iOS ? rwd(5) : 0}
      >
        {preIcon}
      </T.Col>
    ) : null
    return (
      <T.Row
        // flex={0}
        // height={130}
        // borderWidth={1}
        marginTop={SIZE.s}
        __
        style={{
          // padding: padding,

          ...styles.field,
          ...fieldStyle,
          // backgroundColor: backgroundColor,
        }}
        backgroundColor={backgroundColor}
        // padding={backgroundColor ? SIZE.l * 1.2 : SIZE.n}
        padding={backgroundColor ? SIZE.m : SIZE.n}
        {...props}
        // onFocus={(event: Event) => {
        //   // if (!form) return
        //   // form._scrollToInput(ReactNative.findNodeHandle(event.target))
        // }}
        // height="auto"
      >
        {title ? (
          <T.Row flex={0}>
            <T.Text theme_={theme} style_={styles.label} color={color}>
              {title}
            </T.Text>
            {bordered ? <T.Space size={rwd(2)} /> : null}
          </T.Row>
        ) : null}
        <T.Row
          flow="row"
          // __
          // flex={0}
          // borderWidth={3}
          // __xAlign="center"
          padding={SIZE.n}
          paddingVertical={iOS ? SIZE.n : SIZE.t}
          paddingTop={iOS ? SIZE.t * 1 : SIZE.t * 2}
          paddingHorizontal={bordered ? (iOS ? SIZE.t * 1.5 : SIZE.t) : SIZE.n}
          // flex={0}
          // height="auto"
          // borderWidth={1}
          {...borderStyle}
        >
          <T.Center flex={0}>{preIconTag}</T.Center>
          <T.Col>
            <InputTag
              ref="input"
              // height={height}
              // backgroundColor={backgroundColor}
              // lineHeight={rwd(20)}
              {...heightStyle}
              // height={300}
              placeholder={true || iOS ? placeholder : null}
              bordered={bordered}
              {...props}
            />
            {children ? (
              <T.Div flex={0} paddingLeft_={rwd(10)}>
                {children}
              </T.Div>
            ) : null}
          </T.Col>
        </T.Row>
        {this.props.tip ? (
          <T.Div padding={SIZE.s}>
            <T.Text theme="H8" numberOfLines={0} text={`* ${this.props.tip}`} />
          </T.Div>
        ) : null}
        {/* <T.Space size={SIZE.s} /> */}
      </T.Row>
    )
  }
}

// import G from '../../config/g.js'
const styles = StyleSheet.create({
  field: {
    // borderWidth: 1
    // paddingVertical: rwd(10),
    // marginBottom: 0,
    // ...G.styles.shadow,
    // ...G.styles.card,
  },
  label: {
    // color: FCOLOR,
  },
})
