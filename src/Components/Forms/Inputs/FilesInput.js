import React from 'react'
import { StyleSheet } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import RNImagePicker from 'react-native-image-crop-picker'
let _navigation
export class FilesInput extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    let { editable = true } = this.props
    // log(data, 'data in FilesInput render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row
        backgroundColor_="red"
        // borderWidth={0}
        // borderColor="rgb(221,221,221)"
        // padding={SIZE.s}
      >
        <T.Row style={STYLES.bordered}>
          <T.Row flex={0} flow="row" yAlign="center" xAlign="space-between">
            <T.Label
              text={`${_.reject(item.uploads, (i) => i._destroy).length} files`}
            />
            {editable ? (
              <T.Row
                flex={0}
                borderWidth={0}
                padding={SIZE.t}
                flow="row"
                xAlign="flex-end"
                yAlign="center"
              >
                <T.Icon name="plus" color="#aaa" iconSet="AntDesign" pad={0} />
                <T.Icon
                  name="camerao"
                  onPress={this.getImage}
                  iconSet="AntDesign"
                  // color="rgb(85,85,85)"
                  larger={12}
                />
                <T.Icon
                  name="file-pdf-o"
                  onPress={this.getPdf}
                  // iconSet="AntDesign"
                  // backgroundColor={BCOLOR}
                  // color="rgb(85,85,85)"
                  larger={6}
                />
              </T.Row>
            ) : null}
          </T.Row>
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
                        // color="rgba(126,23,23,.87)"
                        smaller={5}
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
      </T.Row>
    )
  }
  getPdf = async () => {
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
      log(file, 'file')
      file = await base64Image(file)
      let { data } = this.state
      data.uploads.push(file)
      this.setState({ ...data })
      // log(
      //   [res.uri, res.type, res.name, res.size],
      //   '[res.uri,res.type,res.name,res.size]'
      // )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  getImage = async () => {
    RNImagePicker.openPicker({
      compressImageQuality: 1,
      multiple: true,
      maxFiles: 10,
      // useFrontCamera: true,
      // width: 300,
      // height: 400,
      // cropping: false,
      // cicular: true,
      includeBase64: true,
    }).then(async (images) => {
      let photos = await Promise.all(
        images.map(async (image) => {
          return await base64Image(image)
        })
      )

      // let photos = images
      // log(photos, 'photos 3333333')
      // setData(image)
      // onChanged(image)
      let { data } = this.state
      // log(data,  'data 4444444')
      data.uploads.push(...photos)
      // log(data, 'data 55555')
      // data.photos = photos
      this.setState({ data: { ...data } })
      // delayed(() => {
      //   this.forceUpdate()
      // })
      // return photos
    })
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
