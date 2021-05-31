const request = require('request')

const geocode = (address, callback) => {
    const Gurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXl1c2hibGF6ZSIsImEiOiJja3AxNzcya24xMW9lMnBueGJrc3FqOXJwIn0.F0KvjGHiRiQzqrp3wsOTIg&limit=1`
    request({url:Gurl, json:true}, (error, {body}) => {
        if(error){
            callback('Could not connect to GeoCoding Services :(', undefined)
        }else if(body.features.length===0){
            callback('Invalid Location.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode