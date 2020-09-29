import React from 'react'
import { StyleSheet } from 'react-native'
import ModalBox from 'react-native-modalbox'

let _navigation
export class DropdownAlert extends React.PureComponent {
  state = {
    data: null,
    mounted: false,
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

  _onDropdownAlertTapped = () => {}

  open = (content, type, options = {}) => {
    // log(options, 'options')
    // let { title, type = 'success' } = options
    let title, body
    // log(typeof content, '----')
    if (typeof content == 'object') {
      title = content.title
      body = content.body
    } else {
      // log('content is String')
      body = `${content}`
    }
    let { onTapped = () => {}, onClose = () => {} } = options
    this.mounted &&
      this.setState({
        type,
        title,
        body,
        content,
        options,
      })
    // log(this.state, 'this.state')
    this.modal.open()
    delayed(() => {
      this.close()
    }, 5000)
    // log(onTap, 'onTap')
    // log(typeof onTap == 'function')
    this.onTapped = onTapped
  }
  close = () => {
    let { onClose = () => {} } = this.state.options

    this.modal.close()
    onClose()
  }

  render() {
    let { title, body, type } = this.state
    // log(type, 'type')
    let backgroundColor =
      type == 'success' ? DROPDOWNALERT_COLOR : DROPDOWNALERT_COLOR_INFO
    // log(backgroundColor, 'backgroundColor')
    return (
      <ModalBox
        useNativeDriver={true}
        ref={(c) => (this.modal = c)}
        flex={0}
        position="top"
        entry="top"
        backdropOpacity={0.1}
        style={{
          backgroundColor: 'transparent',
          // marginTop: -1 * (iOS ? 0 : STATUSBAR_HEIGHT),
          paddingHorizontal: SIZE.l,
          paddingTop: SAFEAREA_TOP + SIZE.s,
          // flex: 0,
          height: 'auto',
        }}
        onPress={() => {
          // this._onDropdownAlertTapped()
          // this.modal.close()
          this.onTapped()
          this.close()
        }}
      >
        <T.Grid
          // margin={rwd(20)}
          flex={0}
          paddingLeft={SIZE.s}
          paddingVertical={SIZE.m}
          paddingRight={SIZE.n}
          width={SCREEN_WIDTH - SIZE.l * 2}
          flow="row"
          style={{
            borderRadius: SIZE.m,
            backgroundColor: backgroundColor,
          }}
          activeOpacity={1}
          onPress={() => {
            // this._onDropdownAlertTapped()
            // this.modal.close()
            this.onTapped()
            this.close()
          }}
        >
          <T.Center flex={0}>
            <T.Icon
              size={rwd(25)}
              name="day-sunny"
              color="#efefef"
              iconSet="Fontisto"
            />
          </T.Center>
          <T.Col xAlign="center">
            <T.Label
              color="#fff"
              text={title}
              text_="title"
              // theme="H5"
              numberOfLines={2}
              onPress={() => {
                // this._onDropdownAlertTapped()
                // this.modal.close()
                this.onTapped()
                this.close()
              }}
            />
            <T.Space>
              <T.Text
                color="#fff"
                text={body}
                text_="body"
                numberOfLines={5}
                onPress={() => {
                  // this._onDropdownAlertTapped()
                  // this.modal.close()
                  this.onTapped()
                  this.close()
                }}
              />
            </T.Space>
          </T.Col>
          {this.state?.options?.onTapped ? (
            <T.Center flex={0} paddingHorizontal={SIZE.m} align="center">
              <T.Touch
                onPress={() => {
                  // this._onDropdownAlertTapped()
                  // this.modal.close()
                  this.onTapped()
                  this.close()
                }}
              >
                <T.Icon
                  size={SIZE.m}
                  color="white"
                  name="righarrow"
                  onPress={() => {
                    // this._onDropdownAlertTapped()
                    // this.modal.close()
                    this.onTapped()
                    this.close()
                  }}
                />
              </T.Touch>
            </T.Center>
          ) : null}
        </T.Grid>
      </ModalBox>
    )
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
