import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import { NavigationEvents } from 'react-navigation'

// import Tts from 'react-native-tts'

let _this, _navigation
export class QuoteScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
     return {
      title: navigation.state.params?.title || 'Teacher Quote',
    }
  }
  state = {
    data: null,
  }

  componentDidMount() {
    _trace()
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
    // Tts.addEventListener('tts-finish', event =>
    //   this.setState({ speaking: false })
    // )
  }

  checkWord = (t) => {
    t = t.replace(/\"|\[|\]|;|,|\./g, '')
    log(t, 't')
    let { words } = this.state
    if (!words) return
    let item = words.filter((d) => d.word == t)[0]
  // log(item, 'item')
    // let pos = _.uniq(item.map(j => j.POS)).join(', ')
    this.setState({ item: item })
  }
  render() {
    let { data, words, item, book, speaking = false } = this.state
    if (!data) return null
    // log(data, 'data in QuoteScreen render() ')
    // log(words, 'words - in render')
    return (
      <T.Screen padding={0}>
        <NavigationEvents
          navigation={_navigation}
          onWillFocus={(payload) => {
            let { data } = payload.state.params
            // this.initStateData()
          }}
        />
        <T.Row
          flex={0}
          borderRadius={rwd(10)}
          padding={rwd(20)}
          margin={rwd(4)}
          backgroundColor="rgba(34,34,42,.9)"
          // flow="row"
        >
          {/* <T.Text text={data} color="#efefef" numberOfLines={0} theme="H5" /> */}
          <T.Row flow="row" flexWrap="wrap" flex={0}>
            {data.split(' ').map((t) => (
              <T.Div padding={rwd(2)}>
                <T.Label
                  onPress={(_) => this.checkWord(t)}
                  padding={rwd(4)}
                  title={t}
                  color="#efefef"
                  theme="H1"
                  style={{ fontwWeight: 100 }}
                  size={rwd(15)}
                />
              </T.Div>
            ))}
          </T.Row>
          <T.Space size={rwd(10)} />
          <T.Row flow="row" xAlign="flex-end" flex={0}>
            <T.Icon
              size={rwd(18)}
              name="content-save-outline"
              iconSet="MaterialCommunityIcons"
              // color={MAIN_COLOR}
              color={book ? 'rgb(210,208,209)' : '#333'}
              onPress={() => {
                if (!book) return
                this.setState({ status: false })
                T.Api.post(
                  `${book.routes}/quotes`,
                  { quote: { txt: data } },
                  (result) => {
                    alert('Save to your favorites quotes successfully')
                    window.FavoritesQuoesNeedUpdate &&
                      window.FavoritesQuoesNeedUpdate()
                  }
                )
              }}
            />
            <T.Space />
            <T.Icon
              color={book ? 'rgb(210,208,209)' : '#333'}
              name="image-filter-center-focus-weak"
              iconSet="MaterialCommunityIcons"
              onPress={() => {
                if (!book) return
                openTextBook(_navigation, data, book)
              }}
            />
            <T.Space />
            <T.Icon
              name="text-to-speech"
              iconSet="MaterialCommunityIcons"
              color={speaking ? 'rgb(27,126,242)' : 'rgb(210,208,209)'}
              onPress={() => {
                // Tts.setDefaultPitch(1.2)
                // Tts.stop()
                // if (speaking) {
                //   Tts.stop()
                //   this.setState({ speaking: false })
                // } else {
                //   this.setState({ speaking: true })
                //   if (iOS) {
                //     Tts.speak(data, {
                //       // iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                //     })
                //   } else {
                //     Tts.speak(data, {
                //       // androidParams: {
                //       //   KEY_PARAM_PAN: -1,
                //       //   KEY_PARAM_VOLUME: 0.5,
                //       //   KEY_PARAM_STREAM: 'STREAM_MUSIC',
                //       // },
                //     })
                //   }
                // }
              }}
            />
          </T.Row>
        </T.Row>
        <T.Space />
        {item ? (
          <T.Scroll padding={rwd(8)}>
            <T.Row yAlign="center" flow="row" flex={0}>
              <T.Label theme="H3" text={item.word} />
              <T.Space />
              {/* <T.Label theme="UppH5" text={pos} /> */}
            </T.Row>
            {/* <T.Text numberOfLines={0} theme="H7" text={others} /> */}
            <T.Row>
              {JSON.parse(item.def).map((def) => {
                return (
                  <T.Row key={randId()} flow="row" flex={0} padding={rwd(5)}>
                    <T.Col yAlign="center" flex={0}>
                      <T.Icon name="dot-single" iconSet="Entypo" />
                    </T.Col>
                    <T.Col>
                      <T.Text
                        // theme="H7"
                        onPress={() => {
                          let quote = `[${def.POS}] ${def.gloss} ${def['other terms']}`
                          navigateTo(_navigation, 'QuoteScreen', {
                            data: quote,
                            // book: item.item.book,
                          })
                        }}
                        numberOfLines={0}
                        text={`[${def.POS}] ${def.gloss} ${def['other terms']}`}
                      />
                    </T.Col>
                  </T.Row>
                )
              })}
            </T.Row>
          </T.Scroll>
        ) : null}
      </T.Screen>
    )
  }

  callNPL = (data) => {
    // log(data, 'data - in callNPL')
    let url = '/nlps/dep'
    T.Api.post(
      url,
      { text: data, model: 'en' },
      // , collapse_punctuation: 0, collapse_phrases: 1 },
      (data) => {
        // log(data, 'data')
        // log(data.words, 'data in callNPL')
        // log(data.words[0].definition)
        let words = data.words
        this.setState({ words })
      }
    )
  }

  initStateData = (onComplete) => {
    if (_navigation.state.params) {
      let { data, book } = _navigation.state.params
      // log(data, 'data in QuoteScreen#initStateData')
      // _navigation.setParams({ title: '改為新標題' })
      this.setState({ data, book }, () => {
        this.callNPL(data)
        onComplete && onComplete()
      })
    }
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
