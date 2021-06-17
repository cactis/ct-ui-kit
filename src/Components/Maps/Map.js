import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from '..'

import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

export { Marker }
let navigator

export class Map extends React.PureComponent {
  state = {
    region: null,
    markers: [],
    currentRegion: null,
  }

  componentDidMount() {
    _trace()
    navigator = this.props.navigation
    this.initStateData(() => {
      delayed(() => {
        // this.fitToElements()
        this.getUserLocation()
      })
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.markers !== this.props.markers)
      this.setState({ markers: this.props.markers })
  }

  render() {
    let { userRegion, markers } = this.state
    // log([userRegion, markers], '[userRegion, markers]')

    let { data } = this.state
    // log(data, 'data in Map render()')
    // if (!data) return null
    // let { item } = data
    log(markers, 'markers')
    return (
      <T.Grid>
        <MapView
          ref={(c) => (this.mapView = c)}
          // provider="google"
          initialRegion={userRegion}
          flex={1}
          // mapType="hybrid"
          // region={userRegion}
          // showsMyLocationButton={true}
          // onLongPress={this.addMarker}
          // onMarkerDragEnd={this.onMarkerDragEnd}
          showsUserLocation={true}
          // showsMyLocationButton={true}
          // userLocationAnnotationTitle="您目前所在位置"
          onMapReady={this.onMapReady}
          onRegionChange={this.onRegionChange}
          style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
          {...this.props}
        >
          {markers.map((item) =>
            !item ? null : (
              <Marker
                key={randId()}
                title={`${item.latitude}`}
                // title={
                //   item.coordable?.id != window.currentUser?.id
                //     ? item.coordable?.name
                //     : '(yourself)'
                // }
                // pinColor={
                //   item.coordable?.id != window.currentUser?.id
                //     ? 'rgb(255,0,0)'
                //     : iOS
                //     ? 'rgba(43,219,14,.95)'
                //     : 'rgba(21,117,5,.95)'
                // }
                // onPress={() => this.onMarkerPress(item)}
                // description={item.coordable?.description}
                coordinate={item}
                pinColor="red"
                title={item.title}
              // coordinate={33}
              />
            )
          )}
        </MapView>
        <T.Float right={rwd(10)} bottom={SAFEAREA_BOTTOM + 0}>
          <T.Icon
            size={rwd(25)}
            color="#111"
            // name="map-marker-multiple"
            name="map-marker-radius"
            iconSet="MaterialCommunityIcons"
            onPress={this.fitToElements}
          />
          <T.Space />
          {/* <T.Icon
            size={rwd(25)}
            color="#111"
            name="map-marker-radius"
            iconSet="MaterialCommunityIcons"
            onPress={this.backToUserRegion}
          /> */}
        </T.Float>
      </T.Grid>
    )
  }

  onMapReady = () => {
    log('onMapReady')
  }

  fitToElements = () => {
    this.mapView?.fitToElements(true)
  }

  backToUserRegion = () => {
    let { userRegion } = this.state
    // log(userRegion, 'backToUserRegion -----------------------')
    if(userRegion) {
      this.mapView.animateToRegion(userRegion)
    }
  }

  onRegionChange = (region) => {
    runLast(() => {
      // log(region, 'region')
      this.setState({ currentRegion: region })
      this.props.onRegionChange && this.props.onRegionChange(region)
    }, 50)
  }

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      // Location.getCurrentPositionAsync({}).then(location =>
      //   log(locaiton, 'location in Map#getCurrentLocation')
      // )
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        (e) => reject(e)
      )
    })
  }

  getUserLocation = () => {
    // alert('getUserLocation')
    let { markers } = this.state
    this.getCurrentLocation().then((position) => {
      log(position, 'position')
      if(position) {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.092,
          longitudeDelta: 0.0421,
        }
        this.setState({
          userRegion: region,
          currentRegion: region,
          // markers: markers.length == 0 ? [region] : markers,
        })
      }
      delayed(() => {
        if(markers?.length > 0) {
          // this.mapView.fitToElements(true)
        }
      })
    })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.markers !== this.props.markers)
  //     this.setState({ markers: this.props.markers })
  // }

  initStateData = (onComp) => {
    let { data, markers = [], onComplete } = this.props
    // log(markers, 'markers')
    this.setState({ data, markers, onComplete }, () => {
      onComp && onComp()
    })
  }

  autoRun = () => { }
}
var styles = StyleSheet.create({})
