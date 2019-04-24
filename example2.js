const superagent = require('superagent')

superagent.get("https://api-dev.bitso.com/v3/account_status").then(res => {
    console.log(res.body.payload)
}).catch(err => {
    console.log(err.status)
    console.log(err.message)
    console.log(err.response.body)
})