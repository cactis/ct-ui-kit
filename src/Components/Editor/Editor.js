import React from 'react'
import { StyleSheet } from 'react-native'
import { KeyboardAware } from '../Keyboard'
let _navigation
let _PADDING_BOTTOM = SAFEAREA_BOTTOM //0 //rwd(30)
export class Editor extends KeyboardAware {
  constructor(props) {
    super(props)
    // this.onKeyboardChanged = this.onKeyboardChanged.bind(this)
  }

  state = {
    data: null,
    mounted: false,
    paddingBottom: _PADDING_BOTTOM,
  }

  onKeyboardChanged = height => {
    // alert(height)
    // this.attachKeyBoard()
    this.mounted && this.setState({ paddingBottom: height + _PADDING_BOTTOM })
    this.forceUpdate()
  }

  save = () => {
    this.props.onSave(this.state.data)
  }

  onDragEnd = params => {
    log(params, 'params 3333')
    let { data } = params
    this.setState({ data: [] }, () => {
      this.mounted && this.setState({ data: [...data] })
    })
  }

  render() {
    let { data, paddingBottom } = this.state
    // log(data, 'data in Editor render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.Screen
        padding={0}
        borderWidth_={1}
        marginBottom={paddingBottom}
        // paddingBottom={200}
      >
        <R.Toolbar
          borderWidth_={1}
          marginTop={iOS ? 0 : rwd(10)}
          flex={0}
          // borderBottomWidth={1}
          align="flex-start"
          // marginRight={rwd(60)}
          // marginTop={rwd(-48)}
        >
          <T.Button
            name="save"
            title="Share Now"
            borderWidth={0.5}
            onPress={this.save}
          />
        </R.Toolbar>
        <T.List
          // flex={1}
          draggable={true}
          ref={c => (this.list = c)}
          // keyExtractor={(item, index) => `draggable-item-${item.key}`}
          data={data}
          // extraData={data}
          onDragEnd={this.onDragEnd}
          renderItem={item => (
            <T.Touch
              onLongPress={item.drag}
              style={{
                borderWidth: 1,
                borderColor: item.isActive ? '#aaa' : 'transparent',
              }}
            >
              <T.Tag
                // key={item}
                placeholder={this.props.placeholder}
                data={item}
                onRemoveItem={index => {
                  let { data } = this.state
                  data.splice(index, 1)
                  this.setState({ data: [] }, () => {
                    this.setState({ data: [...data] })
                  })
                }}
                parent={this}
                onEnter={this.onEnter}
              />
            </T.Touch>
          )}
          ListFooterComponent1__=<T.Space size={200} />
        />
        {/* <T.Space size={paddingBottom} /> */}
      </T.Screen>
    )
  }

  insertItem = index => {
    let item = {
      tag: 'p',
    }
    window.currentIndex = index
    log(window.currentIndex, 'window.currentIndex in Edtor#insertItem')
    // log(item, 'item')
    let { data } = this.state
    this.mounted &&
      this.setState({ data: [] }, () => {
        this.mounted && this.setState({ data: _.insert(data, index, item) })
      })
    // wi / ndow.keyboardToolbar.open(<T.TagsToolbar />, { modalHeight: rwd(50) })
    delayed(() => {
      this.attachKeyBoard()
    })
    // this.setState({ data: [...data] })
    // this.forceUpdate()
    // this.list.reloadData()
  }

  attachKeyBoard = () => {
    window.keyboardToolbar.open(<T.TagsToolbar />, {
      // modalHeight: rwd(50),
    })
    // window.keyboardToolbar.open(null, { modalHeight: 100 })
  }

  updateItem = item => {
    log(item, 'item in Editor#updateItem')
    let { data } = this.state
    // _log(data, 'data1111')
    data[item.index] = item.item
    // _log(data, 'data2222')
    // alert(item.item.tag)
    this.mounted && this.setState({ data: [...data] })
  }

  onEnter = () => {
    alert('enter')
  }

  initStateData = onComplete => {
    let { data } = this.props
    // log(data, 'data')
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }

  componentDidMount() {
    _trace('Editor')
    this.mounted = true
    _navigation = this.props.navigation
    this.initStateData(() => {
      this.autoRun()
      this.attachKeyBoard()
    })
    window.editor = this
    // window.currentIndex = __DEV__ ? 1 : 0
    window.currentIndex = 0
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {
    _autoRun(
      'insertPhoto',
      () => {
        delayed(() => {
          // window.tag?.setTag('img')
        })
      },
      3000
    )
  }
}
var styles = StyleSheet.create({})
