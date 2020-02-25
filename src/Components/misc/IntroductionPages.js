import React from 'react'
import { StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

let _navigation
export class IntroductionPages extends React.PureComponent {
  state = {
    data: null,
  }

  _renderItem = ({ item }) => {
    return (
      <T.Screen backgroundColor={item.backgroundColor} safeAreaDisabled>
        <T.Center flex={0} marginTop={SAFEAREA_TOP + 3 * SIZE.l}>
          <T.Title
            color={item.color}
            theme="H1"
            text={item.title}
            size={rwd(30)}
          />
        </T.Center>
        <T.Center borderWidth_={1}>
          {/* <T.Image uri={T.Faker.image.image()} /> */}
          {/* {item.image ? <T.Image {...item.image} /> : null} */}
          {item.icon ? <T.Icon {...item.icon} /> : null}
        </T.Center>
        <T.Row
          flex={0}
          marginBottom={SAFEAREA_BOTTOM + 3 * SIZE.l}
          borderWidth__={1}
          marginHorizontal={SIZE.l}
        >
          {/* {item.description} */}
          {/* {item.text ? (
            <T.Text color={item.color} theme="H4" text={item.text} />
          ) : null} */}
          {item.lists ? <T.Lists data={item.lists} /> : null}
        </T.Row>
      </T.Screen>
    )
  }

  _onDone = () => {
    // navigateTo(_navigation, 'WelcomeScreen')
    this.props.onDone && this.props.onDone()
  }
  render() {
    let { data } = this.state
    let { slides } = this.props
    log(data, 'data in IntroductionPages render()')
    // if (!data) return null
    // let { item = data} = data
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        slides={slides}
        onDone={this._onDone}
      />
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
    _trace('IntroductionPages')
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
