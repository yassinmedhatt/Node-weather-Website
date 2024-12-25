const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=273a5247929f4b83b96120245242206&q='+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)
    request({url:url,json:true},(error,response)=>{
    if(error){
      callback('There is an error please try again',undefined)
    } else if (response.body.error){
      callback(undefined,'Try different coordinates')
    } else {
      callback(undefined,{
    temperature: response.body.current.temp_c,
    region: response.body.location.region
    
      })
    }
    })
    }
forecast(30.0444,31.2357,(error,data)=>{
console.log(error)
console.log(data)
})

    module.exports = forecast