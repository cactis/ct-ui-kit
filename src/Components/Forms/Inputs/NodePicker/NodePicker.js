import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class NodePicker extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data, url } = this.state
    // log(data, 'data in NodePicker render()')
    // if (!data) return null
    // let { item = data} = data
    let { categories, onChanged } = this.props
    return (
      <>
        {data ? (
          <T.List
            ref={(c) => (this.list = c)}
            data={data}
            renderItem={(item) => (
              <T.NodeItem
                // onChanged={onChanged}
                categories={categories}
                navigation={_navigation}
                onPress={() => navigateToRecord(item, _navigation)}
                data={item}
                parent={this}
                onChecked={this.props.onItemChecked}
              />
            )}
          />
        ) : (
          <T.List
            ref={(c) => (this.list = c)}
            url={url}
            renderItem={(item) => (
              <T.NodeItem
                // onChanged={onChanged}
                categories={categories}
                navigation={_navigation}
                onPress={() => navigateToRecord(item, _navigation)}
                data={item}
                parent={this}
                onChecked={this.props.onItemChecked}
              />
            )}
          />
        )}
        {this.props.submit}
      </>
    )
  }

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = (onComplete) => {
    let { data, url, categories } = this.props
    this.mounted &&
      this.setState({ data, url, categories }, () => {
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
