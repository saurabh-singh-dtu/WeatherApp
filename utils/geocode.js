const request = require('request')

const geocode_access_token = 'pk.eyJ1IjoiYmhhd2FuMDQwNyIsImEiOiJjanpwbmdvMjcwcGkxM3ByMnAyZWh0dDluIn0.ed56G6skq-29nnSvH54Znw';

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geocode_access_token + '&limit=1';

    const options = {url, json: true};

    request(options, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services');
        }
        else if(body.features.length == 0){
            callback('Unable to get location data.');
        }
        else{
            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;