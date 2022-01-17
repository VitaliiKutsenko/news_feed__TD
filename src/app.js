const API_KEY = '5ef33414-1934-47dc-9892-5d09ab7c00da'

const promise = fetch(`https://content.guardianapis.com/search?q=trending&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=${API_KEY}`)
promise
	.then(response => response.json())
	.then(item => console.log(item))