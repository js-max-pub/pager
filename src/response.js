
export function notFound(html) {
	let std = `<div style='font-family:sans-serif; font-size:50px; text-align:center; margin-top:10em;'>page not found</div>`
	return new Response(html ?? std, {
		status: 404,
		headers: {
			"content-type": "text/html; charset=utf-8",
		}
	});
}

export function unauthorized(html) {
	return new Response(html ?? "401 unauthorized", {
		status: 401,
		headers: {
			"content-type": "text/html; charset=utf-8",
			"WWW-Authenticate": `Basic`, //, charset="UTF-8"  // chrome doesnt support concatenation
		},
	});
}


export function html(p) {
	return new Response(p ?? "", {
		status: 200,
		headers: {
			"content-type": "text/html; charset=utf-8",
		}
	});
}

export function json(p) {
	return new Response(JSON.stringify(p), {
		status: 200,
		headers: {
			"content-type": "application/json; charset=utf-8",
		}
	});
}
