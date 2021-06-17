import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class TagContent extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in TagContent render()')
    if(!data) return null
    let { item = data } = data
    let size = SIZE.m * 1.1
    let { numberOfLines = 0 } = this.props
    return (
      <T.Grid paddingVertical={SIZE.l}>
        <T.Html
          tagsStyles={{
            p: {
              fontSize: size,
              lineHeight: 1.7 * size,
              color: '#333',
            },
            a: {
              fontSize: size,
              color: '#444',
              fontWeight: '500',
              textDecorationColor: '#fff',
              // borderBottom: 'none',
              // border: '3px solid #ccc',
              // margin: SIZE.l,
              // padding: '20%',
            },
          }}
          classesStyles={{
            link: {
              textDecoration: 'none',
              marginRight: SIZE.l,
            },
          }}
          onLinkPress={(e, href) =>
            popupScreen.open(
              <R.ArticlesList
                onPress={popupScreen.close}
                url={`/articles?keyword=${href.replace('#', '')}`}
              />,
              { title: href }
            )
          }
          renderers={{
            p: (_, children) => (
              <T.Text numberOfLines={numberOfLines}>{children}</T.Text>
            ),
          }}
          html={item.html}
        />
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
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
