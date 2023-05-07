
import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { serveTls } from "https://deno.land/std@0.135.0/http/server.ts";
import { Routes } from './routes.js'
import { Users } from './users.js'
// serve(handler, { port: 8000 })
import { notFound } from "./response.js";
// import { Log } from '../../log/mod.js'
import { Log } from 'https://jsv.max.pub/@js-max-pub/log/2022/mod.js'

let log = new Log('pager')

// let priv = Deno.readTextFileSync('private.pem')
// let pub = Deno.readTextFileSync('public.pem')

export class Pager {
	routes = new Routes()
	users = new Users()

	constructor({ port = 8000 } = {}) {
		// this.routes = new Routes()
		log.info(`starting pager on port ${port}`)
		serve(x => this.request(x), { port });
		// serveTls(x => this.request(x), { port, certFile: './src/public.pem', keyFile:'./src/private.pem'});
		// serveTls(x => this.request(x), { port, certFile: './certificate.pem', keyFile:'./key.pem'});
	}
	async request(request) {
		// console.log('request', request.url)
		// console.log('routes', this.routes)
		let route = this.routes.find(request)
		// console.log()
		if (!route) return notFound()
		let USER = await this.users.find(request)
		let queryString = Object.fromEntries(new URLSearchParams(new URL(request.url).search))
		let HEAD = Object.fromEntries(request.headers)
		let FORM
		if(HEAD['content-type'] == 'application/x-www-form-urlencoded'){
			FORM = await request.formData()
			FORM = Object.fromEntries(FORM)
			// console.log("ENTRIES",Object.fromEntries(FORM))
		}
		// console.log("req",request)
		// console.log("form",request.formData)
		// const body = await request.body({ type: 'form-data'})
		// const data = await body.value.read()
		// console.log(data)
		// let FORM = await request.request.formData()
		// console.log("FORM",FORM)
		// console.log('headers', headers)
		// let formData = request.formData() // https://developer.mozilla.org/en-US/docs/Web/API/Request/formData
		log.info(request.url, '->', route.route, '->', `${route.function.name}(@${USER}, ${JSON.stringify(route.path)}, ${JSON.stringify(queryString)})`)
		// console.log('qs', queryString)
		// if (!USER) return unauthorized()
		return await route.function({ ...route.path, ...queryString, USER, HEAD, FORM, request })
		// return new Response("Hello World\n")

	}
}













// new Pager()

// export function start({ port = 8000 } = {}) {
// 	// serve(handler, { port });
// }



// function handler(request) {
// 	let route = routes.find(request)
// 	if (!route) return notFound()
// 	let USER = checkAuth(request)
// 	let queryString = Object.fromEntries(new URLSearchParams(new URL(request.url).search))
// 	console.log('qs', queryString)
// 	// if (!USER) return unauthorized()
// 	return route.function({ ...route.path, ...queryString, USER })
// 	// return new Response("Hello World\n")

// }



// export const routes = new class {


// let ROUTES = {}
// export function add(p = {}) {
// 	ROUTES = { ...ROUTES, ...p }
// }

// function findRoute(url) {
// 	console.log('findRoute for', url)
// 	for (let route in ROUTES) {
// 		let pattern = new URLPattern({ pathname: route });
// 		// let res = pattern.test(url)
// 		// console.log('test', res)
// 		if (pattern.test(url))
// 			return { function: patterns[pattern], path: urlPattern.exec(url).pathname.groups }
// 		// return patterns[pattern](urlPattern.exec(url).pathname.groups)
// 	}
// }









