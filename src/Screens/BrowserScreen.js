import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import * as T from 'ct-ui-kit'
import { QuoteItem } from './'

const RESTORE = 'Show Full Text'

let _this, _navigation, _text
export class BrowserScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    // log(navigation, 'navigation in static navigationOptions')
    return {
      headerVisible: navigation?.state.params.isHeaderShow,
      title: navigation?.state.params
        ? navigation?.state.params.title
        : '預設標題',
      headerRight: <T.BarView />,
    }
  }

  filterText = () => {
    this.refs.list?.scrollToTop(0)
    this.refs?.input?.refs?.input?.input?.focus()
    this.onChangeText('')
  }

  state = {
    data: null,
    keyword: null,
    text: null,
    url: null,
  }

  componentDidMount() {
    _trace()
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text)
      this.setState({ text: this.props.text })
    if (prevProps.fontSize !== this.props.fontSize)
      this.setState({ fontSize: this.props.fontSize })
  }

  onChangeText = (keyword) => {
    // log(keyword, 'keyword - in onChangeText')
    this.setState({ keyword })
    if (keyword) {
      runLast(() => {
        this.setState({ text: [] }, () => {
          let text = _text.filter((d) => d.indexOf(keyword) > -1)
          this.setState({ text: text, extraData: keyword })
        })
      })
    } else {
      this.setState({ text: _text })
    }
  }

  onSpeechResult = (result) => {
    // this.refs.speech?._stopRecognizing()
    this.onChangeText(result[0].toLowerCase())
  }
  _onFontSizeChanged = (fontSize) => {
    this.setState({ fontSize })
    this.state.onFontSizeChanged && this.state.onFontSizeChanged(fontSize)
  }

  render() {
    let {
      url,
      uri = url,
      text,
      keyword,
      extraData,
      book,
      currentIndex,
      fontSize,
    } = this.state
    // log(fontSize, 'fontSize -----------------')
    return (
      <T.Grid paddingBottom={+10}>
        {uri ? (
          <T.Html uri={uri} />
        ) : text ? (
          <T.Grid>
            <T.Row flow="row" flex={0} xAlign="flex-end" yAlign="center">
              {/* <T.Col
                flow="row"
                align="center"
                flex={0}
                paddingHorizontal={rwd(10)}
              >
                <T.Icon
                  name="format-font-size-decrease"
                  iconSet="MaterialCommunityIcons"
                  color="rgb(145,141,149)"
                  size={rwd(12)}
                  onPress={() => this._onFontSizeChanged(fontSize - 1)}
                />
                <T.Label text={fontSize} theme="H8" color="rgb(145,141,149)" />
                <T.Icon
                  color="rgb(145,141,149)"
                  size={rwd(12)}
                  onPress={() => this._onFontSizeChanged(fontSize + 1)}
                  name="format-font-size-increase"
                  iconSet="MaterialCommunityIcons"
                />
              </T.Col> */}
              <T.Col yAlign="flex-end">
                <T.BarView>
                  {/* <T.Speech refs="speech" onResult={this.onSpeechResult} /> */}
                  <T.Space />
                  <T.Icon
                    name="book"
                    color="#6A6A6A"
                    iconSet="AntDesign"
                    onPress={() => navigateToObject(book, _navigation)}
                  />
                  <T.Space />
                  <T.R.PlayButton color="rgba(99,101,102,0.8)" data={book} />
                  <T.BarItem
                    name="ios-search"
                    iconSet="Ionicons"
                    color="#6A6A6A"
                    size={rwd(18)}
                    onPress={() => _this.filterText()}
                  />
                </T.BarView>
              </T.Col>
            </T.Row>
            <T.List
              ref="list"
              onViewableItemsChanged={this.onViewableItemsChanged}
              ListHeaderComponent=<T.Form
                scrollable={false}
                padding={0}
                paddingHorizontal={SCREEN_WIDTH / 10}
                marginVertical={rwd(20)}
              >
                <T.Field
                  type="TextInput1"
                  value={keyword}
                  placeholder="search"
                  bordered={false}
                  fieldStyle={{
                    borderRadius: rwd(30),
                    borderColor: 'rgb(166,166,152)',
                    borderWidth: rwd(0.5),
                    paddingHorizontal: rwd(10),
                  }}
                  ref="input"
                  autoCapitalize="none"
                  onChangeText={(text) => _this.onChangeText(text)}
                  preIcon=<T.Icon
                    padding={rwd(1)}
                    name="search"
                    size={rwd(20)}
                    color="#aaa"
                  />
                />
              </T.Form>
              data={text}
              extraData={this.state}
              contentContainerStyle={{ padding: rwd(10) }}
              renderItem={(item) => (
                <QuoteItem
                  data={item}
                  book={book}
                  fontSize={fontSize}
                  saveItem={this.saveItem}
                  current={currentIndex == item.index}
                  navigation={_navigation}
                  jumpTo={(_) => this.jumpTo(item)}
                />
              )}
            />
          </T.Grid>
        ) : null}
      </T.Grid>
    )
  }

  onViewableItemsChanged = (info) => {
    // log('onViewableItemsChanged')
    let item = info.viewableItems[0]?.item
    if (!item) return
    let index = _text.indexOf(item)
    if (index < 5) return
    this.saveIndex(index)
  }

  saveItem = (data) => {
    let index = _text.indexOf(data.item)
    if (index < 5) return
    this.saveIndex(index)
  }

  saveIndex = (index) => {
    // log(index, 'index in saveIndex')
    let { book } = this.state
    runLast(() => {
      this.setState({ currentIndex: index })
      T.Storage.setBy('txtReading', book.id, index)
    })
  }

  jumpTo = (data) => {
    this.setState({ text: [] }, () => {
      // log(data, 'data')
      let key = data.item
      // log(key, 'key')
      let index = _text.indexOf(key)
      // let index = data.index
      // log(index, 'index')
      if (index == -1) {
        this.setState({ text: _text })
        this.filterText()
        return
      }
      let text = [..._text]
      text = [RESTORE, ...text.splice(index)]
      // log(text, 'text')
      let extraData = randId()
      this.setState({ text: [...text], extraData }, () => {
        // this.forceUpdate()
        this.refs.list.refresh()
        this.refs.list.flatList.scrollToIndex({ index: 0, animated: true })
      })
    })
  }

  initStateData = (onComplete) => {
    // log(_navigation, '_navigation - in ')
    if (_navigation?.state.params) {
      let {
        data,
        text,
        keywords,
        url,
        book,
        fontSize,
        onFontSizeChanged,
      } = _navigation?.state.params
      // alert(url)
      // log(keywords, 'keywords')
      keywords = keywords?.slice(0, keywords.length - 1)
      // log(data, 'data - in BrowserScreen initStateData()')
      _text = text
      this.setState(
        {
          book,
          data,
          url,
          text,
          onFontSizeChanged,
          fontSize,
          keywords,
          // statuses: text.map(_ => {
          //   return false
          // }),
        },
        () => {
          this._onFontSizeChanged(fontSize)
          if (keywords) {
            this.onChangeText(keywords)
            delayed(() => {
              this.jumpTo({
                item: keywords,
                index: this.state.text.indexOf(keywords),
              })
            })
          } else {
            delayed(() => {
              T.Storage.getBy('txtReading', book.id).then((index) => {
                if (index && index < 5) return
                this.setState({ currentIndex: index })
                this.jumpTo({
                  item: text[index - 1],
                  index: index,
                })
              })
            })
          }
          onComplete && onComplete()
        }
      )
    }
  }
  autoRun = () => {}
}

var styles = StyleSheet.create({})
