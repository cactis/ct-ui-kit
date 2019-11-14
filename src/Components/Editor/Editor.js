import React from 'react'
import { StyleSheet } from 'react-native'
import { KeyboardAware } from '../Keyboard'
let _navigation
let _PADDING_BOTTOM = rwd(30)
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

  attachKeyBoard = () => {
    window.keyboardToolbar.open(<T.TagsToolbar />, {
      modalHeight: rwd(50),
    })
    // window.keyboardToolbar.open(null, { modalHeight: 100 })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  onKeyboardChanged = height => {
    // alert(height)
    // this.attachKeyBoard()
    this.mounted && this.setState({ paddingBottom: height + _PADDING_BOTTOM })
  }

  save = () => {
    this.props.onSave(this.state.data)
  }

  render() {
    let { data, paddingBottom } = this.state
    // log(data, 'data in Editor render()')
    // if (!data) return null
    // let { item = data } = data
    return (
      <T.Screen padding={0} borderWidth_={1} paddingBottom={paddingBottom}>
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
            title="Save"
            borderWidth={0.5}
            onPress={this.save}
          />
        </R.Toolbar>
        <T.List
          // flex={1}
          ref={c => (this.list = c)}
          data={data}
          renderItem={item => (
            <T.Tag
              // key={item}
              data={item}
              parent={this}
              onEnter={this.onEnter}
            />
          )}
        />
        {/* <T.Space size={SCREEN_HEIGHT / 2} /> */}
      </T.Screen>
    )
  }

  insertItem = index => {
    // log(index, 'index')
    // let { data } = this.state
    //
    // log(data.length, 'data.length')
    // _log(data, 'data')
    let item = {
      tag: 'p',
      // content: `${randId()}`,
    }
    window.currentIndex = index
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
