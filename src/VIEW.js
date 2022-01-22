
export default {
	createPage(page) {
		// const replaceClass = (str) => {
		// 	const regEx = /post-card/g
		// 	return  str.replace(regEx,'page')
		// }
		console.log(page)
		const postList = document.querySelector('.post-list')
		postList.innerHTML = `
	
	<article>
<header>${page.headerIMG}</header>
<main class="pages">${page.fields.body}</main>	
</article>

`
	},
	renderPage(store, id) {
		const page = store.data.find(item => item.id === id)
		this.createPage(page)
	},

	createPostCard(post,main = null) {
		const area = post.hotest ? 'first' : 'other'
		return `
	<article class="post-card-${area}">
    <header class="post-card-${area}__head">
    <a href="#page/${post.id}" data-role="nav-news" class="post-card-${area}__link">${post.img}</a>
    </header>
    <main class="post-card-${area}__container">
    <h2>${post.headline}</h2>
    <p class="post-card-${area}__text">${post.text}...</p>
    <p class="post-card-${area}__time">Published ${post.time}</p>
    </main>
</article>`
	},
	renderCards(posts) {
		const postList = document.querySelector('.post-list')
		// postList.classList.remove('page')
		postList.innerHTML = "";
		if (posts.data.length) {
			posts.data.reduce((data, post, index) => {
				data.img = this.findTag(post.fields.main, 'img')
				data.headline = post.fields.headline
				data.text = post.fields.trailText
				data.time = post.publishAgo.daysAgo
				data.hotest = post.hotest
				data.id = post.id
				Object.assign(posts.data[index],{headerIMG:data.img})
				postList.innerHTML += this.createPostCard(data)
				return data
			}, {})
		}
	},
	findTag(tags, tagName) {
		const regExp = /<[^<>]+>/g
		const splits = tags.match(regExp)
		return splits.find(item => item.includes(tagName))
	}
}