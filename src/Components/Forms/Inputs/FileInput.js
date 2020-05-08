import React from 'react'
import { StyleSheet } from 'react-native'
import DocumentPicker from 'react-native-document-picker'

let _navigation
export class FileInput extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    let { editable = true } = this.props
    // log(data, 'data in FileInput render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row borderWidth={0} borderColor="rgb(221,221,221)" padding={SIZE.s}>
        <T.Row>
          <T.Label
            text={`${_.reject(item.uploads, (i) => i._destroy).length} pdfs`}
          />
          <T.List
            ref={(c) => (this.list = c)}
            horizontal
            data={item.uploads}
            renderItem={({ item, index }) =>
              item._destroy ? null : (
                <T.Grid
                  width={rwd(120)}
                  paddingRight={SIZE.t}
                  flex={0}
                  // onPress={() => navigateToRecord(item, _navigation)}
                >
                  <T.Media
                    // aspectRatio={1.22}
                    data={item}
                  />

                  {editable ? (
                    <T.Float right={rwd(SIZE.t)} top={rwd(SIZE.t)}>
                      <T.Icon
                        name="close"
                        color="rgba(126,23,23,.87)"
                        size={rwd(15)}
                        backgroundColor="rgba(255,255,255,.87)"
                        onPress={() => {
                          this.setState({ data: { ...data } }, () => {
                            confirm(
                              () => {
                                data.uploads[index]._destroy = true
                                this.setState({ data: { ...data } })
                                this.props.onUpdate && this.props.onUpdate(data)
                              },
                              { title: `Confirm to delete?` }
                            )
                          })
                        }}
                      />
                    </T.Float>
                  ) : null}
                </T.Grid>
              )
            }
          />
        </T.Row>
        {editable ? (
          <T.Center flex={0} borderWidth={0} padding={SIZE.l}>
            <T.Icon
              name="pdffile1"
              onPress={this.getImage}
              iconSet="AntDesign"
              color="rgb(85,85,85)"
              size={SIZE.l * 1.5}
            />
          </T.Center>
        ) : null}
      </T.Row>
    )
  }
  getImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })
      let file = {
        path: res.uri,
        mime: res.type,
        filename: res.name,
        size: res.size,
        info: res,
      }
      file = await base64Image(file)
      let { data } = this.state
      data.uploads.push(file)
      this.setState({ ...data })
      log(
        [res.uri, res.type, res.name, res.size],
        '[res.uri,res.type,res.name,res.size]'
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  initStateData = (onComplete) => {
    let { data } = this.props
    this.mounted &&
      this.setState({ data }, () => {
        onComplete && onComplete()
      })
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
    if (prevProps.data !== this.props.data) {
      //   alert('componentDidUpdate')
      //   this.list.clearData(() => {
      this.setState({ data: { ...this.props.data } })
      //   })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
