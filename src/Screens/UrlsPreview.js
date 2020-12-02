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

return item.length == 1 ? <T.UrlPreviewItem 
itemWidth='100%'
navigation={_navigation} data={item[0]}
parent={this}
/> : (
  <T.List
    horizontal
ref={c => this.list = c}
    data={item}
      // bordered
      // style={{borderWidth: 3}}
      // padding={SIZE.n}
      contentContainerStyle={{paddingBottom: SIZE.s}}
    // columnWrapperStyle={{ border: 1px solid #333, borderWidth: 1}}
    // padding={SIZE.s}
    ItemSeparatorComponent={()=><T.Space  backgroundColor__='red'/>}
renderItem={_item => (
  <T.UrlPreviewItem 
    itemWidth={item.length > 1 ? SCREEN_WIDTH* (__DEV__ && false ? 0.3 : 0.85) : SCREEN_WIDTH * 0.98}
navigation={_navigation}

data={_item}
parent={this}
/>
)}
/>
)
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
