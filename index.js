import express from "express"
import axios from "axios"
import { name } from "ejs";

const app = express()

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/"  , (req, res) => {
    res.render("index")
})

app.post("/search" , async (req, res) => {
    let country = req.body['country']
    let result = await axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    result = result.data[0]

    let common_name = result['name']['common']
    let official_name = result['name']['official']
    let currencies = result['currencies'];
    let currencyCode = Object.keys(currencies)[0];  
    let currencyName = currencies[currencyCode]['name'];
    let capital = result['capital'][0]
    let alt_spellings = result['altSpellings']
    let continent = result['continents'][0]
    let languages = result['languages']
    let map_url = result['maps']["googleMaps"]
    let population = result['population']
    let flag_png = result['flags']['png']
    let coatOfArms = result['coatOfArms']['png']
    
    let countryDetails = {
        common_name: common_name,
        official_name: official_name,
        currencyCode: currencyCode,
        currencyName: currencyName,
        capital: capital,
        alt_spellings: alt_spellings,
        continent: continent,
        languages: languages,
        map_url: map_url,
        population: population,
        flag_png: flag_png,
        coatOfArms: coatOfArms
    };

    
    
    res.render("countries" , {countryDetails : countryDetails})

})

app.listen(3000 , () =>{
    console.log("server is running !")
})