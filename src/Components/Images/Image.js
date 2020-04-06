import React, { PureComponent as Component } from 'react'
import { Image as RNImage } from 'react-native'
import FastImage from 'react-native-fast-image'

// export class RNImage extends RNImage {}
export class Image extends Component {
  render() {
    let {
      uri, //= 'https://placekitten.com/600/600',
      source,
      size,
      rounded,
      width = size || '100%',
      aspectRatio = 1,
      mode = 'cover',
      ...props
    } = this.props
    // log(source, uri, 'source, uri')
    // log(uri, 'uri')
    // log(FastImage.priority.normal, 'FastImage.priority.normal')
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
    let Tag = iOS ? FastImage : RNImage
    return !uri ? null : (
      <T.Div {...this.props}>
        <Tag
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
