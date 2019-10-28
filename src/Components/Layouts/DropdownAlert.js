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
    log(options, 'options')
    let { title } = options
    this.mounted &&
      this.setState({
        title,
        content,
      })
    log(this.state, 'this.state')
    this.modal.open()
    this._onDropdownAlertTapped = onTap
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
          backgroundColor: 'rgba(0,140,195,1)',
          // marginTop: -1 * (iOS ? 0 : STATUSBAR_HEIGHT),
          paddingTop: SAFEAREA_TOP,
          // flex: 0,
          height: 'auto',
        }}
      >
        <T.Grid
          flex={0}
          padding={rwd(10)}
          paddingVertical={rwd(20)}
          width={SCREEN_WIDTH}
          flow="row"
          onPress={() => {
            this._onDropdownAlertTapped()
            this.modal.close()
          }}
        >
          <T.Center flex={0}>
            <T.Icon
              size={rwd(30)}
              name="infocirlceo"
              color="#efefef"
              iconSet="AntDesign"
            />
          </T.Center>
          <T.Space />
          <T.Col xAlign="center">
            <T.Label color="#efefef" text={title} theme="H2" />
            <T.Text color="#efefef" text={content} numberOfLines={0} />
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
