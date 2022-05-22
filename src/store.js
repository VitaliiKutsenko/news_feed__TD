export const store = {
	data: [],
	prevPage: [],
	status: true,
	idStore: [],
	mainInputData: '',
	pageInputData: '',
	typeOf(type) {
		return Object.prototype.toString.call(this[type]).toLowerCase().split(' ')[1].slice(0, -1)
	},


	setToStore(storePlace, info) {
		if (this.typeOf(storePlace) === 'string') {
			this[storePlace] = info
		}
		if (this.typeOf(storePlace) === 'array') {
			this[storePlace].push(info)
		}
		localStorage.setItem(storePlace, JSON.stringify(this[storePlace]))
		return info
	},
	getFromStore(item) {
		const getInfo = JSON.parse(localStorage.getItem(item))
		if (this.typeOf(item) === 'string') {
			// this[item] = getInfo
			return  this[item]
		}
		if (this.typeOf(item) === 'array') {
			const arr = getInfo ? getInfo : []
			this[item] = [...this[item],...arr.filter(item => !!item)]
			return  this[item]
		}
	},
	removeFromStore(key) {
		localStorage.removeItem(key)
		console.log(Object.prototype.toString.call(this[key]))
		if (Object.prototype.toString.call(this[key])) {

		}
	}


}