import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class Tag extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
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
    return <T.Row>{tag}</T.Row>
  }

  updateData = data => {
    log('updateData in Tag')
    // log(data, 'data in Tag00000')
    this.mounted && this.setState({ ...data })
    this.forceUpdate()
    let { parent } = this.props
    parent.updateItem(data)
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
