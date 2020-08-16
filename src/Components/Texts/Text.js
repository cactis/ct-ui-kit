log('!!! Text.js#UIKit')
import React from 'react'
import { Text as RNText, Platform } from 'react-native'
// import Constants from '../../Constants.js'
import faker from '../../lib/faker.min.js'
window.faker = faker

export { RNText }

export class Text extends React.Component {
  render() {
    let {
      style,
      theme = 'H6',
      align = 'left',
      size,
      font,
      fontTheme,
      color,
      selectable = true,
      numberOfLines = 2,
      title = Dev.seeds ? faker.lorem.sentence : null,
      text = title,
      label,
      backgroundColor,
      children = text || label, //|| (__DEV__ ? faker.commerce.productName() : ''),
      ...props
    } = this.props
    let customFont = fontTheme
      ? { fontFamily: FontTheme[fontTheme] }
      : font
      ? { fontFamily: font }
      : {}
    // log(theme, 'theme')
    theme = _.upperCase(theme).replace(' ', '')
    // log(theme, 'theme in Text')
    let themeStyle = { ...styles[theme] } //!!!
    color && themeStyle && (themeStyle.color = color)
    size && themeStyle && (themeStyle.fontSize = size)
    let lineHeightStyle = { lineHeight: themeStyle.fontSize * 1.6 }
    // numberOfLines && numberOfLines != 1
    //   ? { lineHeight: themeStyle.fontSize * 1.2 }
    //   : {}

    let tag = !children ? null : (
      <RNText
        // flex={1}
        numberOfLines={numberOfLines}
        allowFontScaling={true}
        // selectable={selectable} !!!!!!!!!! 會導致 母層的 onPress 失效
        onPress={this.onPress}
        onResponderGrant={this.onResponderGrant}
        suppressHighlighting={true}
        onResponderRelease={this.onResponderRelease}
        style={{
          // alignSelf: 'flex-start',
          textAlign: align,
          ...lineHeightStyle,
          textAlignVertical: 'bottom',
          // borderWidth: 1,

          ...textShadow,
          ...{ ...themeStyle, ...customFont },
          ...style,
        }}
        {...props}
      >
        {children}
      </RNText>
    )
    // return <RNText>{children}</RNText>
    return backgroundColor ? (
      <T.Div
        borderWidth={1}
        borderColor={color}
        borderRadius={3}
        borderStyle="dashed"
        backgroundColor={backgroundColor}
        paddingHorizontal={SIZE.s}
        paddingVertical={SIZE.t}
        align="center"
        // backgroundColor="red"
      >
        {tag}
      </T.Div>
    ) : (
      tag
    )
  }

  onResponderGrant = (e) => {
    // log(e, 'e#onResponderGrant')
    // log(e.nativeEvent, 'e.nativeEvent#onResponderGrant')
  }

  onResponderRelease = (e) => {
    // log(e, 'e#onResponderRelease')
    // log(e.nativeEvent, 'e.nativeEvent#onResponderRelease')
  }

  onPress = (e) => {
    // log(e, 'e')
    // log(e.nativeEvent, 'e.nativeEvent#')
    // log(
    //   e._dispatchInstances.memoizedProps,
    //   'e._dispatchInstances.memoizedProps#'
    // )
  }
}

// const BASE_SIZE = BASE_SIZE //iOS ? (isTablet ? 10 : 8) : 9

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: { width: -0.2, height: 0.2 },
  textShadowRadius: 0.1,
}

// const HEADER_FONT = iOS ? ['Avenir', 'Helvetica'][0] : ['Noto_Serif_Bold'][0]

const FontTheme = {
  hand: iOS ? 'Papyrus' : 'cursive',
  hand: iOS ? 'BradleyHandITCTT-Bold' : 'cursive',
}

const HEADER_FONT = iOS
  ? ['Avenir-Light', 'Avenir-Roman', 'Verdana', 'Avenir', 'Helvetica'][3]
  : ['Noto_Serif_Bold'][0]

