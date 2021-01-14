import React from 'react'
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Keyboard,
  View,
} from 'react-native'
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import ModalBox from 'react-native-modalbox'
import { KeyboardAware } from '../Components/Keyboard'

const initHTML = `
<h1><center><b>Pell.js Rich Editor</b></center></h1>
<h2><center>React Native</center></h2>
<p>Est quas sit. Velit maiores ullam. Iure ea non. Beatae ullam quo. Consequatur culpa quod. </p><p>Accusantium vero placeat. Optio enim omnis. Reprehenderit eos aut. </p><p>Consequatur et amet. Hic et eum. Dolore corrupti sequi. Laboriosam iure eius. Eveniet sed consequatur. Pariatur rerum est. Officia molestiae soluta. Fugiat sunt et. Dolor dignissimos quam. Et possimus est. Ratione explicabo ut. Optio voluptas nemo. Qui cum tenetur.  Eligendi repudiandae unde. Dolorum dolor suscipit. </p><br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" ></br></br>
<p>Est quas sit. Velit maiores ullam. Iure ea non. Beatae ullam quo. Consequatur culpa quod. </p><p>Accusantium vero placeat. Optio enim omnis. Reprehenderit eos aut. </p><p>Consequatur et amet. Hic et eum. Dolore corrupti sequi. Laboriosam iure eius. Eveniet sed consequatur. Pariatur rerum est. Officia molestiae soluta. Fugiat sunt et. Dolor dignissimos quam. Et possimus est. Ratione explicabo ut. Optio voluptas nemo. Qui cum tenetur.  Eligendi repudiandae unde. Dolorum dolor suscipit. </p><br/>

`

export class EditorBase extends KeyboardAware {
  constructor(props) {
    super(props)
    this.mounted = true
  }
  state = {}
  save = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml()
    // console.log(html);
    _log(html)
  }

  onPressAddImage = () => {
    // insert URL
    this.richText.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png'
    )
    // insert base64
    // this.richText.insertImage(`data:${image.mime};base64,${image.data}`);
    this.richText.blurContentEditor()
  }

  onKeyboardChanged = (height) => {
    // log(height, 'height')
    this.mounted &&
      this.setState({ paddingBottom: height, toolbarHeight: height })
    // log(this.modal, 'this.modal')
    if(this.modal && height > 0) {
      // log('open')
      this.modal?.open()
    } else {
      // log('close')
      this.modal && this.modal.close()
    }
  }

  render() {
    let that = this
    return (
      <>
        <T.Screen
          scrollable
          padding={0}
          onPress={() => Keyboard.dismiss}
          paddingBottom={this.state.paddingBottom}
        >
          <T.Scroll flex={1}>
            <RichEditor
              ref={(rf) => (that.richText = rf)}
              initialContentHTML={initHTML}
              style={styles.rich}
            />
          </T.Scroll>
        </T.Screen>
        <ModalBox
          useNativeDriver={true}
          ref={(c) => (this.modal = c)}
          flex={0}
          position="bottom"
          entry="bottom"
          backdropOpacity={0.5}
          backdrop={false}
          backdropPressToClose={false}
          // animationDuration={0}
          style={{
            borderTopWidth: 0.5,
            borderColor: '#999',
            backgroundColor: 'rgba(241,242,242,1)',
            backgroundColor: 'white',
            flex: 0,
            height: this.state.toolbarHeight + (iOS ? rwd(15) : rwd(45)),
          }}
        >
          <T.Row flow="row">
            <T.Col>
              <RichToolbar
                style={styles.richBar}
                getEditor={() => that.richText}
                iconTint={'#000033'}
                selectedIconTint={'#2095F2'}
                selectedButtonStyle={{ backgroundColor: 'transparent' }}
                onPressAddImage={that.onPressAddImage}
              />
            </T.Col>
            <T.Col flex={0} style={styles.richBar} padding={rwd(15)}>
              <T.Icon
                name="down"
                iconSet="AntDesign"
                color="#545454"
                size={rwd(14)}
                onPress={() => {
                  this.modal.close()
                  this.richText.blurContentEditor()
                  this.save()
                }}
              />
            </T.Col>
          </T.Row>
        </ModalBox>
      </>
    )
  }

  componentWillUnmount() {
    this.mounted = false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
})
