import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Pdf extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in Pdf render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row
        onPress={() =>
          popupScreen.open(<T.PdfViewerScreen data={item} />, {
            swipeToClose: false,
          })
        }
      >
        <T.Center backgroundColor="rgba(40,36,37,.82)" padding={SIZE.m}>
          <T.Image
            onPress={() => alert()}
            uri={item.thumb_file_url}
            // size={3 * SIZE.l}
            size="50%"
            // margin={SIZE.t}
          />
          <T.Label text={item.title} color="#eee" />
        </T.Center>
      </T.Row>
    )
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
