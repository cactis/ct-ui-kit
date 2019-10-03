if (__DEV__) console.log('Library.js')
import _ from 'lodash'
window._ = _

window.Dev = {}

window.log = (...message) => {
    if (!Dev.disableLog) {
        console.log(message)
    }
    _trace('log')
}

window._autoRun = (action, run, always = false) => {
    log(action, 'action')
    if (Dev.autoRunTrace)
        log(Dev.doIndex, action, Dev.do, 'doIndex, action, Dev.do')
    log(Dev, 'Dev')
    let i = (Dev.doIndex >= 0 ? Dev.doIndex : 99) + 1
    let DoString = Dev.do //?.split('-').slice(0, i)
    log(DoString, 'DoString')
    log(DoString?.indexOf(action), 'DoString?.indexOf(action)')
    if (DoString?.indexOf(action) > -1 || always) {
        log(action, run, 'action, run')
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
    // log(SCREEN_WIDTH, 'SCREEN_WIDTH')
    // alert(SCREEN_WIDTH)
    // log(num, (SCREEN_WIDTH / 320) * num, 'num, rwd num')
    // let ra1 = weight > 1 ? weight : 1
    // let ra2 = weight > 1 ? weight / 2 : 1
    let r = SCREEN_WIDTH / 1400
    // let ratio = SCREEN_HEIGHT / SCREEN_WIDTH
    // alert(Dimensions.get('window').height)
    // alert(r)
    return num * (0.7 + r)
    // return r > 10
    //   ? num * 1.5 * ra1
    //   : r > 5
    //   ? num * 1.2 * ra1
    //   : r > 3.5
    //   ? num * 0.8 * ra2
    //   : num * 0.6 /// ratio
}

window.delayedTimer = undefined
window.delayed = (func, wait = 1000, ...args) => {
    clearTimeout(delayedTimer)
    delayedTimer = setTimeout(args => {
        func.apply(null, args)
    }, wait)
}

window.navigateTo = (navigation, route, params = {}) => {
    log(navigation, 'navigation----------------')
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
    log(nextKey, 'nextKey - in Library navigateTo')

    if (routeName == route) {
        log(params, 'params in push')
        navigation.push(route, params, nextKey)
    } else {
        log(params, 'params in navigate')

        navigation.navigate({ routeName: route, params: params, key: nextKey })
    }
    // global.routesStack.push(routeName)
    // log(global.routesStack, 'global.routesStack')
}

window.pushTo = (navigation, route, params = {}) => {
    runLast(() => {
        log(navigation, 'navigation pushTo called')
        if (!navigation) return
        log(params, 'params - in Library pushTo')
        let nextKey = `${route}_${params?.data?.item?.id ||
            params?.data?.id ||
            randId()}`
        log(nextKey, 'nextKey - in Library pushTo')

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

if (!__DEV__) {
    window._runOnce = () => {}
    window.log = () => {}
    window._autoRun = () => {}
    window._trace = () => {}
}
