import * as crypto from './crypto.js'

export class Users {
	USERS = {}
	add(p = {}) {
		this.USERS = { ...this.USERS, ...p }
	}
	async find(request) {
		// crypto.subtle.digest('SHA-512', new TextEncoder().encode('hello')).then(x=>console.log('crypto',btoa(x)))
		// crypto.SHA('hello my friend').then(x => console.log('crypto:', x))
		// console.log('crypto',pw)
		let auth = request.headers.get('Authorization')
		// console.log('auth header', auth)
		if (!auth?.toLowerCase()?.startsWith('basic ')) return
		auth = auth.slice(6)
		// console.log('auth2', auth)
		let [user, pass] = atob(auth).split(':')
		// console.log('auth3', user, '--', pass)
		// if (user == 'NULL') return null
		if (this.USERS[user] == pass) return user
		if (this.USERS[user] == await crypto.SHA(pass)) return user
	}

}

