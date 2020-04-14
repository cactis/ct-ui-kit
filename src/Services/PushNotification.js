log('PushNotification.js')
import * as T from 'ct-ui-kit'

import RNPushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
// log(PushNotificationIOS.FetchResult, 'PushNotificationIOS')
let _navigation
export const PushNotification = (navigation, options = {}) => {
  _navigation = navigation
  // alert(AppConfig.androidPushSenderId)
  // alert('PushNotification')
  // log(_navigation, '_navigation in PushNotification')
  RNPushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    // onRegistrationError: function(err) {
    //   alert(err)
    // },
    onRegister: function(token) {
      // alert(token)
      // log(token, 'token in PushNotification#onRegister')
      let params = {
        device: {
          uuid: token.token,
          // name: 'name',

          isSimulator: __DEV__,
          kind: token.os,
        },
      }
      // __log(params, 'params')
      // alert(token.token)
      T.Api.post('/devices', params)
      T.Storage.set('uuid', token.token)
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      // __log(notification, 'notification')
      // process the notification
      processNotification(notification)
      // alert('got it')

      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: AppConfig.androidPushSenderId,

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
  })
}

const seed = {
  foreground: true,
  userInteraction: false,
  message: {
    title: 'CT 正在聽',
    record: {
      routes: '/books/12315023-aff6-42ab-99db-8b0534635ac9',
      type: 'Book',
      title: 'Phoebe Deane',
      cover:
        'https://archive.org/download/phoebedeane_1701_librivox/phoebe_deane_1701.jpg',
      author: 'Grace Livingston Hill',
    },
    body: 'Phoebe Deane',
  },
  data: {
    remote: true,
    notificationId: 'C225858E-70A6-4D99-B648-D25B5E3D02A0',
  },
  badge: 0,
  alert: {
    title: 'CT 正在聽',
    record: {
      routes: '/books/12315023-aff6-42ab-99db-8b0534635ac9',
      type: 'Book',
      title: 'Phoebe Deane',
      cover:
        'https://archive.org/download/phoebedeane_1701_librivox/phoebe_deane_1701.jpg',
      author: 'Grace Livingston Hill',
    },
    body: 'Phoebe Deane',
  },
  sound: 'default',
}
const push = {
  foreground: false,
  userInteraction: true,
  message: {
    title: '推播測試',
    body: 'Hi, CT 你好, 32:01。',
  },
  data: {
    remote: true,
  },
  badge: 0,
  alert: {
    title: '推播測試',
    body: 'Hi, CT 你好, 32:01。',
  },
  sound: 'default',
}
window.processNotification = (notification = push) => {
  __log(notification, 'notification')
  // notification =
  // let { alert } = notification
  // let { title, body} = notification
  let { title, body, payload = notification.alert } = notification
  let { record } = asJSON(payload) || notification
  log(record, 'record')
  record = asJSON(record)
  // log(_navigation.state.routeName, 'current route name')
  log(window.currentRoom, record?.id)
  if (window.currentRoom && window.currentRoom == record?.id) {
    _alert('no need alert')
    return
  }
  if (title) {
    alert(`${title}\n${body}`, 'info', {
      onTapped: () => {
        // log(data, 'data')
        // let { action } = data
        // log(action, 'action')
        // if (action == 'tap') {
        log(_navigation, '_navigation')
        navigateToRecord(record, _navigation)
        // }
      },
    })
  }
}

// https://dev.tapjoy.com/faq/how-to-find-sender-id-and-api-key-for-gcm/
