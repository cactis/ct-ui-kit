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
    return (
      <T.Animatable.View ref={(c) => (this.animator = c)}>
        <T.Row flow="row" padding={rwd(8)}>
          <T.Col yAlign="center" flex={0} paddingTop={rwd(10)}>
            <R.Avatar
              data={item.user}
              size={rwd(40)}
              navigation={_navigation}
            />
          </T.Col>
          <T.Space />
          <T.Col flex={0}>
            <T.Div
              flex-shrink={1}
              maxWidth={SCREEN_WIDTH - rwd(70)}
              maxWidth="80%"
              style={{ width: 'auto' }}
              backgroundColor="rgb(244,244,244)"
              borderRadius={rwd(10)}
              padding={rwd(8)}
            >
              <T.Label text={item.user.name} theme="H5" size={rwd(15)} />
              <T.Text numberOfLines={0} text={item.content} flex={0} />
            </T.Div>
            <T.Row flow="row" yAlign="center">
              <R.TimeAgo borderWidth={1} data={item.created_at} />
              <T.Space />
              {this.props.likeable && <R.Like data={item} />}
              <T.Space />
              {this.props.replyable && (
                <T.Label
                  theme="H8"
                  text="Reply"
                  onPress={() => this.reply(item.parent)}
                />
              )}
              <T.Space size={SIZE.l} />
              <T.Delete
                data={item}
                title="Delete"
                onDeleted={() => {
                  // log(a, 'a')
                  window.Effect.disappear(this.animator, () => {
                    this.props.parent.refs.list.itemEvent.onDeleted(data)
                  })
                }}
                // onDeleted={this.props.parent}
                // alignSelf="flex-end"
                // bordered
                // style={{ ...STYLES.bordered }}
              />
            </T.Row>
            {!url && item.messages_count > 0 ? (
              <T.Label
                text={`view more ${item.messages_count} reply...`}
                theme="H5"
                size={rwd(13)}
                onPress={() => {
                  // alert(item.messages_url)
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
                <T.MessageItem data={item} parent={this.props.parent} />
              )}
            />
          </T.Col>
        </T.Row>
      </T.Animatable.View>
    )
  }

  loadList = (url) => {
    // log(url, 'url')
    this.setState({ url }, () => {
      this.refs.list?.reloadData()
    })
  }

  reply = (item) => {
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
