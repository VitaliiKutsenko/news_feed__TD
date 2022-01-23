import './style.css'


import API from "./API.js";
import ROUT from './ROUT.js'
import VIEW from "./VIEW";
import {store} from "./store";

(async () => {
	try {
		const root = document.querySelector('.post-list')
		const resp = await API.response()
		VIEW.renderCards(store)
		ROUT.init()

	} catch (e) {
		alert('ERROR' + e.message)
	}
})()


const btn = document.querySelector('.btn-scroll-up')
window.addEventListener('scroll', async e => {
	const height = document.documentElement.clientHeight / 2
	if (pageYOffset > height) {
		btn.classList.add('active')
	} else {
		btn.classList.remove('active')
	}
})
btn.addEventListener('click', e => {
	window.scrollBy(0, -window.pageYOffset)
})