import React, { PureComponent as Component } from 'react'

import * as T from '../..'

export class Tab extends Component {
  THEMES = {
    button: {
      badge: { position: 'absolute', left: '65%', top: '25%' },
      isSelected: {
        false: {
          padding: 20,
          padding: 10,
          paddingHorizontal: 20,
          color: '#111',
        },
      },
    },
    parent: {
      badge: { position: 'absolute', left: '65%', top: '25%' },
      isSelected: {
        true: {
          padding: 5,
          color: 'white',
          backgroundColor: 'rgba(136,214,227,.34)',
        },
        false: {
          padding: 5,
          color: '#FFF',
        },
      },
    },
    child: {
      badge: { position: 'absolute', left: '65%', top: '25%' },
      paddingVertical: 30,
      paddingHorizontal: 25,
      isSelected: {
        true: {
          paddingVertical: 10,
          color: '#333',
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
    let { theme, selected = false, size = BASE_SIZE * 2, tab } = this.props
    let { title, icon, badge } = tab

    let style = this.THEMES[theme]
    let color = style.isSelected[selected].color
    return (
      <T.Div flex={1}>
        <T.Touch onPress={e => this.props.onPress(this.props.index, e)}>
          <T.Row
            flex={0}
            flexDirection={theme == 'parent' ? 'row' : 'column'}
            style={{
              ...this.props.style,
              ...style.isSelected[selected],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
            }}
          >
            {icon ? (
              <T.Icon
                theme={theme == 'child' ? 'large' : 'normal'}
                marginRight={5}
                name={icon}
                color={color}
                onPress={e => this.props.onPress(this.props.index, e)}
              />
            ) : null}
            {icon && title ? <T.Space /> : null}
            {title ? (
              <T.Label
                style={{
                  fontSize: rwd(14),
                  fontWeight: '400',
                  // textAlign: 'center',
                }}
                color={color}
                onPress={e => this.props.onPress(this.props.index, e)}
              >
                {title}
              </T.Label>
            ) : null}
            <T.Badge style={style.badge} num={badge} />
          </T.Row>
        </T.Touch>
      </T.Div>
    )
  }
}
