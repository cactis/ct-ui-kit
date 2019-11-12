import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class LI extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace('LI')
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

  onChangeText = content => {
    log(content, 'content')
    // this.setState({da})
    let { data } = this.state
    this.props.onChangeText(data.index, content)

    let { item = data } = data
    item.content = content
    this.setState({ data: { ...data } })
  }

  render() {
    let { parent } = this.props
    let { data } = this.state
    log(data, 'data in LI render()')
    if (!data) return null
    let { item = data, index } = data
    return (
      <T.Row
        flow="row"
        paddingVertical={rwd(iOS ? 8 : 0)}
        paddingHorizontal={rwd(12)}
      >
        <T.Col
          // borderWidth={1}
          flex={0}
          yAlign="flex-end"
          paddingTop={rwd(iOS ? 8 : 11)}
          padding={rwd(iOS ? 6 : 8)}
          paddingRight={rwd(0)}
        >
          <T.Label
            text={`\u2022`}
            style={T.TextStyles[iOS ? 'H9' : 'H6']}
            // style={T.TextStyles['H9']}
            size={rwd(iOS ? 8 : 14)}
          />
        </T.Col>
        <T.Space />
        <T.Col>
          <T.GrowTextInput
            // borderWidth={1}
            editable={parent.editable}
            onChangeText={this.onChangeText}
            autoFocus={parent.isMe() && index == 0 ? true : false}
            value={item.content}
            style={T.TextStyles['H6']}
            // padding={rwd(8)}
            onFocus={parent.onFocus}
          />
        </T.Col>
      </T.Row>
    )
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
