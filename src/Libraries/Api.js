// log('!!! Api.js#UIKIT')
// import '../Constants'
require('./Library')
require('../../../../AppConfig')
import React, { Component } from 'react'

let AppConfig = {
  appName: '(need to set by project)',
  // host: __DEV__ ? 'api' : 'api',
  apiVersion: '',
  Host: () => { },
  Hosts: {
    example: 'http://example.com',
  },
  ...window.AppConfig,
}

window.AppConfig = AppConfig

// alert(AppConfig.appName)
export class Api {
  static get = async (url, params = {}, onSuccess, onError) => {
    // log(url, 'url in get')
    const queryString = objToQueryString(params)
    const _url = url //+ "?" + queryString
    let result = await Api.request('GET', _url, params, onSuccess, onError)
    return result
  }

  static put = async (url, params = {}, onSuccess, onError) => {
    // log(params, 'params')
    const result = await Api.request('PUT', url, params, onSuccess, onError)
    // log(result, 'result')
    return result
  }

  static delete = async (url, onSuccess, onError) => {
    const result = await Api.request('DELETE', url, {}, onSuccess, onError)
    // log(result, 'result')
    return result
  }

  static post = async (url, params = {}, onSuccess, onError) => {
    return await Api.request('POST', url, params, onSuccess, onError)
    // log('post end')
  }

  static graphql = async (params = {}, onSuccess, onError) => {
    return await Api.request('POST', '/graphql', params, onSuccess, onError)
  }

  static request = async (method, url, params = {}, onSuccess, onError) => {
    let { HttpHeader } = params
    // log(HttpHeader, 'HttpHeader')
    params['HttpHeader'] = null
    if(Dev.logResponse)
      log(method, url, params, '(method, url, params in request')
    if(!url) return log('no url be setted in Api#request')
    let accessTokens = window.accessTokens
    // log(accessTokens, 'accessTokens in API request')
    // const _url = Settings.host + url
    // log(AppConfig, 'AppConfig')
    let _url

    if(url.includes('http')) {
      _url = url
    } else {
      if(url.includes('@')) {
        let [key, value] = url.split('@')
        let _url = key
        if(value) {
          if(AppConfig.apiVersion) {
            _url = AppConfig.Hosts[key] + AppConfig.apiVersion
          }
          _url = `${_url}${value}`
        }
      } else {
        let value = url
        // let defaultHost = AppConfig.Hosts['default']
        // let defaultHost = AppConfig.Host()
        // log(defaultHost, 'defaufltHost')
        // _url = AppConfig.Hosts[defaultHost]
        _url = AppConfig.Host()
        if(AppConfig.apiVersion) {
          _url = AppConfig.Hosts[defaultHost] + AppConfig.apiVersion
        }

        _url = `${_url}${value}`
      }
    }
    _url = encodeURI(_url)
    // [_url, AppConfig.apiVersion].join('/')
    log(_url, '_url')
    var response = {}
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': AppConfig.appName,
      modal: window.DEVICE_INFO?.Model,
      build: window.DEVICE_INFO?.ReadableVersion,
      os: iOS ? 'iOS' : 'Android',
      tokens: accessTokens,
      appName: AppConfig.appName,
      timeZoneOffset: String(window.timeZoneOffset()),
      ...HttpHeader,
    }
    window.HTTP_HEADERS = headers
    // log(headers, 'headers')
    // headers = _.merge(headers, HttpHeader)
    // log(headers, 'headers')
    // alert('uiapi')
    // log(headers, 'headers')
    // log(DEVICE_INFO, 'DEVICE_INFO')
    // alert(_url)
    switch(method) {
      case 'DELETE':
      case 'GET':
        response = await fetch(_url, {
          method: method,
          headers: headers,
        })
        // log(response, 'response')
        break
      case 'PUT':
      case 'POST':
        response = await fetch(_url, {
          method: method,
          headers: headers,
          body: JSON.stringify(params),
        })
        // log(response, 'response')
        break
      default:
    }
    // log(response, 'response in Api.js')
    const contentType = response.headers.get('content-type')
    // log(contentType, 'contentType')

    // log(Dev.logResponse, 'Dev.logResponse')
    if(contentType && contentType.indexOf('application/json') !== -1) {
      const json = await response.json()
      if(Dev.logResponse) log(json, `json in Api.js ${_url}`)
      if(json) {
        let { meta } = json
        let { errors } = json
        if(errors) {
          // if(__DEV__) {
          //   _alert(errors.map((e) => e.message).join('\n'))
          // }
          return onError && onError(errors)
        }

        // log(meta, 'meta')
        if(meta) {
          if(meta.alert) {
            json.alert && alert(json.alert)
            meta.alert && alert(meta.alert)
          }
          if(meta.error) {
            log('error type ==================')
            alert(meta.error, 'error')
            return onError && onError(meta)
          }
          if(meta.notice) {
            alert(meta.notice)
          }
        }
      }
      if(onSuccess) {
        // log(json, 'onSuccess --------------')
        return onSuccess(json)
      } else {
        return json
      }
    } else {
      let text = await response.text()
      if(onSuccess) {
        return onSuccess(text)
      } else {
        return text
      }
    }
  }
}

window.objToQueryString = (obj) => {
  const keyValuePairs = []
  for(const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    )
  }
  return keyValuePairs.join('&')
}

export default Api
