import { Component } from 'react'
import { Api } from './'
import { Linking } from 'react-native'

export class User extends Component {
  static validateToken = async (onSuccess) => {
    log('validateToken called')

    let accessTokens = await User.tokens()
    log(accessTokens, 'accessTokens in User validateToken')
    // alert(accessTokens)

    if(accessTokens) {
      window.accessTokens = accessTokens
      // return accessTokens //#T.AuthLoadingScreen.boot()
    }
    let url = '/validate_tokens'
    // log(url, 'url')
    let res = await Api.get(url)
    let { data: user = res } = res
    // log(res, 'res')
    // log(user, 'user in validateToken')
    if(user !== undefined && user.id !== undefined) {
      // runLast(() => {
      //     let appV = parseInt(
      //         _.last(DEVICE_INFO.ReadableVersion?.split('.'))
      //     )
      //     log(appV, 'appV')
      //     let serverV = parseInt(_.last(user.lastVersion.split('.')))
      //     if (serverV > appV && !__DEV__) {
      //         alert(
      //             `Version ${user.lastVersion} is available.\nPlease upgrade app immediately.\nDon't forget to rate us please.`,
      //             'success',
      //             () => {
      //                 Linking.canOpenURL(APP_STORE_URL).then(
      //                     supported => {
      //                         if (supported) {
      //                             Linking.openURL(APP_STORE_URL)
      //                         } else {
      //                             log(
      //                                 "Don't know how to open URI: " +
      //                                     APP_STORE_URL
      //                             )
      //                         }
      //                     }
      //                 )
      //             }
      //         )
      //     }
      // }, 3000)
      // if (__DEV__) alert(user.name)
      window.currentUser = user
      // log(window.currentUser, 'window.currentUser')
      // log(currentUser, 'currentUser')
      onSuccess && onSuccess(user)

      // let uts = await Storage.get('uts')
      // uts = uts || '{}'
      // // uts = JSON.parse(uts)
      // uts[user.id] = {
      //     // member: user.member_token,
      //     user: user.token,
      // }
      // window._uts = uts
      // log(user.token)
      Storage.set('userToken', user.token)
      window.isLogged = true
      // T.Api.get('/me', res => {
      //   let { data } = res
      //   if (data) {
      //     window.currentUser = data
      //   }
      // })
    } else {
      window.isLogged = undefined
    }
    // log(window.isLogged, 'window.isLogged')
    return window.isLogged
  }

  static tokens = async () => {
    // log(Dev.accessTokens, 'Dev.accessTokens in User#tokens')
    log(Dev.accessTokens, 'Dev.accessTokens')
    log(window.accessTokens, 'window.accessTokens')
    if(Dev.accessTokens) return Dev.accessTokens
    if(window.accessTokens) return window.accessTokens
    let userToken = await Storage.get('userToken')
    log(userToken, 'userToken')
    // let memberToken = await Storage.get('memberToken')
    if(userToken == undefined) {
      return undefined
    } else {
      if(Dev.accessTokens) {
        return Dev.accessTokens
      } else {
        return userToken
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

  static logout = async (onSuccess) => {
    log('logout')
    // let { currentUser } = window
    // log(currentUser, 'currentUser')
    await Storage.clearAll()

    // alert('logout after clearAll')
    Dev.accessTokens = null
    window.accessTokens = undefined
    // log(Dev, 'Dev 2222222222222222')
    // let remembered = await Storage.get('remembered')
    // log(phone, remembered, 'phone, remembered')
    window.isLogged = undefined
    window.currentUser = undefined
    // log(global, 'global')
    log(window.accessTokens, window.isLogged, window.currentUser)
    onSuccess && onSuccess()
    // if (remembered) await Storage.set('remembered', remembered)
  }

  static setCurrentUser = async (data, onSuccess) => {
    // log(data, 'data - in setCurrentUser')
    let { data: user } = data
    // log(user?.id, 'user?.id')
    if(user?.id) {
      // let memberToken = user.member_token
      let userToken = user.token
      window.isLogged = true
      window.currentUser = user
      window.accessTokens = `${userToken}; ${user.name}`
      // log(window.currentUser, 'window.currentUser')
      // Storage.set('phone', user.phone)
      await Storage.set('userToken', userToken)
      onSuccess && onSuccess(user)
    }
  }

  static signUp = async (params, onSuccess) => {
    // log(1111)
    let response = await Api.post('/users', { user: params })
    // log(response, 'response')
    // log(222)
    User.setCurrentUser(response, onSuccess)
  }

  static login = async (params, onSuccess) => {
    let response = await Api.post('/sign_in', { user: params })
    User.setCurrentUser(response, onSuccess)
  }

  // static current = () => {
  //   return window.currentUser
  // }

  static isLogin = () => {
    return window.isLogged
  }
}
export default User

// import { AsyncStorage } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

export class Storage {
  static clearAll = async (callback) => {
    // alert('clear all')
    AsyncStorage.clear(() => {
      // alert('clear done')
      // log('clear all AsyncStorage')
      AsyncStorage.getAllKeys().then((keys) => {
        // log(keys, 'keys - in Storage clearAll')
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
    } catch(error) {
      // log(error, 'Storage setItem error!')
    }
  }

  static get = async (key, deleteIt = false) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        if(deleteIt) AsyncStorage.removeItem(key)
        return JSON.parse(value)
      }
    } catch(error) {
      // log(error, 'Storage getItem error!')
    }
  }
}
