import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Medias1 extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in Medias1 render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row flow="row" height={SCREEN_HEIGHT / 3}>
        <T.Media
          data={item[0]}
          images={item}
          // uri={item[0].small_file_url}
          // aspectRatio={1.5}
          style={{ width: '100%', height: '100%' }}
          // thumbUri={item[0].small_file_url}
          // height={SCREEN_HEIGHT / 3}
          // paddingTop={SIZE.s}
        />
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
