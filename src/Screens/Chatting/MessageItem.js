import React from 'react'
import { StyleSheet } from 'react-native'

let _navigation
export class MessageItem extends React.PureComponent {
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

  render() {
    let { data, url } = this.state
    // log(data, 'data in MessageItem render()')
    if (!data) return null
    let { item = data } = data
    if (!item.id) return <T.Div />
    if (item.editing)
      return (
        <T.Animatable.View ref={(c) => (this.animator = c)}>
          <T.MessageForm
            data={data}
            onUpdate={this.onUpdate}
            onCancel={this.onCancel}
          />
        </T.Animatable.View>
      )
    return (
      <T.Animatable.View ref={(c) => (this.animator = c)}>
        <T.Row flow="row" padding={rwd(8)}>
          <T.Col yAlign="center" flex={0} paddingTop={rwd(0)}>
            <R.Avatar
              data={item.user}
              size={SIZE.l * 2}
              navigation={_navigation}
            />
          </T.Col>
          <T.Space />
          <T.Col flex={1}>
            <T.Div
              // flex-shrink={1}
              // maxWidth={SCREEN_WIDTH - rwd(70)}
              // width="90%"
              width="100%"
              // style={{ width: 'auto' }}
              backgroundColor="#E4E8EB"
              borderRadius={SIZE.s}
              paddingHorizontal={SIZE.s}
              //
            >
              {item.user?.id == global.currentUser.id ? (
                <T.Touch onPress={this.openMenu}>
                  <R.Content
                    numberOfLines={0}
                    text={item.content}
                    data={data}
                    smaller={2}
                    paddingVertical={SIZE.s}
                    flex={0}
                    theme="H9"
                  />
                </T.Touch>
              ) : (
                <R.Content
                  numberOfLines={0}
                  text={item.content}
                  data={data}
                  smaller={2}
                  paddingVertical={SIZE.s}
                  flex={0}
                  theme="H9"
                />
              )}
            </T.Div>
            <T.Row flow="row" yAlign="center" marginTop={-1 * SIZE.m * 0.3}>
              <T.Col flex={0} width="50%">
                <T.Label text={item.author} theme="H9" ellipsizeMode="middle" />
              </T.Col>
              <T.Space />
              <T.Col flex={0}>
                <R.TimeAgo borderWidth={1} data={item.created_at} theme="H9" />
              </T.Col>
              <T.Space />
              <T.Col flex={0}>
                {this.props.likeable && (
                  <R.Like data={item} paddingHorizontal={SIZE.n} />
                )}
              </T.Col>
              <T.Space />
              {this.props.replyable && (
                <T.Col flex={0} marginRight={SIZE.l}>
                  <T.Label
                    theme="H8"
                    text="回覆"
                    onPress={() => this.reply(item.parent)}
                  />
                </T.Col>
              )}
            </T.Row>
            {!url && item.messages_count > 0 ? (
              <T.Label
                text={`查看 ${item.messages_count} 回覆...`}
                theme="H5"
                size={rwd(13)}
                onPress={() => {
                  // alert(item.messages_url)
                  beep()
                  this.loadList(item.messages_url)
                }}
              />
            ) : null}
            <T.List
              // ListHeaderComponent=<T.Label text="abc" />
              ref="list"
              url={url}
              extraData={url}
              renderItem={(item) => (
                <T.MessageItem
                  likeable={true}
                  data={item}
                  parent={this.props.parent}
                />
              )}
            />
          </T.Col>
        </T.Row>
      </T.Animatable.View>
    )
  }

  onCancel = () => {
    let { data } = this.state
    let { item = data } = data
    item.editing = false
    this.props.attachKeyBoard && this.props.attachKeyBoard()
    // window.Effect.appear(this.animator, () => {
    this.setState({ data: { ...data } })
    // })
  }

  onUpdate = (data) => {
    // let { data } = this.state
    let { item = data } = data
    T.Api.put(item.routes, { message: item }, (res) => {
      window.Effect.bounce(this.animator, () => {
        this.props.attachKeyBoard && this.props.attachKeyBoard()
        let { data } = res
        this.setState({ data: { ...data } })
      })
    })
  }

  openMenu = () => {
    let { data } = this.state
    let { item = data } = data
    // log(item, 'item')
    // log(item.user?.id, global.currentUser.id)
    window.chooseMenu.open({
      // title: '上方寶劍',
      menus: [
        <T.IconLabel
          name="edit"
          title="編輯"
          theme="H1"
          larger={5}
          color={window.NAV_COLOR}
        />,
        <T.IconLabel
          name="delete"
          title="刪除"
          larger={5}
          theme="H1"
          color={window.WARNING_COLOR}
        />,
      ],
      onPress: (index) => {
        let { data } = this.state
        let { item = data } = data
        window.chooseMenu.close()
        switch (index) {
          case 0:
            item.editing = true
            window.keyboardInput.close()
            this.setState({ data: item })
            break
          case 1:
            // let { data } = this.state
            // let { item = data } = data
            // let { onDeleted = () => {} } = this.props
            confirm(
              () => {
                T.Api.delete(item.routes, (res) => {
                  log(item, 'item in delete#res')
                  window.Effect.disappear(this.animator, () => {
                    log('callback ----------------')
                    this.props.list?.itemEvent?.onDeleted(item)
                    // this.props.list?.reloadData()
                  })
                })
              },
              {
                title: '刪除嗎？',
                ok: '對，就刪了吧',
                cancel: '不，我考慮一下',
              }
            )
          default:
        }
      },
    })
  }

  loadList = (url) => {
    // log(url, 'url')
    this.setState({ url }, () => {
      this.refs.list?.reloadData()
    })
  }

  reply = (item) => {
    beep()
    log(this.props.parent.messageRefs, 'this.props.parent.messageRefs')
    // log(item, 'item')
    // global.currentThread = this
    this.props.parent.replyTo(item)
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
