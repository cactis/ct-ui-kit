log('Constant.js')

setDeviceName = () => {
  D.getDeviceName().then(res => {
    global.DeviceName = res
  })
}
setDeviceName()

// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { StatusBar } from 'react-native'

import { Dimensions, Platform } from 'react-native'
// const { StatusBarManager } = NativeModules

// OVERWRITE
window.BCOLOR = 'rgb(59,9,66)'
window.FCOLOR = 'rgb(219,219,219)'
window.ICON_COLOR = 'rgba(55,47,66,1)'
window.SUBMIT_COLOR = 'rgb(241,220,148)'

window.iOS = Platform.OS === 'ios'
window.isTablet = screenWidth > 500

window.SCREEN_WIDTH = Dimensions.get('window').width
window.SCREEN_HEIGHT = Dimensions.get('window').height
window.SCREEN_HEIGHT = !iOS
  ? Dimensions.get('window').height - StatusBar.currentHeight
  : Dimensions.get('window').height

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

// window.ICON_COLOR = 'rgba(111,81,143,.5)'
let mainBGColor = '#25B1C4'
// let mainBGColor = 'transparent'
// window.ICON_COLOR = 'rgba(150,44,30,.57)' //'#D6CC4A'

window.MAIN_COLOR = mainBGColor

window.BASE_SIZE = rwd(iOS ? 12 : 12)
// console.log(1111111111111111111)
initAppFontSize = async () => {
  try {
    const value = await AsyncStorage.getItem('appBaseSize')

    // console.log(value, 'value 11111111111')
    if (value) {
      value = parseInt(value)
      console.log(value, 'value 2222')
      return value
    } else {
      return window.BASE_SIZE
    }
  } catch (error) {}
}
initAppFontSize().then(value => {
  // window.BASE_SIZE = value
})

// let headerHeight = Platform.OS === 'ios' ? 44 : 46
let headerHeight = iOS ? BASE_SIZE * 3 : BASE_SIZE * 4
let footerHeight = BASE_SIZE * 6
let normalSize = BASE_SIZE * 3 + 3

// let mainBGColor = 'hsla(261,12%,31%,1)'
// let mainBGColor = 'rgb(168,105,231)'
// let mainBGColor = 'rgb(231,105,105)'
let mainColor = '#fff'
// let mainColor = 'white'
let padding = 8

// let statusBarHeight = iOS ? 20 : StatusBarManager.HEIGHT
let statusBarHeight = StatusBar.currentHeight
// iPhoneX
// const X_WIDTH = 375
// const X_HEIGHT = 812

// window.iPhoneX =
//   iOS &&
//   ((screenHeight === X_HEIGHT && screenWidth === X_WIDTH) ||
//     (screenHeight === X_WIDTH && screenWidth === X_HEIGHT))
import D from 'react-native-device-info'
window.isSimulator = () => {
  return D.isEmulator()
}

window.deviceName = () => {
  return global.deviceInfo?.deviceName
}

window._deviceInfo = async () => {
  let { currentUser } = global
  return {
    is__DEV__: __DEV__,
    Brand: await D.getBrand(),
    Manufacturer: await D.getManufacturer(),
    APILevel: await D.getApiLevel(),
    Model: await D.getModel(),
    ReadableVersion: await D.getReadableVersion(),
    SystemVersion: await D.getSystemVersion(),
    SystemName: await D.getSystemName(),
    ApplicationName: await D.getApplicationName(),
    // getBatteryLevel: await D.getBatteryLevel(),
    BuildNumber: await D.getBuildNumber(),
    BundleId: await D.getBundleId(),
    // getCarrier: await D.getCarrier(),
    DeviceCountry: 'NAN', //D.getDeviceCountry(),
    // DeviceId: await D.getDeviceId(),
    DeviceLocale: 'NAN', //D.getDeviceLocale(),
    DeviceName: await D.getDeviceName(),
    FirstInstallTime: await D.getFirstInstallTime(),
    FontScale: await D.getFontScale(),
    FreeDiskStorage: await D.getFreeDiskStorage(),
    InstallReferrer: await D.getInstallReferrer(),
    InstanceID: 'NAN', //D.getInstanceID(),
    LastUpdateTime: await D.getLastUpdateTime(),
    MaxMemory: await D.getMaxMemory(),
    PhoneNumber: await D.getPhoneNumber(),
    Timezone: 'NAN', //D.getTimezone(),
    TotalDiskCapacity: await D.getTotalDiskCapacity(),
    TotalMemory: await D.getTotalMemory(),
    UserAgent: await D.getUserAgent(),
    Version: await D.getVersion(),
    is24Hour: 'NAN', //D.is24Hour(),
    isEmulator: await D.isEmulator(),
    isPinOrFingerprintSet: await D.isPinOrFingerprintSet(),
    isTablet: await D.isTablet(),
    hasNotch: await D.hasNotch(),
    isLandscape: await D.isLandscape(),
    getIPAddress: 'NAN', //D.getIPAddress(),
    getMACAddress: 'NAN', //D.getMACAddress(),
    SerialNumber: await D.getSerialNumber(),
    UniqueID: 'NAN', // D.getUniqueID(),
    // isAirPlaneMode: D.isAirPlaneMode(),
    userId: currentUser?.id,
    userName: currentUser?.name,
  }
}

window.setDeviceInfo = async () => {
  let _info = await _deviceInfo()
  log(_info, '_info')
  global.deviceInfo = _info
  global.DEVICE_INFO = _info
}
setDeviceInfo()

window.deviceInfo = () => {
  return global.deviceInfo
}

window.iPhoneX =
  iOS &&
  (deviceInfo.Model?.indexOf('iPhone X') == 0 ||
    deviceInfo.Model?.indexOf('iPhone 11') == 0)

export const size = {
  normalSize: normalSize,
  padding: padding,
  statusBarHeight: statusBarHeight,
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  viewHeight: screenHeight - headerHeight,
  sideMenuWidth: (screenWidth / 3) * 2,
  viewPadding: rwd(15),
  defaultSpacer: rwd(15),
  screenHeight: screenHeight,
  screenWidth: screenWidth,
  helfScreenWidth: screenWidth / 2,
  // divider: {backgroundColor: colors.smoke},
  safeAreaPaddingTop: iPhoneX ? rwd(30) : 0,
  safeAreaPaddingBottom: iPhoneX ? rwd(15) : 0,
  baseImageStyle: { flex: 1, width: undefined, height: undefined },
}

export const color = {
  navigationColor: mainBGColor,
  titleColor: mainColor,
  tabColor: mainBGColor,
  tabActiveColor: '#21201F',
  tabInactiveColor: '#FFF',
  indicatorColor: 'rgb(255,255,255)',
}

export const Const = {
  color: color,
  size: size,
}

window.initConstant = () => {
  window.iPhoneX =
    iOS &&
    (deviceInfo.Model?.indexOf('iPhone X') == 0 ||
      deviceInfo.Model?.indexOf('iPhone 11') == 0)

  window.SAFEAREA_TOP = iPhoneX ? rwd(30) : 0
  window.SAFEAREA_BOTTOM = iPhoneX ? rwd(15) : 0
}
// setDeviceInfo() run in SplashScreen
// initConstant() run in SplashScreen
