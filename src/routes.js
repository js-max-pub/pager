export class Routes {
	ROUTES = {}
	add(p = {}) {
		this.ROUTES = { ...this.ROUTES, ...p }
	}

	find(request) {
		let url = request.url
		// console.log('url',new URL(url))
		// console.log('qs',new URLSearchParams(new URL(url).search))
		// console.log('findRoute for', url)
		for (let route in this.ROUTES) {
			let pattern = new URLPattern({ pathname: route });
			// let res = pattern.test(url)
			// console.log('test', res)
			if (pattern.test(url))
				return { function: this.ROUTES[route], path: pattern.exec(url).pathname.groups, route }
			// return patterns[pattern](urlPattern.exec(url).pathname.groups)
		}
	}
}