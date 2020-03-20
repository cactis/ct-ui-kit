log('PushNotification.js')
import RNPushNotification from 'react-native-push-notification'
// import { PushNotificationIOS } from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

// import * as T from 'ct-ui-kit'

export const PushNotification = (navigation, options) => {
  let { senderID } = options
  // alert()
  // log(navigation, 'navigation ######################')
  // __log(global._uts, 'global._uts')
  // log(PushNotification, 'PushNotification')
  RNPushNotification.configure({
    onRegister: function(token) {
      log(token, 'token')
      // if (!token.token) return
      let params = {
        device: {
          uuid: token?.token,
          // name: 'name',
          isSimulator: __DEV__,
          kind: token?.os,
        },
      }
      //   log(params, 'params')
      // alert(params, 'params')
      T.Api.post('/devices', params)
      T.Storage.set('uuid', token)
    },
    onNotification__: function(notification) {
      log(notification, 'notification')
    },
    onNotification: function(notification) {
      _log(notification, 'notification')
      // alert(notification)
      let { foreground } = notification
      // alert(foreground)
      let content, record, data, badge
      // count_of_informations,
      // count_of_unread_channels
      __log({ notification: notification, iOS: iOS })

      if (iOS) {
        data = notification.data?.payload
        let { alert } = notification
        // alert('iOS')
        if (data.record) record = JSON.parse(data.record)
        // count_of_informations = alert.count_of_informations
        // count_of_unread_channels = alert.count_of_unread_channels
        badge = notification.badge

        // information_id = alert.information_id
        // content = alert.body || alert.title || alert
        let { title, body } = alert
        content = _.uniq(_.compact([title, body])).join('\n')
        // alert(content)
        // log(data, 'data in PushNotification#onNotification')
      } else {
        data = notification.payload
        log('android')

        // alert('android')
        // if (!notification.record) return
        data = JSON.parse(data)
        record = data.record

        let { content: _content, body, message, title } = notification
        content = _.uniq(_.compact([body, title, message, _content])).join('\n')
      }
      log(data, 'data')
      // data = { a: 1, b: 2 }
      T.EventRegister.emit('onNotification', data)
      // T.EventRegister.emit('notificationsCountChanged', { aaa: 33355 })

      // if (foreground) {
      log(content, 'content')
      if (record && content) {
        log(record, 'record')
        dropdown(content, data => {
          // log(data, 'data')
          // if (!data) return
          // let { action } = data
          // log(action, 'action')
          // if (action == 'tap') {
          navigateToRecord(record, navigation)
          // {
          //   title: 'abc1111111'
          // }
          // navigateTo(_navigation, 'NotificationsListScreen')
          // }
        })
      } else {
        if (content) dropdown(content)
      }
      // } else {
      //   //   log(record, 'record')
      //   // navigateToRecord(record, navigation)
      // }
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    // https://console.firebase.google.com/project/ampdr-257203/settings/cloudmessaging/
    // https://console.firebase.google.com/u/0/project/ampdr-259503/settings/cloudmessaging/
    // senderID: '1020800741073',
    senderID: senderID,

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  })
}

// export { configure }
