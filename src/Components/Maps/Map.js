import React from 'react'
import { StyleSheet } from 'react-native'
import * as T from '..'

import MapView, { Marker, navigator } from 'react-native-maps'

let _navigation

export class Map extends React.PureComponent {
  state = {
    region: null,
    markers: [],
    currentRegion: null,
  }

  componentDidMount() {
    _trace('Map')
    _navigation = this.props.navigation
    this.initStateData(() => {
      delayed(() => {
        // this.getUserLocation()
      })
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markers !== this.props.markers)
      this.setState({ markers: this.props.markers })
  }

  render() {
    let { userRegion, markers } = this.state
    log(userRegion, markers, 'userRegion, markers')

    let { data } = this.state
    log(data, 'data in Map render()')
    // if (!data) return null
    // let { item } = data
    return (
      <T.Grid>
        <MapView
          ref={c => (this.mapView = c)}
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
          onRegionChange={this.onRegionChange}
          style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
          {...this.props}
        />
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

  fitToElements = () => {
    this.mapView.fitToElements(true)
  }

  backToUserRegion = () => {
    let { userRegion } = this.state
    log(userRegion, 'backToUserRegion -----------------------')
    if (userRegion) {
      this.mapView.animateToRegion(userRegion)
    }
  }

  onRegionChange = region => {
    runLast(() => {
      log(region, 'region')
      this.setState({ currentRegion: region })
      this.props.onRegionChange && this.props.onRegionChange(region)
    }, 50)
  }

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        e => reject(e)
      )
    })
  }

  getUserLocation = () => {
    // alert('getUserLocation')
    let { markers } = this.state
    this.getCurrentLocation().then(position => {
      log(position, 'position')
      if (position) {
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
        if (markers?.length > 0) {
          this.mapView.fitToElements(true)
        }
      })
    })
  }

  initStateData = onComp => {
    let { data, markers, onComplete } = this.props
    this.setState({ data, markers, onComplete }, () => {
      onComp && onComp()
    })
  }

  autoRun = () => {}
}
var styles = StyleSheet.create({})
