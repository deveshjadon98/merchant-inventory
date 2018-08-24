import ACTIONS from '../constants/actionTypes';
import { take, call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { appActionCreator } from '../actions'

function getAllMerchants(API_URL) {
	return axios({
		method: 'get',
		url: API_URL
	})
		.catch(err => {
			console.log(err);
		});
}

function* getMerchantsWatcher() {
	while(true){
		const action = yield take(ACTIONS.REQUEST_MERCHANTS)
		try {
			const API_URL = yield select((state) => state.config.API_URL);
			const result = yield call(getAllMerchants, API_URL+'merchants');
			yield put(appActionCreator.receiveMerchants(result))
		} catch (err) {
		}
	}
}

function getMerchant(API_URL) {
	return axios({
		method: 'get',
		url: API_URL
	})
		.catch(err => {
			console.log(err);
		});
}

function* getMerchantWatcher() {
	while(true){
		const action = yield take(ACTIONS.REQUEST_MERCHANT)
		try {
			const API_URL = yield select((state) => state.config.API_URL);
			const result = yield call(getMerchant, API_URL+'merchants/'+action.payload);
			yield put(appActionCreator.receiveMerchant(result))
		} catch (err) {
		}
	}
}

function createMerchant(payload,API_URL){
	payload.data['bids'] = [];
	return axios({
		method: 'Post',
		url: API_URL,
		data: payload.data
	})
		.catch(err => {
			console.log(err);
		});
}

function* createMerchantWatcher(){
	while(true){
		const action = yield take(ACTIONS.CREATE_MERCHANT)
		try {
			const API_URL = yield select((state) => state.config.API_URL);
			const result = yield call(createMerchant, action.payload, API_URL+'merchants');
			yield put(appActionCreator.createdMerchant(result))
		} catch (err) {
		}
	}
}

function updateMerchant(payload,API_URL){
	return axios({
		method: 'put',
		url: API_URL,
		data: payload
	})
		.catch(err => {
			console.log(err);
		});
}

function* updateMerchantWatcher(){
	while(true){
		const action = yield take(ACTIONS.UPDATE_MERCHANT)
		try {
			const API_URL = yield select((state) => state.config.API_URL);
			const result = yield call(updateMerchant, action.payload.data, API_URL+'merchants/'+action.payload.id);
			yield put(appActionCreator.updatedMerchant(result))
		} catch (err) {
		}
	}
}

function deleteMerchant(id, API_URL){
	return axios({
		url: API_URL+'merchants/'+id,
		method: 'delete'
	})
		.catch(err => {
			console.log(err);
		});
}

function* deleteMerchantWatcher(){
	while(true){
		const action = yield take(ACTIONS.DELETE_MERCHANT)
		try {
			const API_URL = yield select((state) => state.config.API_URL);
			const result = yield call(deleteMerchant, action.payload.id, API_URL);
			yield put(appActionCreator.deletedMerchant(result))
		} catch (err) {
		}
	}
}

export default function* merchantSaga() {
	yield all([
		getMerchantWatcher(),
		getMerchantsWatcher(),
		createMerchantWatcher(),
		updateMerchantWatcher(),
		deleteMerchantWatcher()
	])
}