import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Lists extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
  // log(data,  'data in Lists render()')
    if (!data) return null
    // let { item = data} = data
    return (
      <T.Row flex={0} paddingBottom={1 * SIZE.l}>
        {data.items.map(item => (
          <>
            <T.Row key={item} flow="row" flex={0}>
              <T.Col flex={0} paddingTop={SIZE.s * 1.21} borderWidth__={1}>
                <T.Icon
                  color="rgba(255,255,255,.68)"
                  name="check"
                  iconSet="Entypo"
                  size={rwd(18)}
                  borderWidth__={1}
                  {...data.icon}
                />
              </T.Col>
              <T.Space />
              <T.Col paddingTop={SIZE.s}>
                <T.Text
                  color="white"
                  numberOfLines={0}
                  text={item}
                  theme="H4"
                  {...data.label}
                />
              </T.Col>
            </T.Row>
            <T.Space size={SIZE.s * 0.3} />
          </>
        ))}
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

  initStateData = onComplete => {
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
