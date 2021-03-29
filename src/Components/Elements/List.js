log('!!! List#UIKIT')
import React from 'react'
import { FlatList as RNList, View, TextInput, Animated } from 'react-native'
import { Api } from '../../Libraries/Api.js'
import { Label } from '..'
import { Div, Row, Grid, Col, RowLine, Cell, Space, Float, Hr } from '../'
import { Avatar, Image, Icon } from '..'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { SearchBar } from './SearchBar'
export { RNList }

export class List extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onComplete = this.props.onComplete || this.onComplete
  }

  initPage = () => {
    return (this.props.page || 1) - 1
  }

  DefaultState = {
    data: [],
    fadeAnim: new Animated.Value(0),
    prevPage: this.initPage(),
    page: this.initPage(),
    isRefreshing: false,
    lastPage: false,
    meta: null,
    isPageLoading: false,
  }

  state = {
    ...this.DefaultState,
    data: !this.props.url && Dev.seeds ? _.range(100) : [],
    selecteds: [],
    ddd__: Array(15)
      .join()
      .split(',')
      .map((_) => 1),
    url: this.props.url,
    refresh: true,
    pagination: null,
    toTop: false,
  }

  indexChanged = (index, checked) => {
    // log(index, checked, 'index, checked - in indexChanged in List')
    let { data } = this.state
    data.forEach((i) => (i._checked = false))
    data[index]._checked = checked
    this.mounted && this.setState({ data: [...data] })
  }

  itemEvent = {
    onDeleted: (item) => {
      let { data } = this.state
      data.splice(item.index, 1)
      this.setState({ data: [] }, () => {
        this.setState({ data: [...data], extraData: randId() })
      })
      this.reloadData()
    },
    onCreated: (item) => {
      item.animation = window.Effect.zoomOut //'shake'
      item.animation = 'bounceInDown'
      item.animation = 'shake'
      item.animation = true
      let { data } = this.state
      data = [item, ...data]
      this.setState({ data: [] }, () => {
        delayed(() => {
          this.scrollToTop()
        })
        this.setState({ data: [...data], extraData: randId() })
      })
    },
    onUpdated: (item) => {
      let { data } = this.state
      data[item.index] = item.item
      this.setState({
        data: [...data],
        extraData: randId(),
      })
    },
  }

  reloadData = () => {
    this._reload()
  }

  forceUpdate = () => {
    this.forceUpdate()
    _alert('this.flatList.forceUpdate()')
  }

  clearData = (onComplete) => {
    this.mounted &&
      this.setState({ data: [] }, () => {
        onComplete && onComplete()
      })
  }

  onRefresh = () => {
    this.props.onRefresh && this.props.onRefresh()
    this._reload()
  }

  _reload = (onSuccess) => {
    this.mounted &&
      this.setState(
        this.DefaultState,
        () => {
          this.fetchData()
        }
      )
  }

  scrollToTop = (delay = 500) => {
    this.flatList?.scrollToOffset({ offset: 0, animated: true })
    this.mounted && this.setState({ toTop: 0 })
  }

  scrollToBottom = (delay = 500) => {
    this.flatList?.scrollToEnd()
  }

  scrollToIndex = (index) => {
    this.flatList.scrollToIndex({ index: index })
  }

  refresh = () => {
    this.mounted && this.setState({ refresh: !this.state.refresh })
  }

  fetchData = async (onSuccess) => {
    let { prettyPage = true } = this.props
    if(this.state.isPageLoading) {
      return
    } else {
      this.mounted && this.setState({ isPageLoading: true })
    }

    if(this.state.lastPage) {
      return
    }
    let { url, dataPath = 'data' } = this.state
    // log(url, 'url in List#fetchData')
    if(!url) return
    let { meta, pagination } = this.state
    let page = this.state.page + 1
    this.state.page = page

    let urls = url.split('?')

    let { keyword = this.props.keyword } = this.state
    let keywordStr = ''
    if(keyword) {
      window.keyword = keyword
      keywordStr = `keyword=${keyword}`
    } else {
      window.keyword = null
    }

    if(urls.length > 1) {
      if(prettyPage) {
        url = `${urls[0]}/page/${page}?${urls[1]}`
      } else {
        url = `${urls[0]}?${urls[1]}&page=${page}`
      }
      if(keyword) url = `${url}&${keywordStr}`
    } else {
      if(prettyPage) {
        url = `${urls[0]}/page/${page}`
      } else {
        url = `${urls[0]}?page=${page}`
      }
      if(keyword) url = `${url}?${keywordStr}`
    }

    let json
    let { graphql } = this.props
    if(graphql) {
      let key = this.props.url.replace('/', '')
      let res = await Api.graphql({
        query: `{${key} (page: ${page}) ${graphql}}`,
      })
      let { data } = res
      let items = data[key]
      json = { data: items }
    } else {
      json = await Api.get(url, { HttpHeader: this.props.HttpHeader })
    }

    this.props.onLoadedData && this.props.onLoadedData(json)
    let data = getDataByPaths(json, dataPath)
    // log(data, 'data')
    if(!data) data = Array.isArray(json) ? json : []
    let collection = page == 1 ? data : [...this.state.data, ...data]

    let rest = []
    if(page == 1) {
      rest =
        (this.props.onLoad && this.props.onLoad(collection, json)) || collection
      rest = collection
      this.onComplete(rest, json)
    } else {
      rest = collection
    }

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
          // Animated.timing( // performs animation over time
          //   this.state.fadeAnim, // the value of the variable in the animation
          //   {
          //     toValue: 1, // transparency eventually becomes 1, ie completely opaque
          //     Duration: 3000, // let the animation last for a while
          //   }
          // ).start(); // S
        }
      )
    if(onSuccess && typeof onSuccess === 'function') {
      onSuccess(this.state.data)
    }
    this.props.onUpdatedStateData &&
      this.props.onUpdatedStateData(this.state.data, this.state.meta)
  }

  onLoad = () => {
  }

  search = (keyword) => {
    this.searchBar.search(keyword)
  }

  _onScroll = () => {
  }

  renderItem = ({ item }) => (
    <ListItem data={item} navigation={this.props.navigation} />
  )

  onViewableItemsChanged = (info) => {
    let last = _.last(info.viewableItems)
    let first = _.first(info.viewableItems)
    if(last?.index > this.state.data?.length - 6) this.fetchData()
    this.props.onViewableItemsChanged && this.props.onViewableItemsChanged(info)
    runLast(() => {
      this.setState({ scrollToTopButtonVisible: last?.index > (__DEV__ ? 15 : 15) })
    })
  }

  _onBeginDrag = (params) => {
    this.props.onBeginDrag && this.props.onBeginDrag()
  }
  _onDragEnd = (params) => {
  }

  loadPrevPage = () => {
    let { url, prevPage } = this.state
    url = `${url}/page/${prevPage}`
    T.Api.get(url, {}, res => {
      let { data } = res
      let _data = [...data, ...this.state.data]
      log(_data.length, '_data.length')
      this.setState({ data: [] }, () => {
        this.setState({ data: _data, extraData: _data, prevPage: prevPage - 1 })
      })
    })
  }

  render() {
    let { isRefreshing, refresh, data, meta, lastPage, prevPage, url, toTop, scrollToTopButtonVisible, fadeAnim } = this.state
    let { loadingUri = `${AppConfig.web}/img/loading1.gif` } = this.props
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
    let columnWrapperStyle = {}
    if(numColumns > 1)
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

    if(prevPage > 0) {
      ListHeaderComponent = <>{ListHeaderComponent}<T.Center padding={SIZE.s}><T.Label text='載入上一頁' theme='H9' onPress={this.loadPrevPage} /></T.Center></>
    }
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
        {/* <Animated.View // Use a specialized animable View component
          style={{
            // ...this.props.style,
            Opacity: fadeAnim, // specify transparency as the value of the animation variable
          }}> */}
        {data ? (
          <ListTagType
            onDragBegin={(index) => log(index, 'index')}
            onRelease={(index) => log(index, 'index')}
            onScrollBeginDrag={this._onBeginDrag}
            onScrollEndDrag={this._onDragEnd}
            ref={(c) => (this.flatList = c)}
            data={data}
            onScroll={this._onScroll}
            onViewableItemsChanged={this.onViewableItemsChanged}
            refreshing={false}
            onRefresh={this.onRefresh}
            contentContainerStyle={{ padding: padding }}
            numColumns={numColumns}
            contentContainerStyle={{ padding: padding }}
            contentContainerStyle={this.props.contentContainerStyle || { padding: padding }}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.props.renderItem || this.renderItem}
            extraData={data}
            ListHeaderComponent={
              searchable ? (
                <Row flex={1}>
                  <SearchBar
                    style={this.props.searchBarStyle}
                    ref={(c) => (this.searchBar = c)}
                    onChange={(e) => {
                      // log(e, 'e')
                      let { text: keyword } = e.nativeEvent
                      log(keyword, 'keyword in List')
                      keyword = keyword.replace('#', '%23')
                      runLast(() => {
                        this.mounted && this.setState({ keyword })
                        this.reloadData()
                      })
                    }}
                  />
                  {ListHeaderComponentWithMeta}
                </Row>
              ) : (
                ListHeaderComponentWithMeta
              )
            }
            ListFooterComponent={
              <T.Row>
                {ListFooterComponent}
                {!this.props.horizontal ? (
                  <Row marginTop={rwd(0)}>
                    {meta_tag}

                    {this.state.page < 3 ? null : (
                      <Row align="center" paddingTop={rwd(50)}>
                        <Icon
                          iconSet="AntDesign"
                          name="totop"
                          size={rwd(12)}
                          color="rgba(161,157,161,.73)"
                          onPress={() => { this.scrollToTop() }}
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
        {scrollToTopButtonVisible && this.props.scrollToTop ? <T.Float left={SIZE.n} bottom={1.5 * SIZE.l} width='100%' align='center'>
          <T.Icon
            name="top"
            color={BCOLOR}
            backgroundColor={window.Secondary}
            backgroundColor='rgba(126, 134, 145, 0.75)'
            boxShadow={1}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
            size={SIZE.l * 0.8}
            onPress={
              () => {
                delayed(() => (this.setState({ scrollToTopButtonVisible: false })), 100)
                this.scrollToTop()
              }}
          />
        </T.Float> : null}
        {/* </Animated.View> */}
      </Grid>
    )
  }
  onComplete = () => { }
  componentDidMount() {
    this.mounted = true

    let { data, dataPath = 'data', onLoad, pagination = true } = this.props

    if(data) {
      this.mounted && this.setState({ data, dataPath, pagination })
    } else {
      this.mounted && this.setState({ dataPath, pagination })
    }
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data)
      this.setState({ data: [] }, () => {
        this.setState({
          data: { ...this.props.data },
          extraData: { ...this.props.data },
        })
      })
    if(prevProps.onLoad !== this.props.onLoad) this.onLoad = this.props.onLoad
    if(prevProps.url !== this.props.url) {
      // alert('url be updated')
      this.mounted &&
        this.setState(
          {
            url: this.props.url,
          },
          () => {
            this.reloadData()
          }
        )
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }
}

class ListItem extends React.Component {
  render() {
    return <Cell />
  }
}
