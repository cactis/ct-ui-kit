import React, { PureComponent as Component } from 'react'

import * as T from '../..'

export class Tab extends Component {
  THEMES = {
    button: {
      badge: { position: 'absolute', left: '65%', top: '25%' },
      isSelected: {
        false: {
          padding: rwd(20),
          padding: rwd(10),
          paddingHorizontal: rwd(20),
          color: '#111',
        },
      },
    },
    parent: {
      badge: { position: 'absolute', left: '30%', top: '25%' },
      isSelected: {
        true: {
          paddingVertical: SIZE.t,
          color: SEGMENT_ACTIVE_COLOR,
          backgroundColor: SEGMENT_ACTIVE_BGCOLOR,
          // fontWeight: '900',
          // fontSize: rwd(15),
          height: rwd(32),
        },
        false: {
          height: rwd(32),
          paddingVertical: SIZE.t,
          color: SEGMENT_COLOR,
          // fontWeight: '300',
          // fontSize: rwd(15),
        },
      },
    },
    child: {
      badge: { position: 'absolute', left: '30%', top: '25%' },
      paddingVertical: 30,
      paddingHorizontal: 25,
      isSelected: {
        true: {
          paddingVertical: 10,
          color: '#333',
          // fontWeight: '900',
          borderColor: 'white',
          borderBottomWidth: 2,
        },
        false: {
          paddingVertical: 10,
          color: 'white',
        },
      },
    },
  }

  render() {
    let {
      theme,
      badge,
      selected = false,
      size = BASE_SIZE * 2,
      tab,
    } = this.props
    let { title, icon, titleComponent } = tab

    let style = this.THEMES[theme]
    let color = style.isSelected[selected].color
    return (
      <T.Div flex={1} borderWidth={0.3} borderColor={SEGMENT_BORDER_COLOR}>
        <T.Touch onPress={e => this.props.onPress(this.props.index, e)}>
          <T.Row
            flex={0}
            // flexDirection={theme == 'parent' ? 'row' : 'column'}
            flow="row"
            style={{
              ...this.props.style,
              margin: SIZE.t,
              ...style.isSelected[selected],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              paddingHorizontal: SIZE.l,
            }}
          >
            {icon ? (
              <T.Icon
                theme={theme == 'child' ? 'large' : 'normal'}
                // marginRight={5}
                // name={icon}
                {...icon}
                color={color}
                onPress={e => this.props.onPress(this.props.index, e)}
              />
            ) : null}
            {/* {icon && title ? <T.Space size={SIZE.t} /> : null} */}
            {title ? (
              <T.Label
                // theme="H5"
                style={
                  {
                    // fontSize: rwd(14),
                    // fontWeight: '400',
                    // textAlign: 'center',
                    // ...style.isSelected[selected],
                    // paddingHorizontal: SIZE.l,
                  }
                }
                color={color}
                onPress={e => this.props.onPress(this.props.index, e)}
              >
                {title}
              </T.Label>
            ) : null}
            {titleComponent}
            {/* <T.Float right="40%" top="0%"> */}
            <T.Badge style={style.badge} num={badge} />
            {/* </T.Float> */}
          </T.Row>
        </T.Touch>
      </T.Div>
    )
  }
}
