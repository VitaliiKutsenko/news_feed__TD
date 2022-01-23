import helper from "./helper";
export default {
	createPage(page) {
		const postList = document.querySelector('.post-list')
		postList.classList.add('page')
		postList.innerHTML = `
	
	<article>
		<header>
			${page.headerIMG}
			<h2>${page.fields.headline}</h2>
			<div>
				<p>Wriitten by ${page.fields.byline}</p>
				<p>${helper.fixTimeFormat(page.webPublicationDate)}</p>
			</div>
		</header>
		<main class="pages">${page.fields.body}</main>	
	</article>

`
	},
	renderPage(store, id) {
		const page = store.data.find(item => item.id === id)
		this.createPage(page)
	},
	createPostCard(post, main = null) {
		const area = post.hotest ? 'first' : 'other'
		return `
	<article class="post-card-${area}">
		<header class="post-card-${area}__head">
			<a href="#page/${post.id}" data-role="nav-news" class="post-card-${area}__link">${post.img}</a>
		</header>
		<main class="post-card-${area}__container">
			<h2>
				<a href="#page/${post.id}"
				 data-role="nav-news" 
				 class="post-card-${area}__link">${post.headline}
				 </a>
			</h2>
			<p class="post-card-${area}__text">${post.text}...</p>
			<div class="post-card-${area}__timeContainer">
				<span class="post-card__time">${post.time}</span>
				<a href="#page/${post.id}" data-role="nav-news" class="post-card-${area}__link">Read more</a>
			</div>
		</main>
	</article>`
	},
	renderCards(posts) {
		const postList = document.querySelector('.post-list')
		postList.classList.remove('page')
		postList.innerHTML = "";
		if (posts.data.length) {
			posts.data.reduce((data, post, index) => {
				data.img = this.findTag(post.fields.main, 'img')
				data.headline = post.fields.headline
				data.text = post.fields.trailText
				data.time = post.publishAgo.daysAgo
				data.hotest = post.hotest
				data.id = post.id
				Object.assign(posts.data[index], {headerIMG: data.img})
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