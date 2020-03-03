import React, { PureComponent as Component } from 'react'

import { Tab } from './Tab'
import * as T from '../'

export class Segment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectIndex: 0,
      width: 0,
      userScrolling: false,
    }
    if (this.props.onIndexChanged)
      this.onIndexChanged = this.props.onIndexChanged
  }

  onIndexChanged = () => {}

  tappedAtIndex = index => {
    this.onTappedAt(index)
  }

  scrollToTop = () => {
    this.onTappedAt(this.state.selectIndex)
  }

  onTappedAt = (index, e) => {
    // log(index)
    let _index = index <= 1 ? 0 : index - 1
    this.tabs_scroll.scrollToIndex(_index)
    if (index == this.state.selectIndex) {
      let views = this.props.views
      // log(views, 'views')
      let view = views[index]
      log(view, 'view')
      // log(view.ref, 'view.ref')
      if (view) {
        let list = this.props.parent?.refs[view.ref]
        log(list, 'list')
        list?.scrollToTop && list?.scrollToTop()
        list?.props.scrollToTop && list?.props.scrollToTop()
      }
    } else {
      log('no need to scroll to top')
    }

    this.setState({ selectIndex: index, userScrolling: true }, () => {
      this._scroll.scroll.scrollTo({ x: this.state.width * index, y: 0 })
      this.onIndexChanged(index, e)
      delayed(() => this.setState({ userScrolling: false }))
    })
  }

  _onLayout = e => {
    if (this.state.width == e.nativeEvent.layout.width) return
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }

  THEMES = {
    wrapper: {
      padding: 0,
      paddingVertical: SIZE.l,
    },
    parent: {
      wrapper: {
        // marginTop: rwd(1),
        backgroundColor: SEGMENT_BGCOLOR,
        padding: rwd(1),
        // paddingTop: rwd(1),
      },
      backgroundColor: SEGMENT_BGCOLOR,
    },
    child: {
      // borderColor: G.color.navBar,
      // borderBottomWidth: 5,
      padding: 20,
    },
  }

  _viewsDefault = () => {
    __warning__('GSegment 缺 views 屬性設定 []')
    return [<GPage />, <GPage />]
  }

  componentDidMount() {
    if (!this.props.tabs)
      __warning__('GSegment needs tabs props: [{title: "Tab"}, ...]')
    if (!this.props.views)
      __warning__('GSegment needs views props: [<View/>...]')
  }

  render() {
    if (this.props.__hidden__) return null
    let {
      theme = 'parent',
      tabs = [{ title: 'TAB1' }, { title: 'Tab2' }],
      views = [<T.Grid />, <T.Grid />],
      containerStyle = {},
    } = this.props
    tabs = _.compact(tabs)
    views = _.compact(views)
    let style = this.THEMES[theme]
    let wrapper = style.wrapper
    return (
      <T.Grid
        onLayout={this._onLayout}
        // borderWidth={20}
        paddingVertical={SIZE.n}
      >
        <T.Row flex={0} style={{ ...wrapper }} layout="row">
          <T.List
            // borderWidth={1}
            data={tabs}
            horizontal
            ref={c => (this.tabs_scroll = c)}
            renderItem={({ item, index }) => (
              <Tab
                theme={theme}
                key={index}
                index={index}
                onPress={this.onTappedAt}
                selected={this.state.selectIndex === index}
                tab={item}
                badge={item.badge}
              />
            )}
          />
          {/* {tabs.map((tab, index) => ( */}
          {/* <Tab
                theme={theme}
                key={index}
                index={index}
                onPress={this.onTappedAt}
                selected={this.state.selectIndex === index}
                tab={tab}
                badge={tab.badge}
              /> */}
          {/* ))} */}
          {/* </T.list> */}
        </T.Row>
        <T.Row>
          <T.Scroll
            flex={1}
            // borderWidth={2}
            // borderColor="red"
            scrollEnabled={global.state?.onScrollEndDrag}
            onScroll={this._onScroll}
            scrollEventThrottle={16}
            ref={ref => (this._scroll = ref)}
            pagingEnabled={true}
            horizontal={true}
            vertical={false}
          >
            {views.map((view, index) => (
              <T.View
                style={{ ...containerStyle }}
                key={index}
                width={this.state.width}
              >
                <T.SafeArea>{view}</T.SafeArea>
              </T.View>
            ))}
          </T.Scroll>
        </T.Row>
      </T.Grid>
    )
  }

  _onScroll = e => {
    // log('onScroll in Segment')
    if (this.state.userScrolling) return
    let x = e.nativeEvent.contentOffset.x
    runLast(
      () => {
        let index = Math.floor(x / this.state.width)
        let _index = _.min([_.max([0, index]), this.props.tabs.length - 1])
        this.setState({ selectIndex: _index }, () => {
          index = index <= 1 ? 0 : index - 1
          this.tabs_scroll.scrollToIndex(index)
        })
      },
      300,
      e
    )
  }
}

// export class GSegment extends Segment {}
