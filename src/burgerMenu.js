const menu = document.querySelector('.burger-menu-nav')
const burger = document.querySelector('.burger-menu__btn')
const categoriesMenu = [...document.querySelectorAll('.burger-menu-categories')]
const trendings = document.querySelector('.trending')

export const burgerMenu = (fn) => {
	burger.addEventListener('click', e => {
		e.currentTarget.previousElementSibling.classList.toggle('active')
		e.currentTarget.firstElementChild.classList.toggle('active')
	})
	menu.addEventListener('click', e => {
		e.target.classList.toggle('active')
		e.currentTarget.firstElementChild.classList.toggle('active')
	})
	categoriesMenu.map(item => {
		item.addEventListener('click',e=>{
			e.preventDefault()
			fn(e.target.textContent.toLowerCase())
		})
	})
	trendings.addEventListener('click',e => {
		e.preventDefault()
		fn(e.target.textContent.toLowerCase())
	} )

}
