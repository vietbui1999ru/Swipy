/**
 * Spotify API token response interface.
 * 
 * On success, the response will have a 200 OK status and the following JSON data in the response body.
 * Used for both Authorization Code with PKCE flow and Client Credentials flow.
 * 
 * @see {@link https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow | Spotify PKCE Flow Documentation}
 * @see {@link https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow | Client Credentials Flow}
 * 
 * @example
 * ```typescript
 * const tokenResponse: SpotifyTokenResponse = await getSpotifyToken();
 * console.log(`Token expires in ${tokenResponse.expires_in} seconds`);
 * ```
 */
interface SpotifyTokenResponse {
	/**
	 * The access token for subsequent API calls.
	 * This token must be included in the Authorization header as "Bearer {access_token}".
	 * 
	 * @type {string}
	 */
	access_token: string;

	/**
	 * How the access_token should be used in API requests.
	 * Always set to "Bearer" for Spotify API.
	 * 
	 * @type {'Bearer'}
	 * @readonly
	 * @default "Bearer"
	 */
	token_type: 'Bearer';

	/**
	 * List of scopes granted for this access_token.
	 * Only present in Authorization Code flow responses.
	 * Space-separated list of permission scopes.
	 * 
	 * @type {string}
	 * @optional
	 * @example "user-read-private user-read-email playlist-read-private"
	 * @see {@link https://developer.spotify.com/documentation/web-api/concepts/scopes | Spotify Scopes Documentation}
	 */
	scope?: string;

	/**
	 * Time in seconds that the access token is valid.
	 * Typically 3600 seconds (1 hour) for Spotify tokens.
	 * After this time, the token must be refreshed or re-requested.
	 * 
	 * @type {number}
	 * @example 3600
	 * @unit seconds
	 */
	expires_in: number;

	/**
	 * Security credential that allows clients to obtain new access tokens without re-authorization.
	 * Only present in Authorization Code flow responses, not in Client Credentials flow.
	 * Should be stored securely and used to refresh expired access tokens.
	 * 
	 * @type {string}
	 * @optional
	 * @security This token should be stored securely and never exposed to client-side code
	 * @example "AQBjMJUlQ9pL5K8N7R2m3..."
	 */
	refresh_token?: string;
}

/**
 * Spotify Debugging interface 
 * When requesting tokens fail, record and return error type, and its detailed description
 * */
interface SpotifyError {
	error: string;
	error_description: string;
}

//Environment Variables. Stored locally for security.
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

/**
 * Function to get access Token for future Web API Calls.
 * Handles unexpected errors.
	*/
export async function getSpotifyToken(): Promise<string> {
	try {
		// fetch response
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Application': 'Basic' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
			},
			body: 'grant-type=client-credentials',

		})
		if (!response.ok) {
			const errorData: SpotifyError = await response.json();
			throw new SpotifyAuthError(
				`Spotify API error:: {$errorData.error}`,
				errorData.error,
				errorData.error_description,
			);
		}
		const data: SpotifyTokenResponse = await response.json();

		// safely returns the Spotify access token
		return data.access_token;

	} catch (error) {
		if (error instanceof SpotifyAuthError) {
			throw error
		}
		console.error('Failed to get Spotify token:', error);
		throw new Error('Unable to authenticate with Spotify');

	}
}

/**
 * Custom Spotify Authentication Error Class.
	*/
class SpotifyAuthError extends Error {
	constructor(
		message: string,
		public readonly errorCode: string,
		public readonly errorDescription: string
	) {
		super(message);
		this.name = 'SpotifyAuthError';
	}
}
