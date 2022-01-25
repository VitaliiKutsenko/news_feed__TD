import controller from './controller'
const getRouteInfo = () => {
	const hash = location.hash ? location.hash.slice(1) : "";
	const [name, ...id] = hash.split('/')
	return {name, params: {id : id.join('/')}}
}
const handleHash = () => {
	const {name, params} = getRouteInfo()
	if (name) {
		const routeName = name + 'Route'
		controller[routeName](params)
	}
}

export default {
	init(){
		addEventListener("hashchange", handleHash)
		handleHash()
	}
}

