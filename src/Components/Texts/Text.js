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
    let lineHeightStyle =
      numberOfLines && numberOfLines != 1
        ? { lineHeight: themeStyle.fontSize * 1.5 }
        : {}

    return !children ? (
      <T.View />
    ) : (
      <RNText
        // flex={1}
        numberOfLines={numberOfLines}
        allowFontScaling={true}
        selectable={selectable}
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
  }
}

const baseSize = BASE_SIZE //iOS ? (isTablet ? 10 : 8) : 9

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

const styles = {
  H0: {
    fontSize: baseSize + 8,
    fontFamily: HEADER_FONT,
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,.93)',
  },
  H10: {
    fontSize: baseSize + 8,
    fontFamily: HEADER_FONT,
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,.93)',
  },
  H1: {
    fontSize: baseSize + 11,
    fontFamily: HEADER_FONT,
    fontWeight: '700',
    color: 'rgba(0,0,0,.93)',
  },
  H2: {
    fontSize: baseSize + 8,
    fontFamily: HEADER_FONT,
    fontWeight: '700',
    color: 'rgba(0,0,0,1)',
  },
  H3: {
    fontFamily: HEADER_FONT,
    fontSize: baseSize + 6,
    fontWeight: '600',
    color: 'rgba(0,0,0,.95)',
  },
  H4: {
    fontFamily: HEADER_FONT,
    fontSize: baseSize + 5,
    fontWeight: '500',
    color: 'rgba(0,0,0,.90)',
  },
  H5: {
    fontFamily: BODY_FONT,
    fontSize: baseSize + 4,
    fontWeight: '400',
    color: 'rgba(0,0,0,.85)',
  },
  P: {
    fontFamily: BODY_FONT,
    // fontFamily: iOS ? 'GillSans' : 'sourcesanspro_regular',
    fontSize: baseSize + (iOS ? 2 : 2),
    fontWeight: iOS ? '300' : '200',
    color: 'rgba(0,0,0,.8)',
  },
  H6: {
    fontFamily: BODY_FONT,
    // fontFamily: iOS ? 'GillSans' : 'sourcesanspro_regular',
    fontSize: baseSize + (iOS ? 2 : 2),
    fontWeight: iOS ? '300' : '200',
    color: 'rgba(0,0,0,.8)',
  },
  H7: {
    fontSize: baseSize + (iOS ? 1 : 1),
    fontWeight: iOS ? '400' : '200',
    color: 'rgba(0,0,0,.70)',
  },
  H8: {
    fontSize: baseSize + 0,
    fontWeight: '400',
    color: 'rgba(0,0,0,.60)',
  },
  H9: {
    fontSize: baseSize,
    fontWeight: '400',
    color: 'rgba(0,0,0,.50)',
  },
}

const IOS_FONTS = [
  'AcademyEngravedLetPlain',
  'AlNile',
  'AmericanTypewriter',
  'Arial',
  'Avenir-Book',
  'AvenirNext-Regular',
  'AvenirNextCondensed-Regular',
  'Baskerville',
  'BradleyHandITCTT-Bold',
  'ChalkboardSE-Regular',
  'Chalkduster',
  'Cochin',
  'Copperplate',
  'Courier',
  'DINAlternate-Bold',
  'DINCondensed-Bold',
  'Damascus',
  'DevanagariSangamMN',
  'Didot',
  'DiwanMishafi',
  'EuphemiaUCAS',
  'Farah',
  'Futura-Bold',
  'GeezaPro',
  'Georgia',
  'GillSans',
  'GujaratiSangamMN',
  'GurmukhiMN',
  'Helvetica',
  'HoeflerText-Regular',
  'Kailasa',
  'KannadaSangamMN',
  'Kefa-Regular',
  'KhmerSangamMN',
  'KohinoorTelugu-Regular',
  'LaoSangamMN',
  'MalayalamSangamMN',
  'MarkerFelt-Thin',
  'MarkerFelt-Wide',
  'Menlo-Regular',
  'MyanmarSangamMN',
  'Noteworthy-Light',
  'NotoNastaliqUrdu',
  'Optima-Regular',
  'OriyaSangamMN',
  'Palatino-Bold',
  'Palatino-Roman',
  'Papyrus',
  'PartyLetPlain',
  'PingFangHK-Regular',
  'Rockwell-Regular',
  'SavoyeLetPlain',
  'SinhalaSangamMN',
  'SnellRoundhand',
  'TamilSangamMN',
  'Thonburi',
  'TimesNewRomanPSMT',
  'TrebuchetMS',
  'Verdana',
  'ZapfDingbatsITC',
  'Zapfino',
]

const ANDROID_FONTS = [
  'Roboto Thin',
  'Roboto Light',
  'Roboto Regular',
  'Roboto Bold',
  'Roboto Medium',
  'Roboto Black',
  'Roboto Condensed Light',
  'Roboto Condensed Regular',
  'Roboto Condensed Medium',
  'Roboto Condensed Bold',
  'Noto Serif',
  'Noto Serif Bold',
  'Droid Sans Mono',
  'Cutive Mono',
  'Coming Soon',
  'Dancing Script',
  'Dancing Script Bold',
  'Carrois Gothic SC',
]

export const FontList = Platform.select({
  ios: IOS_FONTS,
  // ['Palatino-Bold', 'GillSans-Bold', 'AmericanTypewriter-CondensedBold', 'KohinoorBangla-Semibold', 'Didot', 'Georgia', 'HelveticaNeue', 'Kailasa', 'Zapfino', 'GillSans']
  // color: 'red'
  // android: ANDROID_FONTS
  android: ['Roboto', 'Serif Regular', 'Pacifico', 'monospace', , 'Noto Sans'],
})

export const TextStyles = styles
