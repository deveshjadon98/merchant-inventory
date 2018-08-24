import configReducer from './../../src/reducers/configReducer'
import * as types from './../../src/constants/actionTypes'

describe('configs reducer', () => {

 it('should return config', () => {
  expect(
   configReducer([], {
    type: types.CONFIG_LOADED,
   })
  ).toEqual({
    "API_URL": "http://localhost:3001/"
   })
 })
})