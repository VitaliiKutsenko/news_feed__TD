import API from "./API";
import VIEW from "./VIEW";
import {store} from "./store";

export default {
	async newsRoute(params){
			VIEW.renderCards(store)
	},
	async pageRoute(params){
		if(params.id){
			VIEW.renderPage(store,params.id)
		}
	},
}