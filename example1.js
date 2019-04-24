const superagent = require('superagent')

superagent.get("https://api-dev.bitso.com/v3/available_books").then(res => {
    console.log(res.body.payload)
})