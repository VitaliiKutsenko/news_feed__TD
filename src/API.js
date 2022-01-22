import {store} from "./store";
import {dataFix} from "./dataFix";

export default {
	API_KEY: '5ef33414-1934-47dc-9892-5d09ab7c00da',
	URL: 'https://content.guardianapis.com/',
	response() {
		return new Promise((resolve, reject) => {
			const promise = fetch(`
			${this.URL}search?q=trending
			&show-tags=all
			&page-size=20
			&show-fields=all
			&order-by=relevance
			&api-key=${this.API_KEY}
			`);
			resolve(promise)
		})
			.then(response => response.json())
			.then(item => store.data = [...collectData(item.response.results)])
			.then(item => store.data[num.item].hotest = true)
			.catch(err => new Error(err));
	}
}
let num = {nums:Infinity,item:0}
const collectData = (data) => {
	return data.map((item,index) => {
	item.publishAgo = dataFix(item.webPublicationDate)
		if(parseInt(dataFix(item.webPublicationDate).daysAgo) < num.nums){
			num.nums = parseInt(dataFix(item.webPublicationDate).daysAgo)
			num.item = index
		}

		return item
	})

}