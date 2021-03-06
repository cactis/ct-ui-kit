import React, { PureComponent as Component } from 'react'

import * as T from '../..'

export class Tab extends Component {
  THEMES = {
    button: {
      badge: { position: 'absolute', left: '65%', top: '25%' },
      isSelected: {
        false: {
          // padding: rwd(20),
          padding: SIZE.s,
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
          // height: rwd(32),
        },
        false: {
          // height: rwd(32),
          paddingVertical: SIZE.t,
          color: SEGMENT_COLOR,
          // fontWeight: '300',
          // fontSize: rwd(15),
        },
      },
    },
    child: {
      badge: { position: 'absolute', left: '30%', top: '25%' },
      paddingVertical: SIZE.l,
      paddingHorizontal: SIZE.l,
      isSelected: {
        true: {
          paddingVertical: SIZE.s,
          color: '#333',
          // fontWeight: '900',
          borderColor: 'white',
          borderBottomWidth: 2,
        },
        false: {
          paddingVertical: SIZE.s,
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
    let { title, withIcon, icon, titleComponent } = tab

    let style = this.THEMES[theme]
    let color = style.isSelected[selected].color
    return (
      <T.Div flex={1} borderWidth={0.3} borderColor={SEGMENT_BORDER_COLOR}>
        <T.Touch onPress={(e) => this.props.onPress(this.props.index, e)}>
          <T.Row
            flex={0}
            // flexDirection={theme == 'parent' ? 'row' : 'column'}
            flow="row"
            // xAlign="center"
            style={{
              ...this.props.style,
              margin: SIZE.t,

              ...style.isSelected[selected],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              paddingHorizontal: SIZE.l,
              height: SIZE.l * 1.3,
            }}
          >
            {icon ? (
              <T.Icon
                theme={theme == 'child' ? 'large' : 'normal'}
                // marginRight={5}
                // name={icon}
                {...icon}
                color={color}
                onPress={(e) => this.props.onPress(this.props.index, e)}
              />
            ) : null}
            {/* {icon && title ? <T.Space size={SIZE.t} /> : null} */}

            {title ? (
              <T.Label
                // theme="H5"
                style={{
                  fontWeight: '300',
                  // fontSize: rwd(14),
                  // fontWeight: '400',
                  // textAlign: 'center',
                  // ...style.isSelected[selected],
                  // paddingHorizontal: SIZE.l,
                }}
                // theme="H1"
                // smaller={30}
                // size={rwd(19)}
                color={color}
                onPress={(e) => this.props.onPress(this.props.index, e)}
              >
                {title}
              </T.Label>
            ) : null}
            {withIcon}
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
