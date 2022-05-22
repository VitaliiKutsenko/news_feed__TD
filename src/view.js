import helper from "./helper";

export default {
	appPreloader() {
		document.querySelector('.post-list').innerHTML = `
		 <div class="preloader">
            <div class="ouyBox">
                <div class="innerBox"></div>

            </div>
        </div>
		`
	},

	createPage(page) {
		const postList = document.querySelector('.post-list')
		postList.classList.add('page')
		document.querySelector('.search-words').classList.add('active')
		document.querySelector('#page-search').value += page.pageInputData || ''
		postList.innerHTML = `
		<article class="page">
			<header>${page.headerIMG || ''}
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
	createPostCard(post, main = null) {
		const area = post.hotest ? 'first' : 'other'
		const date = helper.dataFix(post.viewed, true)
		const active = date.date.length > 1 ? 'active' : 'disabled'
		const inputMain = document.querySelector('#search-input').value = post.inputMain
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
			<div class="post-card__time__container">
				<span class="post-card__time">Published ${post.time}</span>
				<span class="post-card__viewed__${active}"> ${date.date ? date.date : ""}</span>				
			</div>
				<a href="#page/${post.id}" data-role="nav-news" class="post-card-${area}__link">Read more</a>
			</div>
		</main>
	</article>`
	},

	renderPrevPage(post) {
		const searchWindow = document.querySelector('.search-window')
		if (post.status) {
			searchWindow.classList.remove('error')
			return `
		<section class="prev-section">
			<header class="prev-header">
				<a href="#page/${post.id}" data-role="nav-news" class="prev-link">${post.img}</a>
			</header>
			<main class="prev-main">
				<h2 class="prev-name">
					<a href="#page/${post.id}"
						data-role="nav-news"
						class="prev-link">${post.headline}
					</a>
				</h2>
				<p class="prev-post">${post.text}...</p>
			</main>
		</section>
		`
		}
		if (!post.status) {
			post.status = true
			searchWindow.classList.add('error')

		}


	},
	renderPage(store, id) {
		const page = store.data.find(item => item.id === id) || store.prevPage.find(item => item.id === id)
		this.createPage(page)
	},
	renderCards(posts, place = 'data') {
		let elem
		switch (place) {
			case 'data':
				elem = document.querySelector('.post-list')
				elem.classList.remove('page')
				document.querySelector('.search-words').classList.remove('active')

				elem.innerHTML = ""
				break
			case 'prevPage' :
				elem = document.querySelector('.search-window')
				elem.innerHTML = "";
				break
		}
		if (posts[place].length) {
			posts[place].reduce((data, post, index) => {
				data.img = post.fields.main ?
					helper.findTag(post.fields.main, 'img')
					: '<img class="no-image" src="#" alt="no-image"/>'
				data.headline = post.fields.headline || ''
				data.text = post.fields.trailText || ''
				data.time = post.publishAgo.daysAgo || ''
				data.hotest = post.hotest || ''
				data.id = post.id || ''
				data.status = posts.status
				const times = posts.idStore.map((item, i) => !!item[post.id] ? item[post.id] : 'str')
				data.viewed = times.join(' ') || ''
				data.inputMain = posts.mainInputData
				data.pageInputData = posts.pageInputData
				Object.assign(posts.data[index], {headerIMG: data.img})
				elem.innerHTML += place === 'data' ? this.createPostCard(data) : this.renderPrevPage(data)
				return data
			}, {})
		}
	},

}