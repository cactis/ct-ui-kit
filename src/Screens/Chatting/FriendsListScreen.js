import React from 'react'
import { StyleSheet } from 'react-native'

let _this, _navigation
export class FriendsListScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    return {
      title: navigation.state?.params?.title || '預設標題',
    }
  }
  state = {
    data: null,
    mounted: false,
  }

  render() {
    let { data } = this.state
  // log(data,  'data in FriendsListScreen render() ')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Screen padding={SIZE.n}>
        {/* <T.Dummy /> */}
        <T.List
          ref="list"
          url={item.inviting_url}
          renderItem={item => (
            <T.FriendItem
              data={item}
              //numColumns={numColumns}
              navigation={_navigation}
              // onPress={() => showRecord(item, { parent: this })}
              // onPress={this.onChecked}
              parent={this}
            />
          )}
        />
        <R.Button
          title={this.props.submitTitle}
          onPress={() => this.props.onSubmit(this.refs.list.state.data)}
        />

        {/* <T.NavEvent
          navigation={_navigation}
          onWillFocus={payload => {
            this.refs.list?.reloadData()
          }}
        /> */}
      </T.Screen>
    )
  }

  // onChecked = data => {
  //   log(data, 'data')
  //   let { item, index } = data
  //   log(item.checked, index)
  // }
  initStateData = onComplete => {
    // if (_navigation?.state?.params) {
    //   let { data } = _navigation.state?.params
    //   // _navigation.setParams({ title: '改為新標題' })
    //   this.mounted &&
    //     this.setState({ data }, () => {
    //       onComplete && onComplete()
    //     })
    // } else {
    //   onComplete && onComplete()
    // }
    this.setState({ data: this.props.data })
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      // this.bindHeaderRight()
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
