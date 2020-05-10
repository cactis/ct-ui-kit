if (__DEV__) console.log('!!! Library.js#UIKIT')

import React from 'react'

import D from 'react-native-device-info'
import _ from 'lodash'
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Share as RNShare,
} from 'react-native'

import Rate, { AndroidMarket } from 'react-native-rate'

window._ = _

window.share = (content, options) => {
  RNShare.share(content, options)
}

window._DEVICE_INFO = async () => {
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
    // DeviceId: await D.getDeviceId(),
    DeviceName: await D.getDeviceName(),
    FirstInstallTime: await D.getFirstInstallTime(),
    FontScale: await D.getFontScale(),
    FreeDiskStorage: await D.getFreeDiskStorage(),
    // InstallReferrer: await D.getInstallReferrer(),
    InstanceID: 'NAN', //D.getInstanceID(),
    // LastUpdateTime: await D.getLastUpdateTime(),
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
window.DEVICE_INFO = {}
window.iPhoneX = null
window.setDeviceInfo = async () => {
  let _info = await _DEVICE_INFO()
  // log(_info, '_info')
  window.DEVICE_INFO = _info
  // window.isSimulator = _info.isSimulator
  window.iPhoneX =
    iOS &&
    (_info.Model?.indexOf('iPhone X') == 0 ||
      _info.Model?.indexOf('iPhone 1') == 0)

  window.deviceName = () => {
    return _info.deviceName
  }
}

setDeviceInfo()
window.log = (...message) => {
  if (!Dev.disableLog) {
    let [m, ...ms] = message
    console.log('')
    // console.log('<------------------------------------------------------')
    console.log(m)
    console.log(`'${ms} from ${D.getModel()}'`)
    // console.log('------------------------------------------------------>')
    // console.log('')
  }
  // _trace()
}

window.__log = (message, title = '') => {
  log(message, title)
  T.Api.post('/log', {
    log: { title: title, logged: message },
  })
}

window.error = (...message) => {
  log(`___ ${message} ___`)
}

window.Dev = {}
require('../../../../Dev.js')

window._autoRun = (action, run, always = false) => {
  let DoString = Dev.do //?.split('-').slice(0, i)
  // log(action, 'action')
  if (Dev.autoRunTrace) {
    log(
      [Dev.doIndex, action, Dev.do, DoString?.indexOf(action)],
      '[Dev.doIndex, action, Dev.do, DoString?.indexOf(action)]'
    )
  }
  // log(Dev, 'Dev')
  let i = (Dev.doIndex >= 0 ? Dev.doIndex : 99) + 1
  // log(DoString, 'DoString')
  // log(DoString?.indexOf(action), 'DoString?.indexOf(action)')
  if (DoString?.indexOf(action) > -1 || always) {
    // log(action, run, 'action, run')
    _runOnce(action, () => {
      delayed(run)
    })
  }
}

window._trace = (key) => {
  if (key) log(key, 'tracing ----')
  key = key ? key : randId()
  _runOnce(key, () => {
    if (Dev?.logTrace || Dev?.componentTrace) {
      console.log('======= component trace ==========')
      console.log(new Error().stack)
    }
  })
}

window.randId = (min = 99999999, max = 999999999) => {
  return _.random(min, max)
}

window.rwd = (num, weight = 1) => {
  let r = SCREEN_WIDTH / 1400
  return num * (0.7 + r)
}

window._runLast = undefined
window.runLast = (func, wait = 1000, ...args) => {
  clearTimeout(_runLast)
  _runLast = setTimeout((args) => {
    func.apply(null, args)
  }, wait)
}

window._runOnce = (key, run) => {
  let _runOnce = global._runOnce || {}
  if (!_runOnce[key]) {
    global._runOnce[key] = true
    run()
  }
}

window.delayedTimer = undefined
window.delayed = (func, wait = 1000, ...args) => {
  clearTimeout(delayedTimer)
  delayedTimer = setTimeout((args) => {
    func.apply(null, args)
  }, wait)
}

window.navigateTo = (navigation, route, params = {}) => {
  // log(navigation, 'navigation in Library#navigateTo----------------')
  let nextKey = `${route}_${
    params?.data?.item?.id || params?.data?.id || params?.url
  }_${randId()}`

  if (!navigation) return
  // log(params, 'params - in Library navigateTo')
  // log(navigation, 'navigation - in ')
  let { routeName, key } = navigation.state
  // log(routeName, 'current routeName')
  // log(key, 'key current')
  // log(route, 'navigate to route')
  // log(nextKey, 'nextKey - in Library navigateTo')
  runLast(() => {
    // log('clear currentRoute')
    global.currentRoute = null
  })
  if (global.currentRoute == route) {
    return log('duplicate click')
  }
  // log(routeName, route, 'routeName, route')
  if (routeName == route) {
    // log(params, 'params in push')
    navigation.push(route, params, nextKey)
  } else {
    // log(params, 'params in navigate')
    // log(
    //     { routeName: route, params: params, key: nextKey },
    //     '{ routeName: route, params: params, key: nextKey }'
    // )
    navigation.navigate({
      routeName: route,
      params: params,
      key: nextKey,
    })
  }
  global.currentRoute = route

  // global.routesStack.push(routeName)
  // log(global.routesStack, 'global.routesStack')
}

window.pushTo = (navigation, route, params = {}) => {
  runLast(() => {
    // log(navigation, 'navigation pushTo called')
    if (!navigation) return
    // log(params, 'params - in Library pushTo')
    let nextKey = `${route}_${
      params?.data?.item?.id || params?.data?.id || randId()
    }`
    // log(nextKey, 'nextKey - in Library pushTo')

    // log(navigation, 'navigation - in ')
    // let { routeName } = navigation.state
    // if (routeName == route) {
    //   navigation.push(route, params)
    // } else {
    if (global.currentKey == nextKey) return log('duplicate click!!')
    global.currentKey = nextKey
    navigation.push(route, params, nextKey)
    global.currentKey = null
  }, 300)
  // }
}

String.prototype.remove = function (str) {
  if (this) {
    return this.replace(str, '')
  } else {
    return this
  }
}

Array.prototype.sample = function (num) {
  let items = this
  // log(items, 'items - in sample')
  let item = items[Math.floor(Math.random() * items.length)]
  // log(item, 'item - in sample')
  return item
}

window.columnsNumber = (padding = 0) => {
  // alert(SCREEN_WIDTH)
  let s = SCREEN_WIDTH
  let gutter = s * 0.01
  let columnWidth = s > 1000 ? 160 : s > 600 ? 150 : s > 400 ? 120 : 100
  let numColumns = Math.floor(s / columnWidth)
  columnWidth = (s - (numColumns - 1) * gutter - 2 * padding) / numColumns
  return { gutter: gutter, numColumns: numColumns, columnWidth: columnWidth }
}

window._runOnce = (key, run) => {
  let runKeys = global.runKeys || {}
  // if (__DEV__) console.log(runKeys, 'runKeys')
  if (!runKeys[key]) {
    runKeys[key] = true
    window.runKeys = runKeys
    run()
  }
}

window._log = (...message) => {
  if (!Dev.disableLog) {
    console.log(...message)
  }
}

window._clear = () => {
  console.clear()
}
if (!__DEV__) {
  window._runOnce = () => {}
  window.log = () => {}
  window._log = () => {}
  window._autoRun = () => {}
  window._trace = () => {}
  window._clear = () => {}
}

window.getDataByPaths = (json, paths) => {
  let pathArr = paths
  if (typeof paths === 'string') pathArr = paths.split('/')
  // log(pathArr, 'pathArr')
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    json
  )
}

