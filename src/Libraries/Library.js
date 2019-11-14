if (__DEV__) console.log('Library.js')
import _ from 'lodash'
window._ = _

window.Dev = {}

window.log = (...message) => {
  if (!Dev.disableLog) {
    console.log(message)
    console.log('')
  }
  // _trace('log')
}

window._autoRun = (action, run, always = false) => {
  // log(action, 'action')
  if (Dev.autoRunTrace) {
    log(Dev.doIndex, action, Dev.do, 'doIndex, action, Dev.do')
  }
  // log(Dev, 'Dev')
  let i = (Dev.doIndex >= 0 ? Dev.doIndex : 99) + 1
  let DoString = Dev.do //?.split('-').slice(0, i)
  // log(DoString, 'DoString')
  // log(DoString?.indexOf(action), 'DoString?.indexOf(action)')
  if (DoString?.indexOf(action) > -1 || always) {
    // log(action, run, 'action, run')
    _runOnce(action, () => {
      delayed(run)
    })
  }
}

window._trace = (key = randId()) => {
  _runOnce(key, () => {
    if (Dev?.logTrace || Dev?.componentTrace) console.log(new Error().stack)
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
  _runLast = setTimeout(args => {
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
  delayedTimer = setTimeout(args => {
    func.apply(null, args)
  }, wait)
}

window.navigateTo = (navigation, route, params = {}) => {
  // log(navigation, 'navigation in Library#navigateTo----------------')
  let nextKey = `${route}_${params?.data?.item?.id ||
    params?.data?.id ||
    params?.url}_${randId()}`

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
    navigation.navigate({ routeName: route, params: params, key: nextKey })
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
    let nextKey = `${route}_${params?.data?.item?.id ||
      params?.data?.id ||
      randId()}`
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

window.columnsNumber = (padding = 0) => {
  let s = SCREEN_WIDTH
  let gutter = s * 0.01
  let columnWidth = s > 1000 ? 200 : s > 600 ? 130 : s > 400 ? 120 : 100
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
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    json
  )
}

import moment from 'moment'
window.timeAgo = date => {
  // log(date, 'date')
  return moment(date).fromNow()
}

Array.prototype.insert = function(index, item) {
  log(this, 'this')
  return [...this.slice(0, index), item, ...this.slice(index)]
}

_.insert = function(arr, index, item) {
  arr.splice(index, 0, item)
  log(arr, 'arr')
  return arr
}

String.prototype.asJSON = function() {
  try {
    log(this, 'this')
    var json = JSON.parse(this)
    if (typeof json === 'object') {
      return json
    } else {
      return null
    }
  } catch (e) {
    return null
  }
}

window.openURL = href => {
  // alert(href)
  T.Linking.canOpenURL(href).then(supported => {
    if (supported) {
      T.Linking.openURL(href)
    } else {
      log("Don't know how to open URI: " + href)
    }
  })
}
