import { Component } from 'react'
import { Api } from './'
import { Linking } from 'react-native'

export class User extends Component {
  static validateToken = async onSuccess => {
    // log('validateToken called')

    let accessTokens = await User.tokens()
    // log(accessTokens, 'accessTokens in User validateToken')
    if (!accessTokens) {
      return //#T.AuthLoadingScreen.boot()
    }
    global.accessTokens = accessTokens
    let url = '/validate_token'
    // log(url, 'url')
    let response = await Api.get(url)
    let user = response.data || response
    // log(user, 'user in validateToken')
    if (user !== undefined && user.id !== undefined) {
      runLast(() => {
        let appV = parseInt(_.last(deviceInfo().ReadableVersion.split('.')))
        let serverV = parseInt(_.last(user.lastVersion.split('.')))
        if (serverV > appV && !__DEV__) {
          alert(
            `Version ${user.lastVersion} is available.\nPlease upgrade Readus immediately.\nDon't forget to rate us please.`,
            'success',
            () => {
              Linking.canOpenURL(APP_STORE_URL).then(supported => {
                if (supported) {
                  Linking.openURL(APP_STORE_URL)
                } else {
                  log("Don't know how to open URI: " + APP_STORE_URL)
                }
              })
            }
          )
        }
      }, 3000)
      global.currentUser = user
      global.isLogged = true
      onSuccess && onSuccess(user)

      let uts = await Storage.get('uts')
      uts = uts || '{}'
      // uts = JSON.parse(uts)
      uts[user.id] = {
        member: user.member_token,
        user: user.token,
      }
      global._uts = uts

      Storage.set('uts', uts)
    } else {
      global.isLogged = undefined
    }
    // log(global.isLogged, 'global.isLogged')
    return global.isLogged
  }

  static tokens = async () => {
    if (Dev.accessTokens) return Dev.accessTokens
    let userToken = await Storage.get('userToken')
    let memberToken = await Storage.get('memberToken')
    if (userToken == undefined || memberToken == undefined) {
      return undefined
    } else {
      if (Dev.accessTokens) {
        return Dev.accessTokens
      } else {
        return [memberToken, userToken].join('; ')
      }
    }
  }

  static remembered = async () => {
    let remembered = (await Storage.get('remembered')) || 'false'
    // log(remembered, 'remembered')
    return JSON.parse(remembered)
  }

  static phone = async () => {
    return await Storage.get('phone')
  }

  static logout = async onSuccess => {
    // log('logout')
    let { currentUser } = global
    // log(currentUser, 'currentUser')
    Dev.accessTokens = null
    global.accessTokens = undefined

    let phone = await Storage.get('phone')
    let remembered = await Storage.get('remembered')
    // log(phone, remembered, 'phone, remembered')

    let uts = await Storage.get('uts')
    // uts = JSON.parse(uts)
    log(uts, 'uts 11111')

    delete uts[currentUser.id]
    log(uts, 'uts 22222')
    global._uts = uts

    await Storage.clearAll()
    if (phone) await Storage.set('phone', phone)
    if (remembered) await Storage.set('remembered', remembered)

    if (uts) await Storage.set('uts', uts)

    global.isLogged = undefined
    global.currentUser = undefined

    onSuccess()
  }

  static signUp = async (params, onSuccess) => {
    log(1111)
    let response = await Api.post('/users', { user: params })
    log(response, 'response')
    log(222)
    setCurrentUser(response, onSuccess)
  }

  static login = async (params, onSuccess) => {
    let response = await Api.post('/sign_in', { user: params })
    setCurrentUser(response, onSuccess)
  }

  // static current = () => {
  //   return global.currentUser
  // }

  static isLogin = () => {
    return global.isLogged
  }
}

global.setCurrentUser = async (user, onSuccess) => {
  log(user, 'user - in setCurrentUser')
  user = user?.data || user
  log(user?.id, 'user?.id')
  if (user?.id) {
    let memberToken = user.member_token
    let userToken = user.token
    global.isLogged = true
    global.currentUser = user
    global.accessTokens = `${memberToken}; ${userToken}; ${user.name}`
    // log(global.currentUser, 'global.currentUser')

    log(memberToken, 'memberToken')
    Storage.set('phone', user.phone)
    // Storage.set('remembered', String(params.remembered))
    await Storage.set('memberToken', memberToken)
    await Storage.set('userToken', userToken)
    log(await Storage.get('memberToken'), "Storage.get('memberToken')")
    log(await Storage.get('userToken'), "Storage.get('userToken')")
    onSuccess && onSuccess(user)
  }
}

export default User

import { AsyncStorage } from 'react-native'

export class Storage {
  static clearAll = async callback => {
    AsyncStorage.clear(() => {
      AsyncStorage.getAllKeys().then(keys => {
        log(keys, 'keys - in Storage clearAll')
        callback && callback()
      })
    })
  }

  static setBy = async (root, key, value) => {
    let data = (await Storage.get(root)) || {}
    // log(data, 'data in setBy')
    data[key] = value
    return await Storage.set(root, data)
  }

  static getBy = async (root, key) => {
    let data = (await Storage.get(root)) || {}
    // log(data, 'data in getBy')
    return data[key] || null
  }

  static set = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      return value
    } catch (error) {
      // log(error, 'Storage setItem error!')
    }
  }

  static get = async (key, deleteIt = false) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        if (deleteIt) AsyncStorage.removeItem(key)
        return JSON.parse(value)
      }
    } catch (error) {
      // log(error, 'Storage getItem error!')
    }
  }
}
