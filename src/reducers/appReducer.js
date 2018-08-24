import ACTIONS from './../constants/actionTypes';

export default (state = {}, action) => {
 switch (action.type) {

  case ACTIONS.REQUEST_MERCHANTS:
   return { ...state, merchants: [] };

  case ACTIONS.RECEIVE_MERCHANTS:
   return { ...state, merchants: action.payload.data };
  
  case ACTIONS.REQUEST_MERCHANT:
   return { ...state, merchantDetails: {} };

  case ACTIONS.RECEIVE_MERCHANT:
   return { ...state, merchantDetails: action.payload.data };
  
  case ACTIONS.RESET_MERCHANT:
   return { ...state, merchantDetails: {} };
  
  case ACTIONS.CREATE_MERCHANT:
   return { ...state, create_status: 'REQUESTED' };

  case ACTIONS.CREATED_MERCHANT:
   return { ...state, create_status: 'CREATED' };
  
  case ACTIONS.UPDATE_CREATE_REQUEST_STATUS:
    return {...state, create_status: action.payload.status};
  
  case ACTIONS.UPDATE_MERCHANT:
   return { ...state, update_status: 'REQUESTED' };

  case ACTIONS.UPDATED_MERCHANT:
   return { ...state, update_status: 'UPDATED' };
  
  case ACTIONS.UPDATE_EDIT_REQUEST_STATUS:
   return {...state, update_status: action.payload.status};
  
  case ACTIONS.DELETE_MERCHANT:
   return { ...state, delete_status: 'REQUESTED' };

  case ACTIONS.DELETED_MERCHANT:
   return { ...state, delete_status: 'DELETED' };

  default:
   return { ...state };
 }
}