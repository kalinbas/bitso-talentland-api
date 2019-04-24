// sets webhook URL from private API

const superagent = require('superagent')
const crypto = require('crypto')
require('dotenv').config()

let nonce = new Date().getTime()

let body = {
    callback_url: "..."
}

let authHeader = createAuthHeader(
    process.env.BITSO_PROD_KEY, 
    process.env.BITSO_PROD_SECRET, 
    nonce, 
    "POST", 
    "/v3/webhooks", 
    JSON.stringify(body)
)

superagent
    .post("https://api.bitso.com/v3/webhooks")
    .set('Content-Type', 'application/json')
    .set('Authorization', authHeader)
    .send(body)
    .then(res => { console.log(res.body.payload) })

function createAuthHeader(apiKey, apiSecret, nonce, httpMethod, requestPath, jsonPayload) {

    // Create the signature
    var data = nonce + httpMethod + requestPath + jsonPayload

    // Create signature
    var signature = crypto.createHmac('sha256', apiSecret).update(data).digest('hex')

    // Build the auth header
    return "Bitso " + apiKey + ":" + nonce + ":" + signature
}