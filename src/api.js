import view from "./view";
import helper from "./helper";
import {store} from "./store";

export default {
	API_KEY: '5ef33414-1934-47dc-9892-5d09ab7c00da',
	URL: 'https://content.guardianapis.com/',
	response(search, storePlace) {
		return new Promise((resolve, reject) => {
			if (storePlace === 'data') {
				view.appPreloader()
			}
			const promise = fetch(`
			${this.URL}search?q=${search}
			&show-tags=all
			&page-size=19
			&show-fields=all
			&order-by=relevance
			&api-key=${this.API_KEY}
			`);
			resolve(promise)
		})
			.then(response => response.json())
			.then(item => store[storePlace] = [...collectData(item.response.results)])
			.then(item => store[storePlace][num.item].hotest = true)
			.catch(err => {
				store.status = false
				view.renderPrevPage(store)
				console.log(err)
			});
	}
}
let num = {nums: Infinity, item: 0}
const collectData = (data) => {
	return data.map((item, index) => {
		item.publishAgo = helper.dataFix(item.webPublicationDate)
		if (parseInt(item.publishAgo.daysAgo) < num.nums) {
			num.nums = parseInt(item.publishAgo.daysAgo)
			num.item = index
		}
		return item
	})

}