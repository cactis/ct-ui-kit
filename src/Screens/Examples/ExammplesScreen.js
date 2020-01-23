import React from 'react'
import { StyleSheet } from 'react-native'

let _this, _navigation
export class ExammplesScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    return {
      title: navigation.state.params?.title || 'Exammples Screen',
      headerLeft: null,
    }
  }
  state = {
    data: null,
    mounted: false,
  }

  render() {
    let { data } = this.state
    // if (!data) return null
    log(data, 'data in ExammplesScreen render() ')
    return (
      <T.Screen>
        <T.Center>
          <T.Label text="ExammplesScreen Screen" theme="H1" />
        </T.Center>
        <T.Row>
          <Button title="Alert" onPress={() => alert()} />
          <Button
            title="Popup"
            onPress={() =>
              popup.open(<T.Label text="Popup Modal" />, {
                title: 'This is Popup Modal',
                fullScreen: true,
              })
            }
          />
          <Button
            title="Components"
            onPress={() =>
              gotoScreen('ComponentsScreen', { title: 'Components Examples' })
            }
          />
          <Button title="Segment" onPress={this.segmentTapped} />
          <Button
            title="List"
            onPress={() => gotoScreen('ListScreen', { title: 'List' })}
          />
        </T.Row>
        <T.NavEvent
          navigation={_navigation}
          onWillFocus={payload => {
            this.refs.list?.reloadData()
          }}
        />
      </T.Screen>
    )
  }

  segmentTapped = () => {
    gotoScreen('SegmentScreen', { title: 'Segment' })
  }

  initStateData = onComplete => {
    if (_navigation?.state.params) {
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
  autoRun = () => {
    _autoRun('segment', () => {
      this.segmentTapped()
    })
  }
}
var styles = StyleSheet.create({})

const Button = props => {
  return (
    <T.Space>
      <T.Button {...props} />
    </T.Space>
  )
}
