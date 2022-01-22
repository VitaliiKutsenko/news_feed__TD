const createNewsPage = (post) => {
	return `
	<article class="post-card ${post.first ? 'first' : 'other'}">
		<header class="post-card__head">
			<a href="#">${post.img}</a>
		</header>
    	<h2 class="head-article">${post.headline}</h2>
		<main class="post-card__container">
			<p class="post-card__text">${post.text}...</p>
			<p class="post-card__time">Published ${post.time}</p>
		</main>
</article>`
}
export const addPostList = (news) => {
	const newsPage = document.querySelector('.newsPage')
	newsPage.innerHTML = ``;
	if (news.length) {
		const sortPost = [...news].sort((a, b) => new Date(b.webPublicationDate) - new Date(a.webPublicationDate))
		sortPost.reduce((data, post, index) => {
			const {daysAgo} = dataFix(post.webPublicationDate)
			data.img = findTag(post.fields.main, 'img')
			data.headline = post.fields.headline
			data.text = post.fields.trailText
			data.time = daysAgo
			// data.id = id
			newsPage.innerHTML += createNewsPage(data)
			return data
		}, {})

	}
}
const findTag = (tags, tagName) => {
	const regExp = /<[^<>]+>/g
	const splits = tags.match(regExp)
	return splits.find(item => item.includes(tagName))
}
