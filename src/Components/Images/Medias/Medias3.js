import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Medias3 extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in Medias3 render()')
    if (!data) return null
    let { item = data } = data
    let space = SIZE.s / 4
    let h = SCREEN_HEIGHT / 3
    let w = SCREEN_WIDTH - space
    let aspectRatio1 = w / 2 / h
    let aspectRatio2 = w / 2 / (h - space)
    log(item, 'item')
    return (
      <T.Row flow="row" height={SCREEN_HEIGHT / 3}>
        <T.Col backgroundColor_="red" flex={2}>
          <T.Media
            images={item}
            index={0}
            data={item[0]}
            style={{ width: '100%', height: '100%' }}
            // aspectRatio={aspectRatio1}
          />
        </T.Col>
        <T.Space size={space} />
        <T.Col xAlign="space-between">
          <T.Col backgroundColor_="red">
            <T.Media
              images={item}
              index={1}
              data={item[1]}
              style={{ width: '100%', height: '100%' }}

              // aspectRatio={aspectRatio2}
            />
          </T.Col>
          <T.Space size={space} />
          <T.Col backgroundColor_="red">
            <T.Media
              images={item}
              index={2}
              data={item[2]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
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
