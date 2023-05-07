
// export function notFound(html) {
// 	let std = `<div style='font-family:sans-serif; font-size:50px; text-align:center; margin-top:10em;'>page not found</div>`
// 	return new Response(html ?? std, {
// 		status: 404,
// 		headers: {
// 			"content-type": "text/html; charset=utf-8",
// 		}
// 	});
// }

// export function unauthorized(html) {
// 	return new Response(html ?? "401 unauthorized", {
// 		status: 401,
// 		headers: {
// 			"content-type": "text/html; charset=utf-8",
// 			"WWW-Authenticate": `Basic`, //, charset="UTF-8"  // chrome doesnt support concatenation
// 		},
// 	});
// }
// export function logout(html) {
// 	return new Response(html ?? "logged out", {
// 		status: 401,
// 		headers: {
// 			"content-type": "text/html; charset=utf-8",
// 		},
// 	});
// }
// export function redirect(url) {
// 	return new Response('redirect to ' + url, {
// 		status: 307,
// 		headers: {
// 			"content-type": "text/html; charset=utf-8",
// 			"Location": url
// 		},
// 	});
// }

export const std = (content, status, headers = {}) => new Response(content, { status, headers })
export const ct = type => ({ "content-type": `${type}; charset=utf-8` })
export const redirect = url => std('', 307, { Location: url })
export const logout = html => std(html, 401, ct('text/html'))
export const unauthorized = html => std(html, 401, { ...ct('text/html'), "WWW-Authenticate": "Basic" })
export const notFound = html => std(html, 404, ct('text/html'))
export const OK = (content, type) => std(content, 200, { ...ct(type) })
export const html = p => OK(p, 'text/html')
export const json = p => OK(p, 'application/json')
export const text = p => OK(p, 'text/plain')
export const user = ({ USER }) => OK(USER, 'text/plain')

