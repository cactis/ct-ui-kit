import React from 'react'
import { StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'

let _navigation
export class CardList extends React.PureComponent {
  state = {
    data: [1, 2, 3],
    page: 0,
  }

  render() {
    let { data, url } = this.state
    log(data, 'data in CardList render()')
    // if (!data) return null
    // let { item = data} = data
    let {
      sliderWidth = SCREEN_WIDTH * 0.9,
      itemWidth = SCREEN_WIDTH * 0.8,
      renderItem = this._renderItem,
    } = this.props
    return (
      <T.Center>
        <Carousel
          url={url}
          onSnapToItem={this.onSnapToItem}
          // borderWidth={1}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          extraData={data}
          data={data}
          onPress={this.onPress}
          renderItem={renderItem}
        />
      </T.Center>
    )
  }

  onSnapToItem = index => {
    log(index, 'index')
    if (index > this.state.data.length - 5) this.fetchData()
    this.props.onScrollTo &&
      this.props.onScrollTo(index, this.state.data[index])
  }
  loading = false

  fetchData = () => {
    if (this.loading) return
    // runLast(() => {

    this.loading = true
    let { page, url, keyword } = this.state
    page = page + 1
    url = `${url}/page/${page}`
    if (keyword) url = `${url}?keyword=${keyword}`
    log(url, 'url')
    T.Api.get(url, {}, res => {
      this.loading = false
      let { data } = res
      if (page == 1) {
        this.props.onIntialData(1, data[0])
        this.setState({ data: [] }, () => {
          this.setState({ data, page })
        })
      } else {
        this.setState({ data: [...this.state.data, ...data], page })
      }
      // })
    })
  }
  _renderItem = item => (
    <T.Row flex={0}>
      <T.Image />
      <T.Label text={item.index} />
    </T.Row>
  )
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = onComplete => {
    let { data, url } = this.props
    this.mounted &&
      this.setState({ data, url }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('CardList')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
      this.fetchData()
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
    if (prevProps.url !== this.props.url) this.setState({ url: this.rpops.url })
    if (prevProps.keyword !== this.props.keyword) {
      this.setState({ keyword: this.props.keyword, data: [], page: 0 }, () => {
        this.fetchData()
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
