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
    _trace('DropdownAlert')
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

  open = (content, onTap = () => {}, options = {}) => {
    // log(options, 'options')
    let { title } = options
    this.mounted &&
      this.setState({
        title,
        content,
      })
    // log(this.state, 'this.state')
    this.modal.open()
    log(onTap, 'onTap')
    log(typeof onTap == 'function')
    if (typeof onTap == 'function') this._onDropdownAlertTapped = onTap
  }
  close = () => {
    this.modal.close()
  }

  render() {
    let { title, content } = this.state
    return (
      <ModalBox
        ref={c => (this.modal = c)}
        flex={0}
        position="top"
        entry="top"
        backdropOpacity={0.1}
        style={{
          backgroundColor: 'transparent',
          // marginTop: -1 * (iOS ? 0 : STATUSBAR_HEIGHT),
          paddingHorizontal: rwd(20),
          paddingTop: SAFEAREA_TOP + rwd(10),
          // flex: 0,
          height: 'auto',
        }}
      >
        <T.Grid
          // margin={rwd(20)}
          flex={0}
          paddingHorizontal={rwd(15)}
          paddingVertical={rwd(15)}
          width={SCREEN_WIDTH - rwd(30) * 2}
          flow="row"
          style={{
            borderRadius: rwd(40),
            backgroundColor: DROPDOWNALERT_COLOR,
          }}
          activeOpacity={1}
          onPress={() => {
            this._onDropdownAlertTapped()
            this.modal.close()
          }}
        >
          <T.Center flex={0}>
            <T.Icon
              size={rwd(30)}
              name="sun"
              color="#efefef"
              iconSet="Feather"
            />
          </T.Center>
          <T.Space />
          <T.Col xAlign="center">
            <T.Label color="#fff" text={title} theme="H2" />
            <T.Text color="#fff" text={content} numberOfLines={0} />
          </T.Col>
        </T.Grid>
      </ModalBox>
    )
  }

  initStateData = onComplete => {
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
