import API from "./api";
import view from "./view";
import {store} from "./store";
import {searchOnPlace} from "./searchOnPage";
import route from "./route";

export default {
	async newsRoute(params){
		window.scrollBy(0, -window.pageYOffset)


		await view.renderCards(store)
	},
	async pageRoute(params){
		if(params.id){
			window.scrollBy(0, -window.pageYOffset)
			store.setToStore('idStore',{[params.id]:new Date().toJSON()},'id')
			await view.renderPage(store,params.id)
			await searchOnPlace(store)

		}
	},
}

