// function bytesToBase64(buffer) {
// 	return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
// }

const bytesToBase64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)))
const lineLimit = (string, limit = 80) => string.match(new RegExp(`.{1,${limit}}`, 'g')).join('\n')

export async function SHA(string, n = 512) {
	let input = new TextEncoder().encode(string)
	let hash = await crypto.subtle.digest(`SHA-${n}`, input)
	let hex = bytesToBase64(hash)
	return hex
}


const cryptoKeyToBase64 = async (key, encoding) => bytesToBase64(await window.crypto.subtle.exportKey(encoding, key))


async function getCryptoKeys() {
	// const options = {
	// 	name: 'RSASSA-PKCS1-v1_5',
	// 	modulusLength: 2048,
	// 	publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
	// 	hash: { name: 'SHA-256' },
	// };

	const keys = await window.crypto.subtle.generateKey(
		{
			name: 'RSASSA-PKCS1-v1_5',
			modulusLength: 2048,
			publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
			hash: { name: 'SHA-256' },
		},
		true,
		// false, // non-exportable (public key still exportable)
		// ["encrypt", "decrypt"]
		['sign', 'verify'],
	);

	// const publicKey = await window.crypto.subtle.exportKey('spki', keys.publicKey);
	// const privateKey = await window.crypto.subtle.exportKey('pkcs8', keys.privateKey);
	// console.log('priv', keys.privateKey)

	// let body = window.btoa(String.fromCharCode(...new Uint8Array(publicKey)));
	// let body = bytesToBase64(publicKey)
	// body = body.match(/.{1,64}/g).join('\n');
	// -----BEGIN PRIVATE KEY-----

	let publicKey = await cryptoKeyToBase64(keys.publicKey, 'spki')
	let privateKey = await cryptoKeyToBase64(keys.privateKey, 'pkcs8')
	return {
		public: `-----BEGIN CERTIFICATE-----\n${lineLimit(publicKey, 64)}\n-----END CERTIFICATE-----`,
		private: `-----BEGIN PRIVATE KEY-----\n${lineLimit(privateKey, 64)}\n-----END PRIVATE KEY-----`,
	}
}


// async function keys() {
// 	return await window.crypto.subtle.generateKey(
// 		{
// 			name: "HMAC",
// 			hash: { name: "SHA-512" }
// 		},
// 		true,
// 		["sign", "verify"]
// 	);
// }

if (import.meta.main) {
	let keys = await getCryptoKeys()
	console.log(keys)
	Deno.writeTextFileSync('public.pem',keys.public)
	Deno.writeTextFileSync('private.pem',keys.private)
	// console.log('keys: ', await keys())
	// console.log('SHA: ', await SHA('hello2'))
}