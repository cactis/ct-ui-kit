import { size } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class UrlPreviewItem extends React.PureComponent {
  state = {
    data: null,
  }


  render() {
    let { data } = this.state
    let { theme = 'vertical' } = this.props
    // log(data, 'data in UrlPreviewItem render()')
    if(!data) return null
    let { item = data } = data
    return (
      <T.Grid onPress={() => popupScreen.open(<T.WebViewScreen url={item.url} />, { title: item.url })} width={this.props.itemWidth} bordered padding={SIZE.m / 2}
        // backgroundColor='rgba(255,0,0,0.01)'
        borderRadius={SIZE.s - 2}>
        {theme !== 'vertical' ? <>
          <T.Image uri={item.image} uri={`${item.image}`} aspectRatio={16 / 9} __borderTopLeftRadius={SIZE.s} __borderTopRightRadius={SIZE.s} />
          <T.Space size={SIZE.t} />

          <T.Label text={_.toLower(getHostName(item.url))} theme='H9' size={SIZE.m} color='#7E8691' />
          <T.Label text={item.title} theme='H4' />
          <T.Row flex={1} height={SCREEN_WIDTH / 5}>

            <T.Text text={item.description} theme='H7' numberOfLines={3} color='#7E8691' />
          </T.Row></> : <T.Row flow='row'><T.Col flex={3} paddingVerticlal={SIZE.n}>

            <T.Grid>

              <T.Label text={item.title} theme='H4' />
              <T.Row flex={1} height={SCREEN_WIDTH / 4 - 12}>

                <T.Text text={item.description} theme='H9' numberOfLines={3} color='#7E8691' style={{ lineHeight: SIZE.m * 1.3 }} />
                <T.Space SIZE={SIZE.l} />
                <T.Label text={_.toLower(getHostName(item.url))} theme='H9' size={SIZE.m} color='#7E8691' />

              </T.Row>
            </T.Grid>

          </T.Col>
          <T.Space />
          <T.Col padding={SIZE.t}>
            <T.Image uri={item.image} uri={`${item.image}`} borderRadius={SIZE.s} __borderTopLeftRadius={SIZE.s} __borderTopRightRadius={SIZE.s} />
          </T.Col>
        </T.Row>}
      </T.Grid>
    )
  }
  onPress = () => {
    if(this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted && this.setState({ data }, () => {
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
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }


  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
