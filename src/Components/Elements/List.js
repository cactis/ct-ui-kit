import React from 'react'
import { FlatList as RNList, View, TextInput } from 'react-native'
import { Api } from '../../Libraries/Api.js'
import { Label } from '..'
import { Div, Row, Grid, Col, RowLine, Cell, Space, Float, Hr } from '../'
import { Avatar, Image, Icon } from '..'
import DraggableFlatList from 'react-native-draggable-flatlist'

export { RNList }

export class List extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onComplete = this.props.onComplete || this.onComplete
  }
  state = {
    data: !this.props.url && Dev.seeds ? _.range(100) : null,
    selecteds: [],
    ddd__: Array(15)
      .join()
      .split(',')
      .map(_ => 1),
    url: this.props.url,
    refresh: true,
    page: 0,
    isRefreshing: false,
    lastPage: false,
    pagination: null,
    toTop: false,
  }

  indexChanged = (index, checked) => {
    // log(index, checked, 'index, checked - in indexChanged in List')
    let { data } = this.state
    data.forEach(i => (i._checked = false))
    data[index]._checked = checked
    this.mounted && this.setState({ data: [...data] })
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
      this.mounted && this.setState({ data: [...data] })
      this.forceUpdate()
    },
    onCreated: (item, that) => {
      this._reload()
      return
      // let { item = newItem } = newItem
      // log(item, 'item')
      // // log(item, 'item - in List#itemCreated')
      let { data } = this.state
      data = [item, ...data]
      // // // log(data, 'data - in ')
      // alert('update')
      this.mounted && this.setState({ data: [...data] })
      // // this.setState({ data: [...newData] })
      // // log(newData, 'newData - in ')
      // this.flatList.forceUpdate()
      // that.forceUpdate()
    },
    onUpdated: item => {
      // log(item, 'item - in itemChanged#List')
      // let { data } = this.state
      // data[item.index] = item.item
      // log(data, 'data')
      // this.setState({
      //   data: [...data],
      //   extraData: randId()
      // })
      // this.forceUpdate()
      this._reload()
    },
  }

  reloadData = () => {
    // log('reloadData in List')
    this._reload()
  }

  clearData = onComplete => {
    this.mounted &&
      this.setState({ data: [] }, () => {
        onComplete && onComplete()
      })
  }

  _reload = onSuccess => {
    // log('_reload in List')
    this.mounted &&
      this.setState(
        {
          data: [],
          page: 0,
          meta: null,
          lastPage: false,
          isRefreshing: false,
          isPageLoading: false,
        },
        () => {
          this.fetchData()
        }
      )
  }

  scrollToTop = (delay = 500) => {
    // log('scrollToTop in List')
    // delayed(() => {
    this.flatList.scrollToOffset({ offset: 0, animated: true })
    this.mounted && this.setState({ toTop: 0 })
    // }, delay)
  }

  scrollToIndex = index => {
    // alert(index)
    this.flatList.scrollToIndex({ index: index })
  }

  refresh = () => {
    this.mounted && this.setState({ refresh: !this.state.refresh })
  }

  fetchData = async onSuccess => {
    // log('fetchData')
    if (this.state.isPageLoading) {
      // log('isPageLoading')
      return
    } else {
      // log('not isPageLoading')
      this.mounted && this.setState({ isPageLoading: true })
    }

    // log(this.state.lastPage, 'lastPage')
    if (this.state.lastPage) {
      // log('已是最後一頁。')
      return
    }
    // let url = this.state.url
    let { url, dataPath = 'data' } = this.state
    // log(url, 'url in List')
    if (!url) return
    let { meta, pagination } = this.state
    let page = this.state.page + 1
    this.state.page = page

    let urls = url.split('?')

    let { keyword } = this.state
    let keywordStr = ''
    if (keyword) {
      window.keyword = keyword
      keywordStr = `keyword=${keyword}`
    } else {
      window.keyword = null
    }

    if (urls.length > 1) {
      url = `${urls[0]}/page/${page}?${urls[1]}`
      // url = `${urls[0]}/?page=${page}&${urls[1]}`
      if (keyword) url = `${url}&${keywordStr}`
    } else {
      url = `${urls[0]}/page/${page}`
      // url = `${urls[0]}?page=${page}`
      if (keyword) url = `${url}?${keywordStr}`
    }
    // if (!pagination) url = url.split('/page')[0]

    let json
    let { graphql } = this.props
    if (graphql) {
      // log(this.props.url, 'this.props.url')
      let key = this.props.url.replace('/', '')
      log(key, 'key')
      let res = await Api.graphql({
        query: `{${key} (page: ${page}) ${graphql}}`,
      })
      // log(res, 'res')
      let { data } = res
      let items = data[key]
      json = { data: items }
      // log(json, 'json')
    } else {
      json = await Api.get(url)
    }

    // log(json, 'json in List')
    this.props.onLoadedData && this.props.onLoadedData(json)
    let data = getDataByPaths(json, dataPath)

    if (!data) data = Array.isArray(json) ? json : []
    let collection = page == 1 ? data : [...this.state.data, ...data]

    let rest = []
    if (page == 1) {
      // log(page, 'page')
      // this.onLoad && this.onLoad()
      // rest = this.onLoad(collection, json) || collection
      rest =
        (this.props.onLoad && this.props.onLoad(collection, json)) || collection
      rest = collection
      this.onComplete(rest, json)
    } else {
      rest = collection
    }
    // log(data, page, 'data, page - in List# before setState')

    this.mounted &&
      this.setState(
        {
          data: [...rest],
          meta: json.meta,
          isRefreshing: false,
          isPageLoading: false,
          lastPage:
            data.length == 0 || (data.mata && data.meta.nextPage == null),
          toTop: page > 5,
        },
        () => {
          // log(this.state.data, 'this.state.data')
        }
      )
    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(this.state.data)
    }
    this.props.onUpdatedStateData &&
      this.props.onUpdatedStateData(this.state.data, this.state.meta)
  }

  onLoad = () => {
    // log('onLoad is not assigned')
  }

  _onScroll = () => {}

  renderItem = ({ item }) => (
    <ListItem data={item} navigation={this.props.navigation} />
  )

  onViewableItemsChanged = info => {
    // log(info, 'info in List onViewableItemsChanged()')
    let last = _.last(info.viewableItems)
    let first = _.first(info.viewableItems)
    // log(first?.index, 'first?.index')
    if (last?.index > this.state.data?.length - 6) this.fetchData()
    this.props.onViewableItemsChanged && this.props.onViewableItemsChanged(info)
  }

  // _onDragEnd = params => {
  //   // log(params, 'params')
  //   let { data } = params
  //   let { onDragEnd } = this.props
  //   onDragEnd && onDragEnd(params)
  //   // this.setState({ data: [] }, () => {
  //   //   // this.setState({ data: [...data], refresh: !this.state.refresh })
  //   // })
  // }

  render() {
    let { isRefreshing, refresh, data, meta, lastPage, url, toTop } = this.state
    let { loadingUri = `${AppConfig.web}/img/loading1.gif` } = this.props
    // _log(loadingUri, 'loadingUri')
    // if (!data) return null
    let {
      numColumns = 1,
      padding = 0,
      gutter = 0,
      ListHeaderComponent,
      ListFooterComponent,
      draggable,
      searchable = false,
      ...extra
    } = this.props
    // log(numColumns, 'numColumns in List render')
    let columnWrapperStyle = {}
    if (numColumns > 1)
      columnWrapperStyle['columnWrapperStyle'] = {
        flext: 1,
        alignItems: 'center',
      }
    let meta_tag =
      meta && meta.total_pages > 1 ? (
        <Row align="flex-end" padding={rwd(10)}>
          <Label
            theme="H9"
            text={`${meta.current_page.asCurrency()} / ${meta.total_pages.asCurrency()} pages, ${meta.total_count.asCurrency()} items`}
          />
        </Row>
      ) : null

    let ListHeaderComponentWithMeta = meta ? (
      <Grid>
        {ListHeaderComponent}
        {meta_tag}
      </Grid>
    ) : (
      ListHeaderComponent
    )
    let ListTagType = draggable ? DraggableFlatList : RNList
    return (
      <Grid>
        {data ? (
          <ListTagType
            // key={`randId()`}
            // listKey={`randId()`}
            // keyExtractor={(item, index) => index.toString()}
            onDragBegin={index => log(index, 'index')}
            onRelease={index => log(index, 'index')}
            // onDragEnd={this._onDragEnd}
            ref={c => (this.flatList = c)}
            data={data}
            onScroll={this._onScroll}
            onViewableItemsChanged={this.onViewableItemsChanged}
            // refreshing={isRefreshing}
            refreshing={false}
            onRefresh={this._reload}
            // onEndReached={this.fetchData}
            // onEndThreshold={500}
            // numColumns={data.length > 1 ? numColumns : 1}
            // contentContainerStyle={{ margin: 4 }}
            numColumns={numColumns}
            // horizontal={false}
            // columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
            contentContainerStyle={{ padding: padding }}
            keyExtractor={(item, index) => String(index)}
            // ItemSeparatorComponent={() => <Space size={20} />}
            // nestedScrollEnabled
            // pagingEnabled
            // onPanResponderTerminationRequest={() => false}
            // horizontal
            renderItem={this.props.renderItem || this.renderItem}
            // extraData={this.props.data}
            // extraData={this.state.refresh}
            // extraData={this.state}
            extraData={data}
            // key={data ? data.length : randId()}
            ListHeaderComponent={
              searchable ? (
                <Div>
                  <SearchBar
                    onChange={e => {
                      let keyword = e.nativeEvent.text
                      log(keyword, 'keyword')
                      runLast(() => {
                        this.mounted && this.setState({ keyword })
                        this.reloadData()
                      })
                    }}
                  />
                  {ListHeaderComponentWithMeta}
                </Div>
              ) : (
                ListHeaderComponentWithMeta
              )
            }
            // ListHeaderComponent=<SearchBar />
            ListFooterComponent={
              <T.Row>
                {ListFooterComponent}
                {!this.props.horizontal ? (
                  <Row marginTop={rwd(0)}>
                    {meta_tag}
                    {/* {lastPage || this.props.quoteable ? (
                                        <Row paddingTop={rwd(50)}>
                                            <T.Quote
                                                paddable={true}
                                                navigation={
                                                    this.props.navigation
                                                }
                                            />
                                        </Row>
                                    ) : null} */}
                    {this.state.page < 3 ? null : (
                      <Row align="center" paddingTop={rwd(50)}>
                        <Icon
                          iconSet="AntDesign"
                          name="totop"
                          size={rwd(12)}
                          color="rgba(161,157,161,.73)"
                          onPress={() => this.scrollToTop()}
                        />
                      </Row>
                    )}
                    {url && !lastPage && this.state.isPageLoading ? (
                      <Row align="center" paddingTop={rwd(50)}>
                        <Image
                          size={20}
                          uri={loadingUri}
                          color="rgba(232,230,236,.76)"
                        />
                      </Row>
                    ) : null}
                  </Row>
                ) : null}
              </T.Row>
            }
            {...extra}
          />
        ) : null}
      </Grid>
    )
  }
  onComplete = () => {}
  componentDidMount() {
    this.mounted = true

    let { data, dataPath = 'data', onLoad, pagination = true } = this.props

    if (data) {
      this.mounted && this.setState({ data, dataPath, pagination })
    } else {
      this.mounted && this.setState({ dataPath, pagination })
    }
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    // log('List#componentDidUpdate')
    if (prevProps.data !== this.props.data)
      this.setState({ data: [] }, () => {
        this.setState({
          data: { ...this.props.data },
          extraData: { ...this.props.data },
        })
      })
    if (prevProps.onLoad !== this.props.onLoad) this.onLoad = this.props.onLoad
    // log('componentDidUpdate')
    // log(prevProps.url, 'prevProps.url')
    // log(this.props.url, 'this.props.url')
    // log(prevProps.url !== this.props.url, 'prevProps.url !== this.props.url')
    if (prevProps.url !== this.props.url) {
      // log(this.props.url, 'url changed')
      this.mounted &&
        this.setState(
          {
            // page: 0,
            // data: [],
            // meta: null,
            // isRefreshing: true,
            url: this.props.url,
            // lastPage: false,
            // isPageLoading: false,
          },
          () => {
            this.reloadData()
          }
        )
      // this.fetchData()
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.data !== this.props.data)
  //     this.setState({ data: this.props.data })
  //   if (prevProps.url !== this.props.url) this.setState({ url: this.props.url })
  // }

  componentWillUnmount() {
    this.mounted = false
  }
}

class SearchBar extends React.PureComponent {
  render() {
    return (
      <Row padding={rwd(5)} backgroundColor="rgb(255,255,255)">
        <Row
          borderRadius={rwd(3)}
          paddingVertical={rwd(5)}
          paddingHorizontal={rwd(10)}
          backgroundColor="rgb(242,240,240)"
        >
          <TextInput
            placeholder="type keyword to search..."
            padding={rwd(4)}
            clearButtonMode="always"
            autoCapitalize="none"
            onChange={this.props.onChange}
          />
        </Row>
      </Row>
    )
  }
}

class ListItem extends React.Component {
  render() {
    return <Cell />
  }
}
