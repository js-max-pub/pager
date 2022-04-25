// // import * as pager from './pager/mod.js'
// pager.start({ port: 8000 })
// pager.routes.add({
// 	'/books/:id': books,
// 	'*': nix,
// })

import { Pager, response } from './mod.js'
// import * as response from './pager/response.js'
import { Log } from '../log/mod.js'
let log = new Log('testpage')


let pager = new Pager({ port: 8000 })
pager.routes.add({
	'/books/:id': books,
	// '/logout': logout,
	'/logout': response.unauthorized,
	'*': nix,
})
pager.users.add({
	max: 'asdf'
})
// pager.groups.add({
// 	admin: ['max', 'hauke'],
// })

// function logout() {
// 	return response.unauthorized()
// }

function nix({ USER }) {
	log.info('nix', 'user', USER)
	return new Response(`nix zu sehen`)
	// return unauthorized()
}

function books({ id, option, USER, ...more } = {}) {
	if (!USER) return response.unauthorized()
	log.info('books??', id, option, 'user', USER, JSON.stringify(more))
	return new Response(`books: ${id}`)
}