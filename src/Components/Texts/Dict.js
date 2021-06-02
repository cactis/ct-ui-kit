import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import { NativeModules } from 'react-native'

import Modal from 'react-native-modalbox'

let _navigation
export class Dict extends React.PureComponent {
  state = {
    data: null,
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  checkWord = word => {
    beep()
    word = word.replace(/\.|\!|\(|\)|“|”|\?|\"|\[|\]|:|;|,/g, '')
    this.mounted && this.setState({ data: word })
    this.callNPL(word)
    return word
  }
  open = size => {
    this.mounted && this.setState({ size })
    this.modal?.open()
  }

  close = () => {
    this.modal.close()
  }

  callNPL = data => {
    // log(data, 'data - in callNPL')
    this.mounted && this.setState({ item: null })
    // this.needFirstLoad = true
    window.keywords = data
    this.props.reloadData(data)
    let url = '/nlps/dep'
    T.Api.post(
      url,
      { text: data, model: 'en' },
      // , collapse_punctuation: 0, collapse_phrases: 1 },
      res => {
        // log(res, 'res')
        // log(res.words, 'res in callNPL')
        // log(res.words[0].definition)
        let words = res.words
        this.mounted && this.setState({ item: words[0] })
      }
    )
  }
  onChangeText = data => {
    this.mounted && this.setState({ data })
  }

  onSubmitEditing = () => {
    let { data } = this.state
    runLast(() => {
      this.callNPL(data)
    })
  }
  onIndexChanged = index => {
    // alert(index)
    if(index == 1) {
      runLast(() => {
        !this.noNeedFirstRun && this.props.reloadData(this.state.data)
        this.noNeedFirstRun = true
      })
    }
  }

  render() {
    let { data, item, size = 0.5 } = this.state
    // log(data, item, 'data, item in Dict render()')
    // let { item } = data
    let defs = item
      ? JSON.parse(item.def).map(def => {
        return `[${def.POS}] ${def.gloss} ${def['other terms']}`
      })
      : []
    return (
      <Modal
        ref={c => (this.modal = c)}
        position="bottom"
        entry="bottom"
        swipeToClose={false}
        style={{ height: SCREEN_HEIGHT * size, borderRadius: rwd(5) }}
      >
        <T.SafeArea>
          {/* <T.Space /> */}
          <T.Row yAlign="center" flow="row" flex={0} paddingVertical={rwd(3)}>
            <T.Col flex={0}>
              <T.Space
                height={rwd(20)}
                size={rwd(2)}
                backgroundColor={BCOLOR}
                marginRight={rwd(5)}
              />
            </T.Col>
            <T.Col flow="row">
              <T.Col>
                <T.Field
                  type="TextInput1"
                  autoCapitalize="none"
                  fontSize={rwd(18)}
                  value={data}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitEditing}
                />
              </T.Col>
              {iOS ? (
                <T.Center flex={0} paddingHorizontal={rwd(5)}>
                  <T.Icon
                    name="dictionary"
                    iconSet="MaterialCommunityIcons"
                    color="rgb(80,80,80)"
                    size={rwd(20)}
                    onPress={() => {
                      if(iOS) {
                        beep()
                        data = data.replace(/'|"|;|\[|\]|\.|,/g, '')
                        // alert(data)
                        NativeModules.ReferenceLibraryManager?.showDefinitionForTerm(
                          data,
                          hasDefinition => {
                            if(!hasDefinition) {
                              alert(`${data} definition not found!`)
                            }
                          }
                        )
                      } else {
                        // alert()
                      }
                    }}
                  />
                </T.Center>
              ) : null}
            </T.Col>
          </T.Row>
          {this.props.views ? (
            <T.Segment
              ref={c => (this.segment = c)}
              onIndexChanged={this.onIndexChanged}
              tabs={[{ title: 'Dictionary' }, ...this.props.titles]}
              views={[
                <T.Div flex={1}>
                  <T.List
                    data={defs}
                    contentContainerStyle={{ padding: rwd(10) }}
                    renderItem={item => (
                      <T.Row key={randId()} flow="row" flex={0}>
                        <T.Col yAlign="center" flex={0}>
                          <T.Icon name="dot-single" iconSet="Entypo" />
                        </T.Col>
                        <T.Col padding={rwd(4)}>
                          <T.Dicts data={item} />
                        </T.Col>
                      </T.Row>
                    )}
                  />
                </T.Div>,
                // ...this.props.views,
              ]}
            />
          ) : (
            <T.List
              data={defs}
              contentContainerStyle={{ padding: rwd(10) }}
              renderItem={item => (
                <T.Row key={randId()} flow="row" flex={0}>
                  <T.Col yAlign="center" flex={0} borderWidth_={1}>
                    <T.Icon name="dot-single" iconSet="Entypo" />
                  </T.Col>
                  <T.Col padding={rwd(4)}>
                    <T.Dicts data={item} />
                  </T.Col>
                </T.Row>
              )}
            />
          )}
        </T.SafeArea>
      </Modal>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  autoRun = () => { }

  componentWillUnmount() {
    this.mounted = false
  }
}
var styles = StyleSheet.create({})
