import './src/Libraries'
import './src/Constants'
export * from './src'

import * as T from './'
window.T = T

import faker from './src/lib/faker.min.js'
// import LZString from './src/lib/lz-string.js'
// import LZBase64String from './src/lib/lz-base64-string.js'
// import GZip from './src/lib/gzip.js'
window.T.Faker = faker
// window.T.LZString = LZString
// window.T.LZBase64String = LZBase64String
// window.T.GZip = GZip
