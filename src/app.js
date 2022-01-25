import './style.css'
import api from "./api.js";
import route from './route.js'
import view from "./view";
import {store} from "./store";
import {listenClearBtn, listenSearchBtn, listenSearchInput} from "./search.js";
import {searchOnPlace} from "./searchOnPage";
import {burgerMenu} from "./burgerMenu";

const parseData = async (param = 'trendings',storePlace = 'data') => {
	await api.response(param,storePlace)
	store.getFromStore('idStore')
	store.getFromStore('mainInputData')
	store.getFromStore('pageInputData')
	await view.renderCards(store,storePlace)
	await route.init()
}


(async () => {
	try {
		await parseData('trendings','data')

	} catch (e) {
		console.log('ERROR' + e.message)
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


listenSearchInput(parseData,store)
listenSearchBtn(parseData)
listenClearBtn(store)
burgerMenu(parseData)