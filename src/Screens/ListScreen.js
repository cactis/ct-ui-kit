import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
let _this, _navigation
export class ListScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params?.title || '預設標題',
    }
  }
  state = {
    data: null,
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let { data, url, renderItem, title } = this.state
    // if (!data) return null
    if (!url) return null
    log(url, 'url')
  // log(data,  'data in ListScreen render() ')
    return (
      <T.Screen padding={0}>
        <T.List
          ListHeaderComponent=<T.R.Title title={title} />
          searchable
          // contentContainerStyle={{ padding: rwd(10) }}
          refs={url}
          url={url}
          renderItem={renderItem}
          // renderItem={item => (
          //   <RNKit.R.SearchItem
          //     onPress={() => navigateToObject(item, _navigation, {})}
          //     // navigation={_navigation}
          //     data={item}
          //   />
          // )}
        />
      </T.Screen>
    )
  }

  initStateData = onComplete => {
    if (_navigation.state.params) {
      let { data, url, renderItem, title } = _navigation.state.params
      // _navigation.setParams({ title: '改為新標題' })
      log(url, 'url -22222222222222222222')
      this.mounted &&
        this.setState({ data, url, renderItem, title }, () => {
          this.forceUpdate()
          onComplete && onComplete()
        })
    } else {
      onComplete && onComplete()
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
