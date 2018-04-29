const axios  = require('axios');

let getConversionRate = async (from,to)=>{
    try {
        let response = await axios.get(`http://data.fixer.io/api/latest?access_key=459fad61da73fae12e4d5bde7a879ac8&symbols=${to}`);
        return response.data.rates[to];
    } catch(e) {
        throw new Error(`Invalid currency ${to}`);
    }
    
}
let getCountryList = async (country)=>{
    try {
        let response =await axios.get(`https://restcountries.eu/rest/v2/currency/${country}`);
     return response.data;
    }catch(e) {
        throw new Error(`Invalid currency code provided ${country}`)
    }
}

let getRate = async (from,to,amt)=>{
    let currencyRate = await getConversionRate(from,to);
    let amount = currencyRate*amt;
    let countryList = await getCountryList(to);
    return `${amt} ${from} equals to ${amount} ${to} and ${to} are accepeted in countries: ${countryList.map(country=>country.name).join(', ')} `

}

getRate('GBP','CAD',20).then(status=>{
    console.log(status);
}).catch(e=>{
    console.log(e.message);
})
// getConversionRate('GBP','USD').then(response=>{
//     console.log(response.data);
// })
// getCountryList('USD').then(response=>{
//     console.log(response.data);
// })