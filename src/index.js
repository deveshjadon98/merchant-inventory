import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './layouts/Merchant/Merchant';

import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import configStore from './store/configureStore';
import { appActionCreator } from './actions';

const store = configStore();

//get the API URL and save it into a global 'CONFIG' object
let configFilePath = '/config.dev.json';

this.getConfig = () => {
	return axios.get(configFilePath)
		.then(res => {
			window.CONFIG = res.data;
			store.dispatch(appActionCreator.configLoaded(window.CONFIG));
		})
		.catch(err => {
			console.log('Error reading config.json');
		});
}

this.getConfig()
	.then(() => {

		ReactDOM.render(
			<Provider store={store} >
				<App />
			</Provider>,
			document.getElementById('root')
		);

		registerServiceWorker();
	})
	.catch(err => console.log("Axios config file err: ", err));
