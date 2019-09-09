const request = require('request')

const forecast_access_token = 'a28bd5025270f8c0e6492bd28e1afbea';
const forecast_url = 'https://api.darksky.net/forecast/' + forecast_access_token + '/';

const forecast = (latitude, longitude, callback) => {
    const url = forecast_url + latitude + ',' + longitude;

    const options = {url, json: true}

    request(options, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', null);
        }
        else if(body.error){
            callback('Unable to get location data', null);
        }
        else{
            const {temperature, precipProbability, summary} =  body.currently
            callback(null, summary + '. The temperature is ' + temperature + '. There are ' + precipProbability + '% chances of rain.')
        }
    })
}

module.exports = forecast

