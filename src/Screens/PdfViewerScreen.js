import React from 'react'
import { StyleSheet } from 'react-native'
import Pdf from 'react-native-pdf'

let _this, _navigation
export class PdfViewerScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    _navigation = navigation
    return {
      title: navigation.state?.params?.title || '預設標題',
    }
  }
  state = {
    data: null,
    mounted: false,
  }

  render() {
    let { data } = this.props
    if(!data) return null
    let { item = data } = data
    // log(data, 'data in PdfViewerScreen render() ')
    const source = { uri: item.file_url, cache: true }
    log(source, 'source')
    return (
      <T.Screen padding={0}>
        <Pdf
          flex={1}
          style={{ width: '100%', height: '100%' }}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            log(`number of pages: ${numberOfPages}`)
          }}
          onPageChanged={(page, numberOfPages) => {
            log(`current page: ${page}`)
          }}
          onError={(error) => {
            log(error)
          }}
          onPressLink={(uri) => {
            log(`Link presse: ${uri}`)
          }}
        />
      </T.Screen>
    )
  }

  initStateData = (onComplete) => {
    if(_navigation?.state?.params) {
      let { data } = _navigation.state?.params
      // _navigation.setParams({ title: '改為新標題' })
      this.mounted &&
        this.setState({ data }, () => {
          onComplete && onComplete()
        })
    } else {
      onComplete && onComplete()
    }
  }

  componentDidMount() {
    _trace()
    this.mounted = true
    _this = this
    _navigation = this.props.navigation
    this.initStateData(() => {
      // this.bindHeaderRight()
      this.autoRun()
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.navigation !== this.props.navigation)
      _navigation = this.props.navigation
  }

  componentWillUnmount() {
    this.mounted = false
  }
  autoRun = () => { }
}
var styles = StyleSheet.create({})
