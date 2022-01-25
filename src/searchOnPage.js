export const searchOnPlace = (storeFn) => {
	let count = 0;
	let val = storeFn.getFromStore('pageInputData')
	function handleSearch(searchCallback) {
		document.querySelector('#page-search').addEventListener('keyup', e => {
			val = e.target.value
			if(e.target.value){
				storeFn.setToStore('pageInputData',e.target.value)
			}
			if (e.key === 'Enter' && e.target.value !== '') {
				searchCallback(e.target.value)
				e.target.parentElement.nextElementSibling.textContent = `found ${count} coincidences`
			}
			if(e.target.value === '' || e.target.value !== val){
				storeFn.removeFromStore('pageInputData')
				const mark = [...document.querySelectorAll('.marks')]
				mark.forEach(item => item.remove())
				e.target.parentElement.nextElementSibling.textContent = ''
			}
		});
	}


	handleSearch( (value) => {
		const elems = document.querySelectorAll(`.page p`)
		function parseMark(val) {
			elems.forEach((elem) => {
				let regExp = new RegExp(val, 'gi')
				const elemArr = [...elem.innerText.matchAll(regExp)]
				elemArr.map(pos => {
						count++
					elem.innerHTML = insertMark(pos.input,pos.index, val.length)
					}
				)
			})
		}
		parseMark(value)
		function insertMark(str, pos, len) {
			return  str.slice(0,pos) + `<mark class="marks">`+str.slice(pos, pos + len)+`</mark>` + str.slice(pos + len)
		}
	});

}
