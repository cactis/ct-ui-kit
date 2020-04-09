import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'
import { NativeModules } from 'react-native'

let _navigation
export class Dicts extends React.PureComponent {
  state = {
    data: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fontSize !== this.props.fontSize)
      this.mounted && this.setState({ fontSize: this.props.fontSize })
    if (prevProps.fontTheme !== this.props.fontTheme)
      this.mounted && this.setState({ fontTheme: this.props.fontTheme })
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  render() {
    let { data, fontSize, fontTheme } = this.state
    let {
      color = 'rgb(70,69,69)',
      size = 0.5,
      num,
      height,
      theme,
      underlined,
      ...props
    } = this.props
    if (!data) return null
    let { item = data } = data
    let words = item.split(' ')
    let o_length = words.length
    let length = num || o_length
    words = words.splice(0, length)

    const _CHECKSTYLE = {
      borderBottomWidth: 0.5,
      borderColor: 'rgb(129,126,126)',
    }
    const _UNDERSTYLE = {
      borderBottomWidth: 0.5,
      borderColor: 'rgb(255,0,0)',
    }
    let underlineStyle = underlined ? _UNDERSTYLE : {}

    if (length < o_length) words = [...words, '...']
    return (
      <T.Row flow="row" flexWrap="wrap" {...props}>
        {words.map(t => (
          <T.Col
            flex={0}
            key={randId()}
            style={{
              ...underlineStyle,
              ...(window.keywords == t ? _CHECKSTYLE : {}),
            }}
            onPress={() => {
              beep()
              if (iOS) {
                // t = dict.checkWord(t)
                t = t.replace(/'|"|;|\[|\]|\.|,/g, '')
                NativeModules.ReferenceLibraryManager?.showDefinitionForTerm(
                  t,
                  hasDefinition => {
                    if (!hasDefinition) {
                      alert(`'${t}' definition not found!`)
                    }
                  }
                )
                window.dict.checkWord(t)
              } else {
                this.onTapped(t, size)
              }
            }}
            // paddingHorizontal={rwd(4)}
            paddingHorizontal={rwd(2)}
            paddingVertical={rwd(2.5)}
            onLongPress={() => {
              this.onTapped(t, size)
            }}
          >
            <T.Label
              fontTheme={fontTheme}
              // padding={rwd(4)}
              title={t}
              color={color}
              // size={fontSize}
              selectable={false}
              theme={theme}
            />
          </T.Col>
        ))}
        {this.props.append}
      </T.Row>
    )
  }
  onTapped = (t, size = 0.5) => {
    log(window.dict, 'window.dict')
    window.dict.checkWord(t)
    window.dict.open(size)
    this.props.onCheckWord && this.props.onCheckWord()
  }

  initStateData = onComplete => {
    let { data, text, fontSize, fontTheme } = this.props
    data = data || text
    this.mounted &&
      this.setState({ data, fontSize, fontTheme }, () => {
        onComplete && onComplete()
      })
    this.initFontSize()
  }

  initFontSize = async () => {
    const txtFontSizeKey = 'txtFontSize'
    fontSize = (await T.Storage.get(txtFontSizeKey)) || rwd(16)
    this.mounted && this.setState({ fontSize })
  }

  autoRun = () => {
    _autoRun('dict', () => {
      this.onTapped('sorrow')
    })
  }
  componentWillUnmount() {
    this.mounted = false
  }
}
var styles = StyleSheet.create({})
