'use strict';
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weatherData.json')
const express = require('express');
const server = express();
const PORT = process.env.PORT;
server.use(cors());








//http://localhost:3101/weather?city_name=Amman&lon=35.91&lat=31.95
//http://localhost:3101/weather?city_name=Seattle&lon=-122.33207&lat=47.60621

server.get('/weather', (req, res) => {
    // console.log(req.query)
    let city_name = req.query.city_name
    let lat = req.query.lat;
    let lon = req.query.lon;
    let Forcecast1;

    let Items = weatherData.find(item => {
        if (item.city_name.toLowerCase() == city_name.toLowerCase() && item.lat == lat && item.lon == lon)
                { Forcecast1 = new Forcecast(item);

                    return item
                   }

    }

    )
    res.send(Forcecast1)
})


class Forcecast {
    constructor(array) {
        this.data = array.data.map(item => {
            let lowTemp = "low of" + item.low_temp;
            let highTemp = "high of" + item.max_temp;
            return {
                "description": lowTemp + highTemp + "with" + item.weather.description,
                 "data": item.datetime
            }
        })
    }
}




server.get('*', (req, res) => {
    res.status(404).send('not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})












server.get('/movie',function(req,res){
    try{
        const movieUrl =`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;
        
        
        superagent.get(movieUrl).then(movieDbData=>{
            const movieArray=movieDbData.body.results.map(data=> new Movie(data));
            
            res.send(movieArray)

        }).catch(console.error)
       
    }
    catch(error){
        console.log(error)
    }

    })


    
class Movie{
    constructor(data){
        this.title=data.original_title;
        this.image='http://image.tmdb.org/t/p/w342'+data.poster_path;
        this.releaseDate=data.release_date;
        this.rating=data.vote_average;

    }
}