import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class UrlsPreview extends React.PureComponent {
state = {
data: null,
}


render() {
let { data } = this.state
log(data, 'data in UrlsPreview render()')
if (!data) return null
let { item = data} = data
let space = item.length == 0 ? null :  <T.Space size={SIZE.s} />
  return <T.Space size={SIZE.n}>{space}{item.length == 1 ? <T.UrlPreviewItem
    itemWidth='100%'
    navigation={_navigation} data={item[0]}
    parent={this}
    // {...this.props}
  /> : (
      <T.List
        {...this.props}
        horizontal
        ref={c => this.list = c}
        data={item}
        // bordered
        // style={{borderWidth: 3}}
        // padding={SIZE.n}
        // contentContainerStyle={{ paddingBottom: SIZE.n  }}
        // columnWrapperStyle={{ border: 1px solid #333, borderWidth: 1}}
        // padding={SIZE.s}
        ItemSeparatorComponent={() => <T.Space backgroundColor__='red' size={SIZE.t} />}
        renderItem={_item => (
          <T.UrlPreviewItem
            itemWidth={item.length > 1 ? SCREEN_WIDTH * (__DEV__ && false ? 0.3 : 0.9) : SCREEN_WIDTH * 0.98}
            navigation={_navigation}

            data={_item}
            parent={this}
          />
        )}
      />
    )}</T.Space>
}
onPress = () => {
if (this.props.onPress){
this.props.onPress()
} else {
log('need to set onPress on item')
}
}

initStateData = onComplete => {
let { data } = this.props
this.mounted && this.setState({ data }, () => {
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
