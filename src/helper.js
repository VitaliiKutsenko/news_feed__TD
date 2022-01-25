export default {
	dataFix(createdTime, options = false) {
		const currentTime = new Date()
		const calcTime = new Date(Date.parse(createdTime))
		const time = this.getTime(calcTime, currentTime)
		if (options) {
			const calcTime = new Date(Date.parse(createdTime.split('str').join('').trim()))
			const time = this.getTime(calcTime, currentTime)
			return {
				date: `${Object.values(time||{})} ${Object.keys(time||{})}`,
				daysAgo: ''
			}
		}
		return {
			date: `(${Object.values(time||{})} ${Object.keys(time||{})})`,
			daysAgo: Math.floor(Math.abs(currentTime.getTime() - calcTime.getTime()) / (1000 * 3600 * 24)) + ' ' + 'days ago'
		}
	},
	getTime(calcTime, currentTime) {
		if (calcYear()) return {'years': calcYear()}
		if (calcMonths()) return {'months': calcMonths()}
		if (parseInt(calcDays())) return {'days': parseInt(calcDays())}
		if (calcHours()) return {'hours': calcHours()}
		if (calcMinutes()) return {'minutes': calcMinutes()}
		if (calcSeconds()) return {'seconds': calcSeconds()}

		function calcYear() {
			return (Math.floor(calcDays() / 365))
		}

		function calcMonths() {
			return (Math.floor((calcDays() - (calcYear() * 365)) / 30))
		}

		function calcDays() {
			return (Math.abs(currentTime.getTime() - calcTime.getTime()) / (1000 * 3600 * 24))
		}

		function calcHours() {
			return parseInt(calcDays() * 24)
		}

		function calcMinutes() {
			return parseInt(calcDays() * 1440)
		}

		function calcSeconds() {
			return parseInt(calcDays() * 86400)
		}
	},
	fixTimeFormat(time) {
		const formatOptions = {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		};
		const times = new Date(Date.parse(time))
		return times.toLocaleDateString('en-US', formatOptions).replace(',', ' ')
	},
	findTag(tags, tagName) {
		const regExp = /<[^<>]+>/g
		const splits = tags.match(regExp)
		if (arguments.length > 1) {
			return splits.find(item => item.includes(tagName)) ? splits.find(item => item.includes(tagName)) : '<img class="No image available!" src="#" alt="no-image"/>'
		} else {
			return splits
		}

	}
}