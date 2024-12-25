const request = require('request')

const geocode = (address,callback) => {
    const url =  'https://geocode.maps.co/search?q='+encodeURIComponent(address)+'&api_key=676975c295ba7930612592oqx63976d'
    request({url:url,json:true},(error,response)=>{
    if(error){
      callback('Unable to connect, there was an error!',undefined)
    }else if(response.body.length===0) {
      callback('try different coordinates',undefined)
    }
    else {
    callback(undefined,{
      latitude:response.body[1].lat,
      longitude:response.body[1].lon,
      location:response.body[1].display_name
    })
    }
    
    })
    
     } 



     module.exports = geocode