import moment from 'moment'
// require('moment/min/locales.min')
// import 'moment/min/moment-with-locales'
// import 'moment/locale/en'
// import 'moment/locale/zh-tw'

// alert(moment.locale())
window.timeAgo = (date, locale = 'en') => {
  // log(date, 'date')
  // moment.locale(locale)
  return moment(date).fromNow()
}

Array.prototype.insert = function (index, item) {
  log(this, 'this')
  return [...this.slice(0, index), item, ...this.slice(index)]
}

_.insert = function (arr, index, item) {
  arr.splice(index, 0, item)
  log(arr, 'arr')
  return arr
}

window.asJSON = (data) => {
  try {
    // log(data,  'data')
    var json = JSON.parse(data)
    if (typeof json === 'object') {
      return json
    } else {
      return data
    }
  } catch (e) {
    return data
  }
}

String.prototype.asJSON = function () {
  window.asJSON(this)
}

window.openURL = (url, options = {}) => {
  // alert(url)
  // let { url, title } = options
  let { title } = options
  // log(url, 'url')
  // navigateTo(navigation, 'WebViewScreen', {
  //   uri: url,
  //   title: url,
  //   fullScreen: false,
  // })

  gotoScreen('WebViewScreen', {
    uri: url,
    title: title,
    fullScreen: false,
  })
  //
  // popupScreen.open(<T.WebViewScreen />, {
  //   uri: url,
  //   title: url,
  // })
  // return
  // T.Linking.canOpenURL(url).then(supported => {
  //   if (supported) {
  //     T.Linking.openURL(url)
  //   } else {
  //     log("Don't know how to open URI: " + url)
  //   }
  // })
}

