import React from 'react'
import { StyleSheet } from 'react-native'
import { Linking } from 'react-native'
import * as T from '../../'
export class Link extends React.PureComponent {
  handleClick = () => {
    if (this.props.inApp) {
      navigateTo(this.props.navigation, 'WebViewScreen', {
        uri: this.props.url,
        title: 'abc',
      })
    } else {
      if (!this.props.url) return
      Linking.canOpenURL(this.props.url).then(supported => {
        if (supported) {
          Linking.openURL(this.props.url)
        } else {
          console.log("Don't know how to open URI: " + this.props.url)
        }
      })
    }
  }
  render() {
    let { title, url, style, theme = 'H6', ...props } = this.props
    return (
      // <T.Touch onPress={this.props.onPress || this.handleClick}>
      // <T.Div style={styles.button}>
      <T.IconLabel
        theme={theme}
        style={styles.text}
        title={title || url}
        onPress={this.props.onPress || this.handleClick}
        {...props}
      />
      //   </T.Div>
      // </T.Touch>
    )
  }
}

var styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    // borderWidth: 0.5,
    // borderColor: 'rgb(191,184,20)',
    // backgroundColor: 'rgb(232,207,43)',
    padding: 3,
    paddingHorizontal: 8,
  },
})
