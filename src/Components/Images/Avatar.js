import React from 'react'

import { Image } from './Image'
export class Avatar extends React.Component {
    render() {
        let { size = 80, ...props } = this.props
        return (
            <T.View {...props}>
                <Image size={size} circled={true} {...this.props} />
            </T.View>
        )
    }
}
