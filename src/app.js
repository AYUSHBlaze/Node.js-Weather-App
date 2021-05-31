const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//setup HandleBars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)  

//setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather-App',
        name:'Ayush Singh.'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About',
        name:'Ayush Singh.'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helptext:'OH, so you need help now?',
        title:'Help',
        name:'Ayush Singh.'
    })
})

app.get('/Weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address, duh."
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // console.log(req.query.address)
    // res.send({
    //     location: 'New Delhi, India',
    //     temperature: '104 degrees',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term :)'
        })
    }
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Ayush Singh',
        errorMessage:'Help article not found :('
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Ayush Singh',
        errorMessage:'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up and running at port ${port}`)
})