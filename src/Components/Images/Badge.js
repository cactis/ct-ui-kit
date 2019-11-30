import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from '../'

let _navigation
export class Badge extends React.PureComponent {
  state = {
    data: null,
  }

  componentDidMount() {
    _trace('Badge')
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.num !== this.props.num) this.setState({ num: this.props.num })
    if (prevProps.badge !== this.props.badge)
      this.setState({ badge: this.props.badge })
  }

  render() {
    // let { data, text, size = 18 } = this.state
    // log(data, 'data in Badge render()')
    // if (!data) return null
    // let { item } = data
    let {
      badge,
      num = badge,
      color = 'white',
      bgColor = '#FF5E5B',
      size = rwd(16),
    } = this.props
    let text = String(num)
    let width = Math.max(size, (size * text.length) / 2)
    return num ? (
      <T.Float
        right={((-1 * text.length) / 2) * 4}
        left="40%"
        // right={0}
        top={0}
        zIndex={10000}
        flex={0}
      >
        <Round
          {...this.props}
          bgColor={bgColor}
          height={size}
          width={width}
          // flex={0}
          // paddingVertical={size * 0.05}
          // paddingHorizontal={rwd(5)}
          align="center"
          // marginLeft={rwd(5)}
        >
          <T.Label size={size * 0.5} theme="H3" color={color} text={text} />
        </Round>
      </T.Float>
    ) : null
  }

  initStateData = onComplete => {
    let { data, text } = this.props
    this.setState({ data, text }, () => {
      onComplete && onComplete()
    })
  }

  autoRun = () => {}
}
var styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FF5E5B',
  },
})

export class Round extends React.PureComponent {
  _onPress = () => {
    this.props.onPress && this.props.onPress()
  }
  render() {
    let { width, height, bgColor = '#EDE5F0' } = this.props
    return (
      <T.Touch onPress={this._onPress} flex={0}>
        <T.Div
          {...this.props}
          flex={0}
          style={{
            borderRadius: height / 2,
            // width: width,
            // height: height,
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
            ...this.props.style,
          }}
        />
      </T.Touch>
    )
  }
}
