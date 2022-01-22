// import {API} from "../API";
// import {addPostList} from "./newsCard";
// import {route} from "../ROUT";
//
// import {store} from "../store";
//
//
// const response = async () => {
// 	await API()
// 	// route('#/')
// 	await addPostList(store.data)
//
// }
// response()
// const menu = document.querySelector('.burger-menu-nav')
// const burger = document.querySelector('.burger-menu__btn')
// burger.addEventListener('click', e => {
// 	e.currentTarget.previousElementSibling.classList.toggle('active')
// 	e.currentTarget.firstElementChild.classList.toggle('active')
// })
// menu.addEventListener('click', e => {
// 	e.target.classList.toggle('active')
// 	e.target.firstElementChild.classList.toggle('active')
// })
//
//
// const main = document.querySelector('.main')
//
// main.addEventListener('click', e => {
// 	if (e.target.closest('.href')) {
// 		e.stopPropagation()
// 		route(e.target.dataset.href)
// 	}
// })
//
// const card = document.querySelector('.post-list')
//
// card.addEventListener('click',e=>{
// 	if(e.target.closest('.gu-image')){
// 		route('#/news')
// 	}
// })