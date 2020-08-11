import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class ChooseMenu extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data, title, menus } = this.state
    // log(data,  'data in ChooseMenu render()')
    if (!menus) return null
    // let { item = data} = data
    let _title = title ? (
      <T.Cell
        flex={0}
        padding={SIZE.m}
        align="center"
        // backgroundColor="rgba(185,185,185,.85)"
        borderTopWidth={0.5}
        borderColor="rgba(255,255,255,.9)"
      >
        <T.Label text={title} color="#333" theme="H3" />
      </T.Cell>
    ) : null
    let _menu = menus.map((m, index) => (
      <T.Center
        key={index}
        flex={0}
        padding={SIZE.l / 2}
        // height={SIZE.l * 5}
        // paddingHorizontal={SIZE.s}
        // backgroundColor="red"
        // onPress={() => this.onPress(index)}
        // onPress={alert}
        borderBottomWidth={0.3}
        borderColor="rgb(220, 220, 220)"
        onPress={() => {
          // alert()
          this.onPress(index)
        }}
      >
        {m}
      </T.Center>
    ))
    // alert(iPhoneX)
    return (
      <T.FlexModal
        // padding={SIZE.l}
        useNativeDriver={true}
        // padding={0}
        ref={(c) => (this.modal = c)}
        // backgroundColor={CHOOSEMENU_BACKGROUND}

        backgroundColor="transparent"
        // style={{ ...this.props.style, backgroundColor: 'transparent' }}
        // backgroundColor="red"
        __b__
      >
        <T.Row flex={0} margin={SIZE.s}>
          <T.Row
            borderRadius={SIZE.s}
            flex={0}
            backgroundColor="white"
            // padding={SIZE.l}
          >
            {_title}
            <T.Row flex={0} _backgroundColor="#aaa">
              {_menu}
            </T.Row>
          </T.Row>
          <T.Center
            borderRadius={SIZE.s}
            backgroundColor="white"
            flex={0}
            marginTop={SIZE.s}
            padding={SIZE.l / 2}
          >
            <T.Label text="取消" theme="H3" />
          </T.Center>
        </T.Row>
        <T.Space size={SAFEAREA_BOTTOM} />
      </T.FlexModal>
    )
  }
  open = (options) => {
    this.setState({ ...options }, () => {
      this.modal.open()
    })
  }
  close = () => {
    this.modal.close()
  }
  onPress = (index) => {
    // log(index, 'index')
    let { onPress } = this.state
    onPress && onPress(index)
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
