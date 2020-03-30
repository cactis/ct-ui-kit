import React from 'react'
import { StyleSheet } from 'react-native'
import { StackActions } from 'react-navigation'

let _navigation
export class Full extends React.PureComponent {
  state = {
    data: null,
  }

  componentDidMount() {
    _trace('Full')
    _navigation = this.props.navigation
    // log(_navigation, '_navigation 0000000')
    this.initStateData(() => {
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  render() {
    let {
      color = 'rgba(255,255,255,.77)',
      title,
      button,
      children,
      ...props
    } = this.props
    // let { data } = this.state
    // log(data, 'data in Full render()')
    // if (!data) return null
    // let { item } = data
    // alert(STATUSBAR_HEIGHT)
    return (
      <T.Grid {...props}>
        {children}
        <T.Float
          top={SAFEAREA_TOP + STATUSBAR_HEIGHT}
          flow="row"
          zIndex={10000}
          padding={rwd(iOS ? (iPhoneX ? 0 : rwd(10)) : 0)}
        >
          <T.Col flex={0} width={rwd(iOS ? 50 : 50)} align="center">
            {iOS ? (
              button || <T.Space size={rwd(20)} />
            ) : (
              <T.Icon
                color={color}
                name="chevron-down"
                iconSet="Entypo"
                onPress={this.close}
                size={rwd(30)}
              />
            )}
          </T.Col>
          <T.Space size={rwd(0)} />
          <T.Col
            align="center"
            borderRadius={rwd(5)}
            backgroundColor={title ? 'rgba(255,255,255,.78)' : 'transparent'}
          >
            <T.Label theme="H5" text={title} />
          </T.Col>
          <T.Space size={rwd(0)} />
          <T.Col flex={0} width={rwd(iOS ? 50 : 50)} align="center">
            {!iOS ? (
              button || <T.Space size={rwd(20)} />
            ) : (
              <T.Icon
                color={color}
                name="chevron-down"
                iconSet="Entypo"
                onPress={this.close}
                size={rwd(30)}
              />
            )}
          </T.Col>
        </T.Float>
      </T.Grid>
    )
  }

  close = () => {
    // log(this.props.navigation, '111')
    // log(_navigation, '222')
    let { onClose } = this.props
    if (onClose) {
      onClose()
    } else {
      _navigation.goBack()
    }
  }

  initStateData = onComplete => {
    let { data } = this.props
    this.setState({ data }, () => {
      onComplete && onComplete()
    })
  }

  autoRun = () => {}
}
var styles = StyleSheet.create({})
