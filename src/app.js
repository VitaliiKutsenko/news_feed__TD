import './style.css'


import API from "./API.js";
import CONTROLLER from './CONTROLLER'
import ROUT from './ROUT.js'
import VIEW from "./VIEW";
import {store} from "./store";

(async () => {
	try {
		const root = document.querySelector('.post-list')
		const resp = await API.response()
		VIEW.renderCards(store)
		ROUT.init()

	}catch (e) {
		alert('ERROR' + e.message)
	}
})()