RegExp.prototype.indexOf = function (str, startIndex) {
  var re = new RegExp(
    this.source,
    'g' + (this.ignoreCase ? 'i' : '') + (this.multiLine ? 'm' : '')
  )
  re.lastIndex = startIndex || 0
  var res = re.exec(str)
  if (!res) return -1
  return re.lastIndex - res[0].length
}

window.asCurrency = function (num, dollar = '') {
  if (num == null) {
    return ''
  }
  let n = String(num)
  n = n.replace(/,/g, '')
  let p = n.indexOf('.')
  let r = n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    p < 0 || i < p ? `${m},` : m
  )
  return `${dollar} ${r}`
}

Number.prototype.asCurrency = function (dollar = '') {
  return asCurrency(this)
}

window.requestPermissions = async () => {
  if (!iOS) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    )
    return result === PermissionsAndroid.RESULTS.GRANTED || result === true
  }
  return true
}

window.audioRecording = (item, options = {}) => {
  flexPopup.open(
    <T.Div borderRadius_={30} backgroundColor__={BFCOLOR}>
      <T.Row flex={0} padding={SIZE.l * 2}>
        <T.Text text={item.text} size={SIZE.l} numberOfLines={0} />
      </T.Row>
      <T.Center flex={0} padding={SIZE.l}>
        <T.AudioRecorder data={item} options={options} />
      </T.Center>
      <T.Space />
    </T.Div>,
    { backdropOpacity: 0.8, backgroundColor_: 'transparent' }
  )
}

window.drawerToggler = (navigation) => {
  window.navigation = navigation
  return (
    <T.Div paddingRight={10}>
      <T.BarItem
        name="user"
        iconSet="EvilIcons"
        color={BFCOLOR}
        size={rwd(35)}
        onPress={() => navigation.openDrawer()}
      />
    </T.Div>
  )
}

window.openDrawer = (navigation) => {
  window.navigation?.openDrawer()
}

window.closeDrawer = () => {
  window.navigation?.closeDrawer()
}

window.requestRating = async (force: false) => {
  let key = 'requestedReview'

  let requested = await T.Storage.get(key)
  if (requested && !force) return

  let { currentUser } = global
  log(currentUser, 'currentUser')
  let { reading = {}, lookings, searching } = currentUser
  log(reading, 'reading')
  let times = _.keys(reading).length
  log(times, 'times')
  if (!(times > 5 && searching && lookings) && !force) return
  await T.Storage.set(key, 'true')
  if (iOS) {
    doRating()
  } else {
    Alert.alert(
      'Enjoying Readus?',
      'Rate it on Google Play?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            doRating()
          },
        },
      ],
      { cancelable: false }
    )
  }
}

doRating = () => {
  let options = {
    AppleAppID: '1451449522',
    GooglePackageName: 'net.fiterl.readus',
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
    fallbackPlatformURL: 'https://readus.org/rating_callback',
  }
  // delayed(() => {
  Rate.rate(options, (success) => {
    if (success) {
      // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
      // this.setState({ rated: true })
    }
  })
  // })
}

/////////////////////////
window.alert = (message, type, options = {}) => {
  prompt(message, type, options)
}

window._alert = (message, type, options = {}) => {
  if (__DEV__) prompt(`__DEV__: ${message}`, type, options)
}

window.prompt = (message = 'Coming soon~', type, options = {}) => {
  if (window.dropdown) {
    let title = { error: '錯誤' }[type] || ''
    let _type = type || 'success'
    log(_type, '_type in prompt')
    window.dropdown.open(message, type, options)
  } else {
    Alert.alert(`${message}`)
  }
}

window.__warning__ = (message, type = 'error', onClose) => {
  prompt(message, type, onClose)
}

String.prototype.stripTags = function () {
  return this.replace(/<\/?[^>]+(>|$)/g, '')
}
