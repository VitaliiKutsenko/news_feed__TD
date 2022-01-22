import CONTROLLER from './CONTROLLER'
const getRouteInfo = () => {
	const hash = location.hash ? location.hash.slice(1) : "";
	const [name, ...id] = hash.split('/')
	return {name, params: {id : id.join('/')}}
}
const handleHash = () => {
	const {name, params} = getRouteInfo()
	if (name) {
		const routName = name + 'Route'
		CONTROLLER[routName](params)
	}
}

export default {
	init(){
		addEventListener("hashchange", handleHash)
		handleHash()
	}
}

