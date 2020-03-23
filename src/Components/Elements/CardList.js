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
          ref={c => (this.list = c)}
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
  itemEvent = {
    onDeleted: item => {
      // this.flatList._reload()
      // log(item, 'item - in itemDeleted#List')
      let { data } = this.state
      // log(data, 'data - in List#onItemDeleted')
      data.splice(item.index, 1)
      // data = data.filter(d => d.id !== item.id)
      // log(data, 'data - in List#onItemDeleted')
      this.setState({ data: [] }, () => {
        this.setState({ data: [...data], extraData: randId() })
      })
      // this.forceUpdate()
    },
    onCreated: item => {
      // this._reload()
      // return
      // let { item = newItem } = newItem
      log(item, 'item in List#itemEvent#onCreated')
      // // log(item, 'item - in List#itemCreated')
      let { data } = this.state
      data = [item, ...data]
      // // // log(data, 'data - in ')
      // alert('update')
      this.setState({ data: [] }, () => {
        delayed(() => {
          this.scrollToTop()
        })
        this.setState({ data: [...data], extraData: randId() })
      })
      // // this.setState({ data: [...newData] })
      // // log(newData, 'newData - in ')
      // this.flatList.forceUpdate()
      // this.forceUpdate()
    },
    onUpdated: (item, callback) => {
      log(item, 'item - in itemChanged#List')
      let { data } = this.state
      data[item.index] = item.item
      log(data, 'data in onUpdated')
      this.setState({ data: [] }, () => {
        this.setState(
          {
            data: [...data],
            extraData: randId(),
          },
          () => {
            callback && callback()
          }
        )
      })
      // this.forceUpdate()
      // this._reload()
    },
  }

  onSnapToItem = index => {
    log(index, 'index')
    if (index > this.state.data.length - 5) this.fetchData()
    this.props.onScrollTo &&
      this.props.onScrollTo(index, this.state.data[index])
  }

  reloadData = () => {
    this.setState({ page: 0 }, () => this.fetchData())
    this.scrollToTop()
  }
  scrollTo = (index, delay = 500) => {
    // delayed(() => {
    this.list.snapToItem(index, true)
    // }, delay)
  }

  scrollToTop = (delay = 500) => {
    // log('scrollToTop in List')
    // delayed(() => {
    this.list.snapToItem(0, true)
    this.setState({ toTop: 0 })
    // }, delay)
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
