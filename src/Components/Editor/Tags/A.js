import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class A extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
  }

  componentDidMount() {
    _trace('A')
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
    // log(data, 'data in A render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row padding={rwd(10)}>
        <T.Link
          url={item.href}
          title={item.content}
          rightIcon=<T.Icon
            name="arrow-top-right-bold-outline"
            iconSet="MaterialCommunityIcons"
            color="#ccc"
          />
        />
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
