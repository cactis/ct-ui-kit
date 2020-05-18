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
      fieldStyle,
      ...props
    } = this.props
    // let titleTag = title ? <GLabel color='#aaa'>{title}</GLabel> : null
    let borderStyle = this.props.bordered
      ? {
          padding: rwd(8),
          borderWidth: 0.5,
          borderColor: '#666',
          borderRadius: rwd(3),
        }
      : {}
    let InputTag = Inputs[type]
    let heightStyle = title && height ? { height: height - rwd(60) } : {}
    let preIconTag = preIcon ? (
      <T.Col
        align="center"
        flex={0}
        padding={rwd(5)}
        marginLeft={rwd(5)}
        // marginBottom={iOS ? rwd(5) : 0}
      >
        {preIcon}
      </T.Col>
    ) : null
    return (
      <T.Row
        flex={0}
        style={{
          padding: padding,
          ...styles.field,
          ...fieldStyle,
          // backgroundColor: backgroundColor,
        }}
        {...props}
        onFocus={(event: Event) => {
          // if (!form) return
          // form._scrollToInput(ReactNative.findNodeHandle(event.target))
        }}
      >
        {title ? (
          <T.Row flex={0}>
            <T.Text theme_={theme} style_={styles.label} color={color}>
              {title}
            </T.Text>
            <T.Space size={rwd(2)} />
          </T.Row>
        ) : null}
        <T.Row
          flow="row"
          // __xAlign="center"
          padding={rwd(1)}
          flex={0}
          {...borderStyle}
        >
          <T.Center flex={0}>{preIconTag}</T.Center>

          <InputTag
            ref="input"
            // height={height}
            // backgroundColor={backgroundColor}
            // lineHeight={rwd(20)}
            {...heightStyle}
            placeholder={true || iOS ? placeholder : null}
            {...props}
          />
          {children ? (
            <T.Div flex={0} paddingLeft={rwd(10)}>
              {children}
            </T.Div>
          ) : null}
        </T.Row>
        {this.props.tip ? (
          <T.Div padding={rwd(8)}>
            <T.Text theme="H8" numberOfLines={0} text={`* ${this.props.tip}`} />
          </T.Div>
        ) : null}
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
