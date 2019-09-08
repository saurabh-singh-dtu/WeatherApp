const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()

// setup handlebars engines and views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/templates/views/'));
hbs.registerPartials(path.join(__dirname, '../public/templates/partials/'));


// setup static directory to serve
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bhawandeep Singla'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bhawandeep Singla'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bhawandeep Singla'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'Please specify the location'
        })
    }

    // destructuring is used in data object
    // geocode(location_name, (error, data) => {
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error){
            res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
                res.send({error});
            }

            res.send({location, forecastData});
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bhawandeep Singla',
        error_msg: 'Help Article Not Found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bhawandeep Singla',
        error_msg: 'Page Not Found'
    });
})

app.listen(3000);