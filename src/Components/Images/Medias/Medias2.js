import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Medias2 extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in Medias2 render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row flow="row" height={SCREEN_HEIGHT / 4}>
        <T.Col>
          <T.Media
            {...this.props}
            images={item}
            index={0}
            data={item[0]}
            style={{ width: '100%', height: '100%' }}
          />
        </T.Col>
        <T.Space size={SIZE.t / 2} />
        <T.Col>
          <T.Media
            {...this.props}
            images={item}
            index={1}
            data={item[1]}
            style={{ width: '100%', height: '100%' }}
          />
        </T.Col>
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
