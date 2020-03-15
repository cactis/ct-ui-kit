import React from 'react'
import { StyleSheet } from 'react-native'

let _this, _navigation
export class ChattingsListScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      // title: navigation.state.params?.title || 'Chatting List',
      // headerLeft: () =>  () => null,
    }
  }
  state = {
    data: null,
    mounted: false,
  }

  reloadData = () => {
    this.refs.list.reloadData()
  }

  render() {
    let { data } = this.state
    // if (!data) return null
    log(data, 'data in ChattingsListScreen render() ')
    return (
      <T.Screen padding={0}>
        <T.List
          ref="list"
          url="/chats"
          renderItem={item => (
            <T.ChattingItem
              navigation={_navigation}
              onPress={() => navigateToRecord(item?.item?.target, _navigation)}
              data={item}
            />
          )}
        />
        <T.NavEvent
          navigation={_navigation}
          onWillFocus={payload => {
            // __DEV__ && this.refs.list?.reloadData()
          }}
        />
      </T.Screen>
    )
  }

  initStateData = onComplete => {
    if (_navigation.state.params) {
      let { data } = _navigation.state.params
      // _navigation.setParams({ title: '改為新標題' })
      this.mounted &&
        this.setState({ data }, () => {
          onComplete && onComplete()
        })
    } else {
      onComplete && onComplete()
    }
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
    _navigation = this.props.navigation
    // this.initStateData(() => {
    //   this.autoRun()
    // })
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
