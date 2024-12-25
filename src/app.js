const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const ViewPath = path.join(__dirname,'../templates/Views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handelbars engine
app.set('view engine','hbs')
app.set('views',ViewPath)
hbs.registerPartials(partialPath)
 
//setup static directory to serve
app.use(express.static(publicDirPath))  

//app.com
//app.com/help
//app.com/about

//index page
app.get('',(req,res)=>{
res.render('index',{
    title: 'weather app',
    name:'Yassin Medhat'
})})

//about
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Yassin Medhat nafie'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'This is a help message',
        title:'Help',
        name:'Yassin Medhat Wehishi'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location}= {})=>{
if(error){
    return res.send({error})
}
forecast(latitude,longitude,(error,data)=>{
if(error){
    return res.send({error})
} res.send({
    forecast:data,
    location,
    address:req.query.address
})
})
})
 
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//  return res.send('SEARCH IS REQUIRED')
//     }
//     console.log(req.query)
// res.send({
//     products:[]
// })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{    
        error:'HELP ARTICLE NOT FOUND!',
        title:'404 PAGE',
        name:'Yassin Medhat'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{    
        error:'Page not Found',
        title:'404 PAGE',
        name:'Yassin Medhat'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})