const superagent = require('superagent')
const crypto = require('crypto')

require('dotenv').config()

let nonce = new Date().getTime()

let authHeader = createAuthHeader(process.env.BITSO_KEY, process.env.BITSO_SECRET, nonce, "GET", "/v3/balance", "")

superagent.get("https://api-dev.bitso.com/v3/balance").set('Authorization', authHeader).then(res => {
    console.log(res.body.payload)
})

function createAuthHeader(apiKey, apiSecret, nonce, httpMethod, requestPath, jsonPayload) {

    // Create the signature
    var data = nonce + httpMethod + requestPath + jsonPayload

    // Create signature
    var signature = crypto.createHmac('sha256', apiSecret).update(data).digest('hex')

    // Build the auth header
    return "Bitso " + apiKey + ":" + nonce + ":" + signature
}