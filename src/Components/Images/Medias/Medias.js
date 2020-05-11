import React from 'react'
import { StyleSheet } from 'react-native'
import { Medias1, Medias2, Medias3, Medias4, Medias5 } from './'
let _navigation
export class Medias extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in Medias render()')
    if (!data) return null
    let { item = data } = data
    if (item.length == 0) return null
    let MediaTagType =
      item.length == 1
        ? Medias1
        : item.length == 2
        ? Medias2
        : item.length == 3
        ? Medias3
        : item.length == 4
        ? Medias4
        : Medias5
    return <MediaTagType data={data} />
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
