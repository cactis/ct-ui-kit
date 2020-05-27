import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Medias4 extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in Medias4 render()')
    if (!data) return null
    let { item = data } = data
    let size = SCREEN_HEIGHT / 3
    let aspectRatio = 0.65
    let space = <T.Space size={SIZE.t / 5} />
    let photos = item.filter((r) => r.type == 'Photo').map((r) => r.id)
    // log(photos, 'photos')
    // alert()
    return (
      <T.Row flow="row" height={SCREEN_HEIGHT / 3}>
        <T.Col>
          <T.Col borderWidth_={1}>
            <T.Media
              images={item}
              index={photos.indexOf(item[0].id)}
              data={item[0]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
          {space}
          <T.Col>
            <T.Media
              images={item}
              index={photos.indexOf(item[1].id)}
              data={item[1]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
        </T.Col>
        {space}
        <T.Col xAlign="space-between">
          <T.Col>
            <T.Media
              images={item}
              index={photos.indexOf(item[2].id)}
              data={item[2]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
          {space}
          <T.Col>
            <T.Media
              images={item}
              index={photos.indexOf(item[3].id)}
              data={item[3]}
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
