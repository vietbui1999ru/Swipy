/**
 * Generate random string crypto secure
 * @param {number} length : length of string
 * @returns {string} : output random string
 */

export const generateRandomString = (length: number): string => {
	const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const values: Uint8Array = crypto.getRandomValues(new Uint8Array(length))

	return values.reduce((acc, x) => acc + possible[x % possible.length], "")
}

export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
	const encoder: TextEncoder = new TextEncoder()
	const data: Uint8Array = encoder.encode(plain)
	return window.crypto.subtle.digest('SHA-256', data)
}

export const base64encode = (input: ArrayBuffer): string => {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
}
