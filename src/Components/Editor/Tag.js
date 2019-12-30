import React from 'react'
import { StyleSheet, Animated } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

let _navigation
export class Tag extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  render() {
    let { data } = this.state
    // _log(data, 'data in Tag render()')
    if (!data) return null
    let tag = null
    switch (data.item.tag) {
      case 'img':
        tag = <T.IMG data={data} parent={this} />
        break
      // case 'a':
      //   tag = <T.A data={data} parent={this} />
      //   break
      case 'hr':
        tag = <T.HR data={data} parent={this} />
        break
      case 'ol':
        tag = <T.OL data={data} parent={this} />
        break
      case 'ul':
        tag = <T.UL data={data} parent={this} />
        break
      case 'caption':
        tag = <T.Caption data={data} parent={this} />
      default:
        tag = (
          <T.P data={data} parent={this} placeholder={this.props.placeholder} />
        )
    }
    // log(tag, 'tag')
    return (
      // <Swipeable ref="swipeable" renderRightActions={this.renderRightActions}>
      <T.Row flow="row" backgroundColor="white">
        <T.Col flex={0} xAlign="center" yAlign="center">
          <T.Icon
            // style={styles.leftAction}
            onPressIn={() => {
              // alert()
              // log(data, 'data')
              this.props.onRemoveItem(data.index)
            }}
            color="#F7A7A7"
            name="close"
            iconSet="EvilIcons"
          />
        </T.Col>
        <T.Col>{tag}</T.Col>
        <T.Center flex={0}>
          <T.Icon name="navicon" iconSet="Evil" color="#999" />
        </T.Center>
      </T.Row>
      // </Swipeable>
    )
  }

  updateData = data => {
    log('updateData in Tag')
    // log(data, 'data in Tag00000')
    this.mounted && this.setState({ ...data })
    this.forceUpdate()
    let { parent } = this.props
    parent.updateItem(data)
  }

  renderRightActions = (progress, dragX) => {
    let { data } = this.state

    let { item = data } = data
    const trans = dragX.interpolate({
      inputRange: [(-1 * SCREEN_WIDTH) / 2, -100, 0, 100, 101],
      outputRange: [SCREEN_WIDTH / 2, 0, 1, 0, 0],
      // inputRange: [(-1 * SCREEN_WIDTH) / 2, -100, 0, 200, 201],
      // outputRange: [SCREEN_WIDTH / 2, 0, 1, 0, 0],
      // inputRange: [0, 250],
      // outputRange: [250, 0],
      // extrapolate: 'clamp',
      inputRange: [0, 1, 1],
      outputRange: [0, 300, 1],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          // styles.actionText,
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <T.Center
          flow="row"
          // paddingHorizontal={rwd(20)}
          backgroundColor="rgba(249,184,73,.91)"
        >
          <T.Icon
            // style={styles.leftAction}
            onPress={() => {
              alert()
              log(data, 'data')
              // this.props.onRemoveItem(data.index)
            }}
            color="#888"
            name="trash"
            iconSet="Feather"
          />
        </T.Center>
      </Animated.View>
    )
  }

  swipeLeft = () => {
    this.refs.swipeable.openRight()
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentDidMount() {
    _trace('Tag')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation

    // if (prevProps.data !== this.props.data)
    //   this.setState({ data: { ...this.props.data } })
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
