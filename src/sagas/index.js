import { fork } from "redux-saga/effects";
import { all } from 'redux-saga/effects';
import merchantSaga from './merchantSaga';
export default function* rootSaga() {
	yield all([
		fork(merchantSaga)
	]);
}