import React from 'react'
import { View, StyleSheet } from 'react-native'

let _navigation
export class Section extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace('Section')
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

  render() {
    let { data } = this.state
    // log(data, 'data in Section render()')
    // if (!data) return null
    // let { item = data } = data
    let { children, marginTop = SIZE.l, ...props } = this.props
    return (
      <View
        marginTop={marginTop}
        borderTopWidth={0.5}
        borderBottomWidth={0.5}
        borderColor="rgba(131,131,131,.51)"
        paddingVertical={rwd(10)}
        marginBottom={rwd(30)}
        // {...props}
      >
        <T.Title title={this.props.title} />
        {children}
      </View>
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
