import { base64encode, generateRandomString, sha256 } from "./utils";

const codeVerifier: string = generateRandomString(64)
const hashed: ArrayBuffer = await sha256(codeVerifier)
const codeChallenge: string = base64encode(hashed)
