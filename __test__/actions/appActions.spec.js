import * as actions from '../../src/actions'
import Actions from '../../src/constants/actionTypes'

describe('actions', () => {
 it('should create an action to add a todo', () => {
  const text = 'Finish docs'
  const expectedAction = {
   type: Actions.CONFIG_LOADED,
   config: {
    API_URL: "http://localhost:3001/"
   }
  }
  expect(actions.appActionCreator.configLoaded()).toEqual(expectedAction)

  const expectedAction = {
   type: Actions.CREATE_MERCHANT,
   payload: {
    firstName: "html",
    lastName: "Jadon",
    avatarUrl: "https://res.cloudinary.com/critox/image/upload/v1535029802/p5oqz7oouas31n1bt2am.png",
    email: "9780080358",
    phone: "jadon.devesh98@gmail.com",
    hasPremium: false,
    bids: [],
   }
  }

  expect(actions.appActionCreator.createMerchant()).toEqual(expectedAction)

  const expectedAction = {
   type: Actions.CREATED_MERCHANT,
   payload: {
    "firstName": "html",
    "lastName": "Jadon",
    "avatarUrl": "https://res.cloudinary.com/critox/image/upload/v1535029802/p5oqz7oouas31n1bt2am.png",
    "email": "9780080358",
    "phone": "jadon.devesh98@gmail.com",
    "hasPremium": false,
    "bids": [],
   }
  }
  expect(actions.appActionCreator.createdMerchant()).toEqual(expectedAction)

  const expectedAction = {
   type: Actions.REQUEST_MERCHANT,
   payload: 3
  }

  expect(actions.appActionCreator.requestMerchant()).toEqual(expectedAction)

  const expectedAction = {
   type: Actions.RECEIVE_MERCHANT,
   payload: {
    "firstName": "html",
    "lastName": "Jadon",
    "avatarUrl": "https://res.cloudinary.com/critox/image/upload/v1535029802/p5oqz7oouas31n1bt2am.png",
    "email": "9780080358",
    "phone": "jadon.devesh98@gmail.com",
    "hasPremium": false,
    "bids": [],
    "id": 14
   }
  }

  expect(actions.appActionCreator.receiveMerchant()).toEqual(expectedAction)

  const expectedAction = {
   type: Actions.REQUEST_MERCHANTS,
   payload: {}
  }

  expect(actions.appActionCreator.requestMerchants()).toEqual(requestMerchantsAction)

  const expectedAction = {
   type: Actions.RECEIVE_MERCHANTS,
   payload: [
    {
     "id": 1,
     "firstName": "john",
     "lastName": "doe",
     "avatarUrl": "",
     "email": "john@doe.com",
     "phone": "1234567890",
     "hasPremium": false,
     "bids": [
      {
       "id": 1,
       "carTitle": "wolkswogen",
       "amount": 300,
       "created": "Tue Aug 21 2018 20:17:44 GMT+0530 (India Standard Time)"
      },
      {
       "id": 1,
       "carTitle": "audi",
       "amount": 400,
       "created": "Tue Aug 21 2018 20:17:44 GMT+0530 (India Standard Time)"
      },
      {
       "id": 1,
       "carTitle": "mercedes",
       "amount": 350,
       "created": "Tue Aug 21 2018 20:17:44 GMT+0530 (India Standard Time)"
      }
     ]
    }
   ]
  }

  expect(actions.appActionCreator.receiveMerchants()).toEqual(expectedAction)

  const expectedAction = {
   type: Actions.UPDATE_MERCHANT,
   payload: {
    data: {
     "firstName": "john",
     "lastName": "doe",
     "avatarUrl": "",
     "email": "john@doe.com",
     "phone": "1234567890",
     "hasPremium": false,
     "bids": []
    }, id: 4
   }
  }

  expect(actions.appActionCreator.updateMerchant()).toEqual(expectedAction)
 })
})
