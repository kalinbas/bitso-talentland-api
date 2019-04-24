// gets details from funding with private API

const superagent = require('superagent')
const crypto = require('crypto')
require('dotenv').config()

let nonce = new Date().getTime()

let id = "..."

let authHeader = createAuthHeader(
    process.env.BITSO_PROD_KEY, 
    process.env.BITSO_PROD_SECRET, 
    nonce, 
    "GET", 
    "/v3/fundings/" + id,
    ""
)

superagent
    .get("https://api.bitso.com/v3/fundings/" + id)
    .set('Authorization', authHeader)
    .then(res => { console.log(res.body.payload) })

function createAuthHeader(apiKey, apiSecret, nonce, httpMethod, requestPath, jsonPayload) {

    // Create the signature
    var data = nonce + httpMethod + requestPath + jsonPayload

    // Create signature
    var signature = crypto.createHmac('sha256', apiSecret).update(data).digest('hex')

    // Build the auth header
    return "Bitso " + apiKey + ":" + nonce + ":" + signature
}