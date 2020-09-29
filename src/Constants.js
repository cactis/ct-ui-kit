log('!!! Constant.js#UIKIT')
import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import { StatusBar } from 'react-native'

import { Dimensions, Platform } from 'react-native'

require('./Libraries/Library.js')
window.TColor = require('tinycolor2')

window.SCREEN_WIDTH = Dimensions.get('window').width
window.SCREEN_HEIGHT = Dimensions.get('window').height

window.iOS = Platform.OS === 'ios'
window.isTablet = SCREEN_WIDTH > 500

// alert(SCREEN_WIDTH)

window.BASE_SIZE = rwd(iOS ? (isTablet ? 10 : 11) : 11)

window.IOS_FONTS = [
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
  'Chalkduster', //黑板字
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

window.ANDROID_FONTS = [
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

const b = BASE_SIZE
window.SIZE = {
  h3: rwd(38),
  h2: rwd(36),
  h1: rwd(34),
  h: rwd(b + 20),
  l3: rwd(b + 18),
  l2: rwd(b + 16),
  l1: rwd(b + 14),
  l: rwd(b + 12),
  m3: rwd(b + 10),
  m2: rwd(b + 8),
  m1: rwd(b + 6),
  m: rwd(b + 4),
  s3: rwd(b + 2),
  s2: rwd(b),
  s1: rwd(b - 2),
  s: rwd(b - 4),
  t1: rwd(b - 6),
  t: rwd(b - 8),
  n1: rwd(b - 10),
  n: rwd(0),
  // h: SCREEN_WIDTH * 0.06,
  // l: SCREEN_WIDTH * 0.05,
  // m: SCREEN_WIDTH * 0.04,
  // s: SCREEN_WIDTH * 0.03,
  // t: SCREEN_WIDTH * 0.02,
}

// OVERWRITE

window.ICON_SIZE = SIZE.m
window.ICON_SETS = {}
window.DEFAULT_ICON_SET = 'FontAwesome'
window.DEFAULT_ICON_NAME = 'angle-right'

window.BCOLOR = 'rgba(103,156,236,1)'
window.BCOLOR_DEV = 'rgb(108,108,108)'
window.FCOLOR = 'rgb(219,219,219)'
// window.ICON_COLOR = 'rgba(55,47,66,1)'
window.SUBMIT_COLOR = BCOLOR //'rgb(241,220,148)'
window.SUBMIT_BACKGROUND_COLOR = BCOLOR
window.STRONG_COLOR = 'rgba(133,15,15,1)'

window.SCREEN_BACKGROUNDCOLOR = BCOLOR
// window.BUTTON_COLOR = 'rgba(217,76,111,0.8)'
window.BUTTON_COLOR = 'rgba(29,220,238,1)'

window.BUTTON_COLOR1 = 'rgba(0,111,182,.87)'
window.BUTTON_RADIUS = SIZE.s

window.CHOOSEMENU_BACKGROUND = 'white'

window.LIGHT_COLOR = 'white'
window.DARK_COLOR = '#333'

window.TAG_BCOLOR = 'rgba(200,199,199,1)'
window.TAG_COLOR = '#333'
// alert(iPhoneX)
window.SAFEAREA_TOP = iPhoneX ? rwd(30) : 0
window.SAFEAREA_BOTTOM = iPhoneX ? rwd(15) : SIZE.s
// alert(iPhoneX)
window.SEGMENT_BGCOLOR = TColor(BCOLOR).darken()
window.SEGMENT_COLOR = '#333'
window.SEGMENT_ACTIVE_COLOR = '#333'
window.SEGMENT_ACTIVE_BGCOLOR = '#dedede'
window.SEGMENT_BORDER_COLOR = 'transparent'
window.DROPDOWNALERT_COLOR = 'rgb(49,176,103)'
window.DROPDOWNALERT_COLOR_INFO = 'rgb(49,176,103)'
window.WARNING_COLOR = '#b33939' //warning

window.BODY_COLOR = 'black'
window.SECONDARY_BODY_COLOR = '#8d8d8d'

window.NAV_COLOR = '#445265' // NavText
window.NavText = window.NAV_COLOR
window.BUTTON_BORDER_COLOR = 'rgb(182, 182, 182)'
//////////////////////////

window.CLOSE_ICON_NAME = 'close'
window.CLOSE_ICON_SET = 'AntDesign'
window.CLOSE_ICON_NAME = 'chevron-down'
window.CLOSE_ICON_SET = 'Entypo'

window.SEARCHBAR_BACKGROUND_COLOR = '#E4E8EB'
// window.SEARCHBAR_BACKGROUND_COLOR = 'red'
window.SEARCHBAR_PLACEHOLDER_COLOR = 'white'

require('../../../Constants.js')

setDeviceName = () => {
  D.getDeviceName().then((res) => {
    global.DeviceName = res
  })
}
setDeviceName()

initAppFontSize = async () => {
  try {
    const value = await AsyncStorage.getItem('appBaseSize')

    // console.log(value, 'value 11111111111')
    if (value) {
      value = parseInt(value)
      // console.log(value, 'value 2222')
      return value
    } else {
      return window.BASE_SIZE
    }
  } catch (error) {}
}
initAppFontSize().then((value) => {
  // window.BASE_SIZE = value
})

// let headerHeight = Platform.OS === 'ios' ? 44 : 46
let headerHeight = iOS ? BASE_SIZE * 3 : BASE_SIZE * 4
let footerHeight = BASE_SIZE * 6
let normalSize = BASE_SIZE * 3 + 3

// let BCOLOR = 'hsla(261,12%,31%,1)'
// let BCOLOR = 'rgb(168,105,231)'
// let BCOLOR = 'rgb(231,105,105)'
let mainColor = '#fff'
// let mainColor = LIGHT_COLOR
let padding = 8

// let statusBarHeight = iOS ? 20 : StatusBarManager.HEIGHT
// log(StatusBar, 'StatusBar')
let statusBarHeight = StatusBar.currentHeight
window.STATUSBAR_HEIGHT = statusBarHeight

window.CONTENT_HEIGHT = SCREEN_HEIGHT - headerHeight - rwd(100)
import D from 'react-native-device-info'
window.isSimulator = () => {
  return D.isEmulator()
}

window.pad = SCREEN_WIDTH > 800
export const size = {
  normalSize: normalSize,
  padding: padding,
  statusBarHeight: statusBarHeight,
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  viewHeight: SCREEN_HEIGHT - headerHeight,
  sideMenuWidth: (SCREEN_WIDTH / 3) * 2,
  viewPadding: rwd(15),
  defaultSpacer: rwd(15),
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
  helfScreenWidth: SCREEN_WIDTH / 2,
  // divider: {backgroundColor: colors.smoke},
  safeAreaPaddingTop: iPhoneX ? rwd(30) : 0,
  safeAreaPaddingBottom: iPhoneX ? rwd(15) : 0,
  baseImageStyle: { flex: 1, width: undefined, height: undefined },
}

export const color = {
  navigationColor: BCOLOR,
  titleColor: mainColor,
  tabColor: BCOLOR,
  tabActiveColor: '#21201F',
  tabInactiveColor: '#FFF',
  indicatorColor: 'rgb(255,255,255)',
}

export const Const = {
  color: color,
  size: size,
}

window.initConstant = () => {
  // alert(iPhoneX)
  window.SAFEAREA_TOP = iPhoneX ? rwd(30) : 0
  window.SAFEAREA_BOTTOM = iPhoneX ? rwd(15) : SIZE.t
  // log(StatusBar, 'StatusBar')
  window.STATUSBAR_HEIGHT = 0
  // alert(STATUSBAR_HEIGHT)
  // window.iPhoneX =
  //   iOS &&
  //   (DEVICE_INFO.Model?.indexOf('iPhone X') == 0 ||
  //     DEVICE_INFO.Model?.indexOf('iPhone 11') == 0)
  // window.SAFEAREA_TOP = iPhoneX ? rwd(30) : 0
  // window.SAFEAREA_BOTTOM = iPhoneX ? rwd(15) : SIZE.t
  //
  // window.SEGMENT_BGCOLOR = TColor(BCOLOR).darken()
  // window.SEGMENT_COLOR = LIGHT_COLOR
  // window.SEGMENT_ACTIVE_COLOR = LIGHT_COLOR
  // window.SEGMENT_ACTIVE_BGCOLOR = TColor(BCOLOR)
  // window.SEGMENT_BORDER_COLOR = 'transparent'
  // window.DROPDOWNALERT_COLOR = 'rgb(49,176,103)'
  // window.WARNING_COLOR = 'rgba(208,35,35,1)'
}
// setDeviceInfo() run in SplashScreen
// initConstant() run in SplashScreen

// window.iPhoneX =
//   iOS &&
//   (DEVICE_INFO.Model?.indexOf('iPhone X') == 0 ||
//     DEVICE_INFO.Model?.indexOf('iPhone 11') == 0)

window.SAFEAREA_TOP = iPhoneX ? rwd(30) : 0
window.SAFEAREA_BOTTOM = iPhoneX ? rwd(15) : SIZE.t

window.language = 'zh-tw'

window.timeZoneOffset = () => {
  let date = new Date()
  let hour = date.getTimezoneOffset() / 60
  // alert(hour)
  return hour
}

window.STYLES = {
  bordered: {
    padding: SIZE.s,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#a8a8a8',
    borderRadius: SIZE.t,
    // borderWidth: 5,
    // borderColor: '#222',
  },
}
