import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class ChooseMenu extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data, title, menus } = this.state
    log(data, 'data in ChooseMenu render()')
    if (!menus) return null
    // let { item = data} = data
    let _title = (
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
    )
    let _menu = menus.map((menu, index) => (
      <T.Cell
        key={index}
        flex={0}
        padding={SIZE.m}
        paddingHorizontal={SIZE.s}
        onPress={() => this.onPress(index)}
      >
        {menu}
      </T.Cell>
    ))
    // alert(iPhoneX)
    return (
      <T.FlexModal
        padding={0}
        ref={c => (this.modal = c)}
        backgroundColor={CHOOSEMENU_BACKGROUND}
      >
        {_title}
        {_menu}
        <T.Space size={SAFEAREA_BOTTOM} />
      </T.FlexModal>
    )
  }
  open = options => {
    this.setState({ ...options }, () => {
      this.modal.open()
    })
  }
  close = () => {
    this.modal.close()
  }
  onPress = index => {
    let { onPress } = this.state
    onPress && onPress(index)
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('ChooseMenu')
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
