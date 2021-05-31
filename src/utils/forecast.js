const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4677f773e1851d7253f26e693e67bf02&query=${latitude},${longitude}&units=f`
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback('Could not connect to Weather Services :(', undefined)
        }else if(body.error){
            callback('Invalid Location.', undefined)
        }else{
            callback(undefined, `${body.current.weather_descriptions[0]}.\nIt is currently ${body.current.temperature} degrees out. Though, it feels like ${body.current.feelslike} degrees.`)
        }
    })
}

module.exports = forecast