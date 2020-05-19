import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Medias5 extends React.PureComponent {
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
    this.lastMedia = React.forwardRef()
    return (
      <T.Row height={SCREEN_HEIGHT / 2.5}>
        <T.Row flow="row" flex={2}>
          <T.Col>
            <T.Media
              images={item}
              index={0}
              data={item[0]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
          <T.Space size={SIZE.t / 4} />
          <T.Col>
            <T.Media
              images={item}
              index={1}
              data={item[1]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
        </T.Row>
        <T.Space size={SIZE.t / 4} />
        <T.Row xAlign="space-between" flow="row">
          <T.Col>
            <T.Media
              images={item}
              index={2}
              data={item[2]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
          <T.Space size={SIZE.t / 4} />
          <T.Col>
            <T.Media
              images={item}
              index={3}
              data={item[3]}
              style={{ width: '100%', height: '100%' }}
            />
          </T.Col>
          <T.Space size={SIZE.t / 4} />

          <T.Col onPress_={this.preview}>
            <T.Media
              images={item}
              index={4}
              data={item[4]}
              style={{ width: '100%', height: '100%' }}
              ref={(c) => (this.lastMedia = c)}
            />
            {item.length - 5 > 0 ? (
              <T.Float
                align="center"
                // width="50%"
                // height="50%"
                // backgroundColor="rgba(0,0,0,.18)"
                right={10}
                bottom={10}
                // onPress={this.preview}
                // borderRadius={1.5 * SIZE.l}
              >
                <T.Label
                  text={`+${item.length - 5}`}
                  color="white"
                  size={1.5 * SIZE.l}
                  theme="H2"
                  onPress={this.preview}
                />
              </T.Float>
            ) : null}
          </T.Col>
        </T.Row>
      </T.Row>
    )
  }

  preview = () => {
    this.lastMedia?.photo?.preview()
    // alert()
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
