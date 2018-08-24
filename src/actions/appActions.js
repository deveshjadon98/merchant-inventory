import ACTIONS from '../constants/actionTypes';

export const configLoaded = (config) => {
	return {
		type: ACTIONS.CONFIG_LOADED,
		config: config
	}
}

export const requestMerchants = (payload) => {
	return {
		type: ACTIONS.REQUEST_MERCHANTS,
		payload: payload
	}
}

export const receiveMerchants = (payload) => {
	return {
		type: ACTIONS.RECEIVE_MERCHANTS,
		payload: payload
	}
}

export const requestMerchant = (payload) => {
	return {
		type: ACTIONS.REQUEST_MERCHANT,
		payload: payload
	}
}

export const receiveMerchant = (payload) => {
	return {
		type: ACTIONS.RECEIVE_MERCHANT,
		payload: payload
	}
}

export const resetMerchant = () => {
	return {
		type: ACTIONS.RESET_MERCHANT
	}
}

export const createMerchant = (payload) => {
	return {
		type: ACTIONS.CREATE_MERCHANT,
		payload: payload
	}
}

export const createdMerchant = (payload) => {
	return {
		type: ACTIONS.CREATED_MERCHANT,
		payload: payload
	}
}

export const updateCreateRequestStatus = (status) => {
	return {
		type: ACTIONS.UPDATE_CREATE_REQUEST_STATUS,
		payload: {status : status}
	}
}

export const updateMerchant = (payload) => {
	return {
		type: ACTIONS.UPDATE_MERCHANT,
		payload: payload
	}
}

export const updatedMerchant = (payload) => {
	alert('Merchant Updated');
	return {
		type: ACTIONS.UPDATED_MERCHANT,
		payload: payload
	}
}

export const updateEditRequestStatus = (status) => {
	return {
		type: ACTIONS.UPDATE_EDIT_REQUEST_STATUS,
		payload: {status : status}
	}
}

export const deleteMerchant = (id) => {
	return {
		type: ACTIONS.DELETE_MERCHANT,
		payload: {id : id}
	}
}

export const deletedMerchant = (payload) => {
	alert('Merchant Deleted');
	return {
		type: ACTIONS.DELETED_MERCHANT,
		payload: payload
	}
}