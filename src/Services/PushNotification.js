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
    onRegister: function (token) {
      // _alert(token?.token)
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
    onNotification: function (notification) {
      // _alert('get message')
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

  let title, body, record
  if(iOS) {
    // log(record, 'record')

    // let { title, body, payload = notification.alert } = notification
    // let { record } = asJSON(payload) || notification

    // log(_navigation.state.routeName, 'current route name')
    let n = {
      foreground: false,
      userInteraction: false,
      message: "有人喜歡你的貼文: 「Aaa」",
      data: {
        remote: true,
        payload: {
          badge_sets: {
            notifications_count: 0
          },
          record: "{\"type\":\"Article\",\"routes\":\"/articles/e49e161d-467b-4222-8f9f-e34920b381fb\",\"id\":\"e49e161d-467b-4222-8f9f-e34920b381fb\",\"state\":\"published\",\"created_at\":\"2020-12-16T12:12:57.836Z\",\"updated_at\":\"2020-12-16T12:12:57.836Z\",\"cover\":null}"
        },
        notificationId: "2C1B200F-79AA-4077-9A7A-53E11CD41D7C"
      },
      badge: 0,
      title: "按讚通知",
      soundName: "default"
    }
    // let { message, alert = message } = notification
    title = notification.title
    body = notification.message
    badge = notification.badge
    let { data } = notification
    // title, message: body, badge, data } = notification
    // let { request = () => { } } = data
    // __log(alert, 'alert')
    // eval(request_action)
    let { payload } = data
    if(payload) {
      record = payload.record
      let request = payload.request
      // log(alert, 'alert')
      // let { request = () => { } } = alert
      // _alert(request)
      eval(request)
      window.updateBadge(badge)
    }
    // __log('----------------------')
  } else {
    log(notification, 'notifition')
    let { data = notification } = notification
    title = data.title
    body = data.body
    record = data.record

    // log(data, 'data')
    let { request = () => { } } = data
    // _alert(request)
    eval(request)
    // if (payload) {
    //   record = asJSON(payload)?.record
    // }
  }
  record = asJSON(record)
  // log(window.currentRoom, record?.id)
  if(window.currentRoom && window.currentRoom == record?.id) {
    // _alert('no need alert')
    return
  }
  log(title, 'title')
  log(body, 'body')
  if(title || body) {
    alert({ title: title, body: body }, 'info', {
      onTapped: () => {
        // log(data, 'data')
        // let { action } = data
        // log(action, 'action')
        // if (action == 'tap') {
        log(_navigation, '_navigation')
        // navigateToRecord(record, _navigation)
        showRecord(record)
        // }
      },
    })
  }
}

// https://dev.tapjoy.com/faq/how-to-find-sender-id-and-api-key-for-gcm/

const android = {
  foreground: true,
  'google.delivered_priority': 'normal',
  'google.sent_time': 1586853508813,
  'google.ttl': 2419200,
  'google.original_priority': 'normal',
  payload:
    '{"badge_sets":{"chattings_count":10,"notifications_count":19},"record":"{\\"type\\":\\"Article\\",\\"routes\\":\\"\\/articles\\/f5a7670e-9158-4862-83b7-8297c52137a0\\",\\"id\\":\\"f5a7670e-9158-4862-83b7-8297c52137a0\\",\\"state\\":null,\\"created_at\\":\\"2020-04-12T03:00:12.005Z\\",\\"updated_at\\":\\"2020-04-14T08:38:27.802Z\\",\\"cover\\":null}"}',
  userInteraction: false,
  id: '705506622',
  body: '[n5] ... ...',
  badge: '2',
  title: 'chitsung liked your article ',
  'google.message_id': '0:1586853508826714%37ccf4b2f9fd7ecd',
  message: '[n5] ... ...',
}

// iOS
const ios = {
  foreground: true,
  userInteraction: false,
  message: {
    title: '回應貼文通知',
    body: '有人回應你的貼文：「測試」',
  },
  data: {
    remote: true,
    payload: {
      badge_sets: {
        notifications_count: 2,
      },
      record:
        '{"type":"Article","routes":"/articles/b09f1f87-d690-4b39-b588-d612704b5622","id":"b09f1f87-d690-4b39-b588-d612704b5622","state":null,"created_at":"2020-08-11T14:27:34.222Z","updated_at":"2020-08-11T14:27:34.222Z","cover":null}',
    },
    notificationId: 'A7B5C461-472A-40A9-90D6-28770DF147E7',
  },
  badge: 2,
  soundName: 'default',
}
