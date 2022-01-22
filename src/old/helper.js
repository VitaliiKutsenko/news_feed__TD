export default function $el(el, content, atributes = {}) {
	const checkArgs = (numArgs, type) =>
		arguments.length === numArgs + 1 && typeof arguments[numArgs] === type;
	const element = document.createElement(el);
	if (checkArgs(0, "string")) {
		return element;
	} else if (checkArgs(1, "string")) {
		element.innerText = content || "";
		return element;
	} else if (checkArgs(2, "object")) {
		function reqObj(obj) {
			for (let [key, value] of Object.entries(obj)) {
				element[key] = value;
			}
		}
		reqObj(atributes);
	}
	element.innerText = content || "";
	return element;
}
