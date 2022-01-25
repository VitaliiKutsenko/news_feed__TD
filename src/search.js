export const listenSearchInput = async (fn,storeFn) => {
	document.querySelector('#search-input').addEventListener('keyup', async e => {
		if (e.target.value) {
			 storeFn.setToStore('mainInputData',e.target.value)
			e.currentTarget.parentElement.lastElementChild.classList.add('active')
		}
		if (!e.target.value) {
			e.currentTarget.parentElement.lastElementChild.classList.remove('active')
			e.currentTarget.parentElement.nextElementSibling.classList.remove('active')
		}
		if (e.key === 'Enter') {
			await e.currentTarget.parentElement.nextElementSibling.classList.add('active')
			await fn(e.target.value, 'prevPage')
		}
		if (e.target.value === '') {
			storeFn.removeFromStore('mainInputData')
			e.currentTarget.parentElement.nextElementSibling.classList.remove('active')

		}
		e.target.value = storeFn.setToStore('mainInputData',e.target.value)

	})
}
export const listenSearchBtn = async (fn) => {
	document.querySelector('.search-btn')
		.addEventListener('click', async e => {
			await fn(e.currentTarget.nextElementSibling.value, 'prevPage')
		})
}
export const listenClearBtn = (storeFn) => {
	document.querySelector('.search-btn__clear')
		.addEventListener('click', e => {
			e.currentTarget.previousElementSibling.value = ''
			storeFn.removeFromStore('mainInputData')
			e.currentTarget.classList.remove('active')
			e.currentTarget.parentElement.nextElementSibling.classList.remove('active')
		})
}