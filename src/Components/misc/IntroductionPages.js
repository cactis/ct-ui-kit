import React from 'react'
import { StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

let _navigation
const SLIDES = [
  {
    key: 'somethun',
    title: '第一頁',
    color: 'white',
    // text: 'Description.\nSay something cool',
    lists: {
      icon: {
        size: rwd(28),
        color: 'rgba(255,255,255,.76)',
        name: 'user-check',
        iconSet: 'Feather',
      },
      label: { size: rwd(28) },
      items: ['特色 1', '特色 2'],
    },

    icon: {
      color: 'rgba(255,255,255,.88)',
      size: 12 * SIZE.l,
    },
    // image: { uri: T.Faker.image.image(), size: rwd(200) },
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: '第二頁',
    color: 'white',
    text: 'Other cool stuff',
    icon: { color: 'white', size: 10 * SIZE.l },
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: '第三頁',
    color: 'white',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    icon: { color: 'white', size: 10 * SIZE.l },
    backgroundColor: '#22bcb5',
  },
]
export class IntroductionPages extends React.PureComponent {
  state = {
    slides: SLIDES,
  }

  _renderItem = ({ item }) => {
    log(item, 'item')
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
    let { slides } = this.state
    // let { slides = {} } = this.props
    log(slides, 'slides in IntroductionPages render()')
    if (!slides) return null
    // let { item = data} = data
    return (
      <AppIntroSlider
        // borderWidth={1}
        ref={c => (this.slider = c)}
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        dotStyle={{ backgroundColor: BCOLOR }}
        activeDotStyle={{ backgroundColor: '#aaa' }}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    )
  }

  _renderNextButton = () => {
    return (
      <T.Div style={styles.buttonCircle__}>
        <T.Label
          text="Next"
          name="md-arrow-round-forward"
          color="#333"
          theme="H2"
          style={{ backgroundColor: 'transparent' }}
        />
      </T.Div>
    )
  }
  _renderDoneButton = () => {
    return (
      <T.Div style={styles.buttonCircle__}>
        <T.Label
          text="Done"
          name="md-checkmark"
          color="#333"
          theme="H2"
          style={{ backgroundColor: 'transparent' }}
        />
      </T.Div>
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
    let { data, slides = SLIDES } = this.props
    this.mounted &&
      this.setState({ data, slides }, () => {
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
var styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
})