const BODY_FONT = iOS
  ? ['Avenir-Light', 'Avenir-Roman', 'Verdana', 'Avenir', 'Helvetica'][0]
  : ['Noto_Serif_Bold'][0]

const STRONG_FONT = iOS ? ['Georgia', 'Helvetica'][0] : ['Noto_Serif_Bold'][0]
const HAND_FONT = iOS ? ['Verdana', 'Helvetica'][0] : ['Noto_Serif_Bold'][0]

fSize = BASE_SIZE + 3
const styles = {
  H0: {
    fontSize: fSize + 8,
    fontFamily: HEADER_FONT,
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,.93)',
  },
  H10: {
    fontSize: fSize + 8,
    fontFamily: HEADER_FONT,
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,.93)',
  },
  H1: {
    fontSize: fSize + 11,
    fontFamily: HEADER_FONT,
    fontWeight: '700',
    color: 'rgba(0,0,0,.93)',
  },
  H2: {
    fontSize: fSize + 8,
    fontFamily: HEADER_FONT,
    fontWeight: '700',
    color: 'rgba(0,0,0,1)',
  },
  H3: {
    fontFamily: HEADER_FONT,
    fontSize: fSize + 6,
    fontWeight: '600',
    color: 'rgba(0,0,0,.95)',
  },
  H4: {
    fontFamily: HEADER_FONT,
    fontSize: fSize + 5,
    fontWeight: '500',
    color: 'rgba(0,0,0,.90)',
  },
  H5: {
    fontFamily: BODY_FONT,
    fontSize: fSize + 4,
    fontWeight: '400',
    color: 'rgba(0,0,0,.85)',
  },
  P: {
    fontFamily: BODY_FONT,
    // fontFamily: iOS ? 'GillSans' : 'sourcesanspro_regular',
    fontSize: fSize + (iOS ? 3 : 2),
    fontWeight: iOS ? '300' : '200',
    color: 'rgba(0,0,0,.8)',
  },
  C: {
    // caption
    // fontFamily: BODY_FONT,
    // fontFamily: iOS ? 'GillSans' : 'Carrois Gothic SC',
    // fontFamily: iOS ? 'GillSans' : 'sourcesanspro_regular',
    // fontFamily: iOS ? 'GillSans' : 'Carrois Gothic SC',
    fontSize: fSize + (iOS ? 1.5 : 1.5),
    fontWeight: iOS ? '200' : '200',
    // fontStyle: 'italic',
    color: 'rgba(0,0,0,.8)',
  },
  H6: {
    fontFamily: BODY_FONT,
    // fontFamily: iOS ? 'GillSans' : 'sourcesanspro_regular',
    fontSize: fSize + (iOS ? 2 : 2),
    fontWeight: iOS ? '300' : '200',
    color: window.BODY_COLOR,
  },
  H7: {
    fontSize: fSize + (iOS ? 1 : 1),
    fontWeight: iOS ? '400' : '200',
    color: 'rgba(0,0,0,.70)',
  },
  H8: {
    fontSize: fSize + 0,
    fontWeight: '400',
    color: 'rgba(0,0,0,.60)',
  },
  H9: {
    fontSize: fSize,
    fontWeight: '400',
    color: 'rgba(0,0,0,.50)',
  },
}

export const FontList = Platform.select({
  ios: IOS_FONTS,
  // ['Palatino-Bold', 'GillSans-Bold', 'AmericanTypewriter-CondensedBold', 'KohinoorBangla-Semibold', 'Didot', 'Georgia', 'HelveticaNeue', 'Kailasa', 'Zapfino', 'GillSans']
  // color: 'red'
  // android: ANDROID_FONTS
  android: ['Roboto', 'Serif Regular', 'Pacifico', 'monospace', , 'Noto Sans'],
})

export const TextStyles = styles
