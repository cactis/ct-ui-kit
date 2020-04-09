import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class LI extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  onChangeText = content => {
    if (!this.editing) return
    // log(content, 'content')
    // this.setState({da})
    let { data } = this.state
    this.props.onChangeText(data.index, content)

    let { item = data } = data
    item.content = content
    this.setState({ data: { ...data } })
  }

  render() {
    let { parent } = this.props
    let { data, autoFocus } = this.state
    // log(data, 'data in LI render()')
    // log(autoFocus, 'autoFocus in LI#render')
    let parent_name = parent.constructor.name
    if (!data) return null
    let { item = data, index } = data
    let size =
      rwd(iOS ? (parent.editable ? 6 : 4) : parent.editable ? 5 : 4) / 2
    let listType = (
      <>
        <T.Space size={size} />
        <T.Text
          text={`\u2022`}
          numberOfLines={0}
          style={{
            ...T.TextStyles[iOS ? 'H6' : 'H6'],
            fontSize: iOS ? 8 : 12,
          }}
          // style={T.TextStyles['H9']}
        />
      </>
    )
    log(parent_name, 'parent_name')
    if (parent_name == 'OL') {
      listType = (
        <>
          <T.Space size={size} />
          <T.Text
            text={`${index + 1}.`}
            numberOfLines={0}
            style={{
              ...T.TextStyles[iOS ? 'H6' : 'H6'],
              fontSize: iOS ? 13 : 12,
            }}

            // style={T.TextStyles['H9']}
          />
        </>
      )
    }
    return (
      <T.Row
        flow="row"
        // paddingVertical={rwd(iOS ? 8 : 0)}
        marginTop={rwd(10)}
        paddingHorizontal={rwd(40)}
        // paddingHorizontal={rwd(20)}
      >
        <T.Col
          // borderWidth={1}
          flex={0}
          yAlign="flex-end"
          // padding={rwd(iOS ? 6 : 8)}
          // paddingRight={rwd(0)}
          // borderWidth={1}
        >
          {listType}
        </T.Col>
        <T.Space />
        <T.Col>
          {parent.editable ? (
            <T.RNTextInput
              multiline={true}
              ref={c => (this.input = c)}
              // borderWidth={1}
              // autoFocus={autoFocus}
              // editable={parent.editable}
              onChangeText={this.onChangeText}
              autoFocus={
                parent.isMe() && parent.currentLi == index ? true : false
              }
              value={item.content}
              style={T.TextStyles['H6']}
              padding={rwd(4)}
              // padding={rwd(8)}
              blurOnSubmit={true}
              onSubmitEditing={this.onSubmitEditing}
              // onKeyPress={this.onKeyPress}
              onFocus={parent.onFocus}
            />
          ) : (
            <T.Row>
              <T.Label theme="H6" numberOfLines={0} text={item.content} />
            </T.Row>
          )}
        </T.Col>
      </T.Row>
    )
  }
  onSubmitEditing = e => {
    // alert('onSubmitEditing')
    // this.input.blur()
    let { parent } = this.props
    let { data } = this.state

    let { item = data, index } = data
    parent.newLine(index)
    // return false
  }
  editing = true
  onKeyPress = e => {
    // log(e.nativeEvent, 'e.nativeEvent')
    let { nativeEvent } = e
    switch (nativeEvent.key) {
      case 'Enter':
        this.editing = false
        alert('enter')
        break
      default:
        this.editing = true
        return false
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
    if (prevProps.autoFocus !== this.props.autoFocus)
      this.setState({ autoFocus: this.props.autoFocus })
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
