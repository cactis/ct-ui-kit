import React from 'react'
import { StyleSheet } from 'react-native'
import RNImagePicker from 'react-native-image-crop-picker'

let _navigation
export class MediasInput extends React.PureComponent {
  state = {
    data: null,
  }

  render() {
    let { data } = this.state
    let { editable = true } = this.props
    // log(data, 'data in MediasInput render()')
    if (!data) return null
    let { item = data } = data
    return (
      <T.Row borderWidth={0} borderColor="rgb(221,221,221)" padding={SIZE.s}>
        <T.Row>
          <T.Label
            text={`${_.reject(item.uploads, i => i._destroy).length} photos`}
          />
          <T.List
            ref={c => (this.list = c)}
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
                            data.uploads[index]._destroy = true
                            this.setState({ data: { ...data } })
                            this.props.onUpdate && this.props.onUpdate(data)
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
              name="add-a-photo"
              onPress={this.getImage}
              iconSet="MaterialIcons"
              color="rgb(85,85,85)"
              size={SIZE.l * 1.5}
            />
          </T.Center>
        ) : null}
      </T.Row>
    )
  }
  getImage = async () => {
    RNImagePicker.openPicker({
      compressImageQuality: 1,
      multiple: true,
      // useFrontCamera: true,
      // width: 300,
      // height: 400,
      // cropping: false,
      // cicular: true,
      includeBase64: true,
    }).then(async images => {
      let photos = await Promise.all(
        images.map(async image => {
          return await base64Image(image)
        })
      )
      // let photos = images
      log(photos, 'photos 3333333')
      // setData(image)
      // onChanged(image)
      let { data } = this.state
      log(data, 'data 4444444')
      data.uploads.push(...photos)
      log(data, 'data 55555')
      // data.photos = photos
      this.setState({ data: { ...data } })
      // return photos
    })
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      log('need to set onPress on item')
    }
  }

  initStateData = onComplete => {
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
