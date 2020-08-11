import React from 'react'
import { StyleSheet } from 'react-native'
import { size } from 'lodash'

let _navigation
export class MessageForm extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    log(data, 'data in MessageForm render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Grid onPress={this.onPress} padding_={SIZE.l}>
        <T.Row flex={0} flow="row" paddingRight={SIZE.t}>
          <T.Col flex={0} yAlign="center" padding={SIZE.s}>
            <R.Avatar data={item.user} size={SIZE.l * 2} />
          </T.Col>
          <T.Col paddingRight={SIZE.s}>
            <T.RNTextInput
              ref={(c) => (window.input = c)}
              value={item.content}
              onChangeText={this.onChangeText}
              autoFocus={true}
              // onContentSizeChange={(e) =>
              //   this.updateSize(e.nativeEvent.contentSize.height)
              // }
              multiline={true}
              placeholder="回覆…"
              height={100}
              style={{
                flex: 1,
                padding: SIZE.s,
                borderWidth: 0.3,
                borderColor: 'rgb(211, 211, 211)',
                borderRadius: SIZE.m,
                // textAlign: 'center',
                // backgroundColor: 'rgb(238,238,238)',
                // height: textInputHeight,
                // height: 200,
              }}
            />
          </T.Col>
        </T.Row>
        <T.Row flex={0} xAlign="flex-end" flow="row" padding={SIZE.s}>
          <T.Col
            flex={0}
            borderWidth={1}
            paddingHorizontal={SIZE.s}
            borderRadius={SIZE.t}
            borderColor="rgb(211, 211, 211)"
            onPress={this.props.onCancel}
          >
            <T.Label title="取消" theme="H9" />
          </T.Col>
          <T.Space />
          <T.Col
            flex={0}
            borderWidth={1}
            paddingHorizontal={SIZE.s}
            borderRadius={SIZE.t}
            backgroundColor="rgb(0, 102, 211)"
            borderColor="rgb(211, 211, 211)"
            onPress={() => this.props.onUpdate(this.state.data)}
          >
            <T.Label title="更新" theme="H9" color="#efefef" />
          </T.Col>
        </T.Row>
      </T.Grid>
    )
  }
  onChangeText = (text) => {
    log(text, 'text#')
    let { data } = this.state
    let { item = data } = data
    item.content = text
    this.setState({ data: { ...data } })
  }

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
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
var styles = StyleSheet.create({})
