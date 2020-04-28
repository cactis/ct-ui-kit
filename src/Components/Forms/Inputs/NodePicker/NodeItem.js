import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class NodeItem extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    // log(data, 'data in NodeItem render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row onPress={this.onPress} paddingLeft={SIZE.m}>
        <T.Row
          flow="row"
          backgroundColor_="red"
          // padding={SIZE.m}
          // paddingBottom={0}
          // paddingRight={0}
        >
          <T.Col xAlign="center" paddingVertical={SIZE.s}>
            <T.Label text={item.title} theme="H5" />
          </T.Col>
          <T.Center flex={0}>
            {item?.children?.length > 0 ? null : (
              <T.CheckBox
                ref="checkbox"
                checkedIconName="md-checkbox"
                unCheckedIconName="md-checkbox-outline"
                checked={this.getChecked(item)}
                onChecked={(checked) => {
                  item.checked = checked
                  this.props.onChecked(item)
                }}
                // iconSet="Fontisto"
              />
            )}
          </T.Center>
        </T.Row>
        <T.NodePicker
          data={item.children}
          // onChanged={this.props.onChanged}
          onItemChecked={this.props.onChecked}
          categories={this.props.categories}
        />
      </T.Row>
    )
  }
  getChecked = (item) => {
    let { categories } = this.props
    categories = categories.filter((c) => c.id == item.id)
    if (categories.length == 0) {
      return false
    } else {
      return categories[0].checked
    }
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
      this.refs.checkbox?.toggle()
    } else {
      log('need to set onPress on item')
    }
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
