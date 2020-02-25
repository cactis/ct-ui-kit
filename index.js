import './src/Libraries'
import './src/Constants'
export * from './src'

import * as T from './'
window.T = T
import faker from './src/lib/faker.min.js'
T.Faker = faker
