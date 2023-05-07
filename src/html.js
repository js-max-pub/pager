export const redirect = (url, time = 0) => `<meta http-equiv="refresh" content="${time}; URL=${url}">`
export const charset = (x = 'utf-8') => `<meta charset="${x}"/>`
export const viewport = x => `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`

export const message = x => `<h1 style="text-align: center; margin-top:7em; font-family: sans-serif; font-size:50px;">${x}</h1>`