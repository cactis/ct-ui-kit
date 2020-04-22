import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from 'ct-ui-kit'

import { Marker } from 'react-native-maps'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

// let draggingMarker
let _this, _navigation
export class MapFormScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params?.title || 'Where are you reading?',
    }
  }

  state = {
    markers: [],
    draggingMarker: null,
  }

  componentDidMount() {
    _trace()
    _this = this
    _navigation = this.props.navigation

    this.initStateData(() => {
      this.autoRun()
    })
  }

  render() {
    let { userRegion, markers, onComplete, title } = this.state
    log(markers, 'markers in MapFormScreen -------------')
    return (
      <T.Full navigation={this.props.navigation} title={title}>
        <T.Map ref={(c) => (this.map = c)} onComplete={onComplete}>
          {markers.map((item) => (
            <Marker
              key={randId()}
              coordinate={item}
              draggable
              // title="指定圈圈位置"
              pinColor={
                this.state.draggingMarker &&
                item.latitude == this.state.draggingMarker.latitude &&
                item.longitude == this.state.draggingMarker.longitude
                  ? 'rgb(160,15,237)'
                  : 'rgb(233,20,20)'
              }
              onPress={this.onMarkerPress}
              onDragStart={this.onMarkerDragStart}
              onDragEnd={this.onMarkerDragEnd}
            />
          ))}
        </T.Map>
        <T.Float
          bottom={rwd(30)}
          align="center"
          width={SCREEN_WIDTH}
          padding={rwd(10)}
          backgroundColor="rgba(237,237,237,.25)"
        >
          <T.Row flow="row" flex={0}>
            {markers.length > 0 ? null : (
              <T.Icon
                size={rwd(30)}
                onPress={this.addMarker}
                color="rgb(253,255,249)"
                name="map-marker-plus"
                iconSet="MaterialCommunityIcons"
              />
            )}
            <T.Space />
            <T.Icon
              size={rwd(30)}
              name="map-marker-minus"
              color={
                this.state.draggingMarker
                  ? 'rgb(160,15,237)'
                  : 'rgb(253,255,249)'
              }
              iconSet="MaterialCommunityIcons"
              onPress={this.removeMarker}
            />
          </T.Row>
        </T.Float>
        <T.Float
          borderRadius={rwd(5)}
          backgroundColor="rgba(255,255,255,.84)"
          top={rwd(120)}
          margin={rwd(10)}
          padding={rwd(10)}
          width={SCREEN_WIDTH - 2 * rwd(20)}
        >
          <T.Text
            numberOfLines={0}
            theme="H6"
            text="Share your reading and favorite books to help people find more interesting books by providing a location."
          />
          <T.Space />
          <T.Text
            color="rgb(224,0,0)"
            theme="H4"
            text="PLEASE PROTECT YOUR PRIVACY!!"
          />
        </T.Float>
      </T.Full>
    )
  }

  addMarker = () => {
    let { markers } = this.state
    log(markers, 'markers')

    let coordinate = {
      latitude: this.map.state.currentRegion.latitude,
      longitude: this.map.state.currentRegion.longitude,
    }
    log(coordinate, 'coordinate - in ')
    markers.push(coordinate)
    log(markers, 'markers')
    this.setState({ markers: [...markers] })
    this.onUpdate()
  }

  removeMarker = () => {
    let { markers, draggingMarker } = this.state
    if (!draggingMarker) return
    log(markers, draggingMarker, 'markers, draggingMarker')
    _.each([...markers], (m, index) => {
      log(m, 'm')
      if (
        draggingMarker &&
        m.latitude == draggingMarker.latitude &&
        m.longitude == draggingMarker.longitude
      ) {
        log('split!')
        markers.splice(index, 1)
      }
    })
    this.setState({ markers: [...markers], draggingMarker: null })
    this.onUpdate()
  }

  onUpdate = () => {
    runLast(() => {
      // let { children } = this.mapView.props
      // log(children, 'children')
      // let markers = children.map(c => c.props.coordinate)
      let { markers } = this.state
      let { onComplete } = _navigation.state.params
      onComplete && onComplete(markers)
    })
  }

  onMarkerPress = (e) => {
    log('onMarkerPress')
    let coord = e.nativeEvent.coordinate

    if (
      !this.state.draggingMarker ||
      this.state.draggingMarker?.latitude != coord.latitude ||
      this.state.draggingMarker?.longitude != coord.longitude
    )
      this.setState({ draggingMarker: coord })
    log(this.state.draggingMarker, '1111111111')
  }

  onMarkerDragStart = (e) => {
    log('onMarkerDragStart')
    let coord = e.nativeEvent.coordinate
    log(coord, 'coord ----------1')
    if (
      !this.state.draggingMarker ||
      this.state.draggingMarker?.latitude != coord.latitude ||
      this.state.draggingMarker?.longitude != coord.longitude
    )
      this.setState({ draggingMarker: coord })
    log(this.state.draggingMarker, '22222')
  }

  onMarkerDragEnd = (e) => {
    log(e.nativeEvent.coordinate, 'e.nativeEvent.coordinate')

    let { markers } = this.state
    _.each(markers, (marker, index) => {
      if (
        marker.latitude == this.state.draggingMarker.latitude &&
        marker.longitude == this.state.draggingMarker.longitude
      ) {
        markers[index] = e.nativeEvent.coordinate
        return
      }
    })
    this.setState({ markers })
    this.onUpdate()
  }

  initStateData = (onComp) => {
    if (_navigation.state.params) {
      let { markers = [], onComplete, title } = _navigation.state.params
      // _navigation.setParams({ title: '改為新標題' })
      this.setState({ markers, onComplete, title }, () => {
        onComp && onComp()
      })
    } else {
      onComp && onComp()
    }
  }
  autoRun = () => {}
}
var styles = StyleSheet.create({})
