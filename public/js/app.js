const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();  // prevent refresh of browser on submit

    location = search.value
    console.log(location);

    searchURL = 'http://localhost:3000/weather?address=' + location

    fetch(searchURL).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log(data.location);
                console.log(data.forecastData);
            }
        })
    })
})