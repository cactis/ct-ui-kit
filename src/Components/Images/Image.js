import React, { PureComponent as Component } from 'react'
import { Image as PUREImage } from 'react-native'
import FastImage from 'react-native-fast-image'

// export class RNImage extends PUREImage {}
export class Image extends Component {
  render() {
    let {
      uri = 'https://placekitten.com/600/600',
      source,
      size,
      rounded,
      width = size || '100%',
      aspectRatio = 1,
      mode = 'cover',
      ...props
    } = this.props
    log(source, uri, 'source, uri')
    let _mode = FastImage.resizeMode[mode]
    let _source = {
      uri: uri,
      priority: FastImage.priority.normal,
    }
    // if (source) {
    //   // log(source, 'source found')
    //   let _source = source //{ ...source, priority: FastImage.priority.normal }
    // }
    // log(_source, '_source')
    aspectRatio = aspectRatio ? { aspectRatio: aspectRatio } : {}
    // _log(uri)
    return (
      <T.Div {...this.props}>
        <FastImage
          {...this.props}
          style={{
            width: width,
            // borderWidth: 0.5,
            borderRadius: rounded && size ? size / 2 : 0,
            ...aspectRatio,
            ...this.props.style,
          }}
          source={source || _source}
          resizeMode={_mode}
          // {...props}
        />
      </T.Div>
    )
  }
}
