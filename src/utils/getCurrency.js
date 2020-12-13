const fetch = require('node-fetch');
// const { currencyApiKey } = require('../config/auth');
require('dotenv').config();

const baseCurrency = 'USD';
const currencyToConvertTo = 'BRL';

const getCurrency = async () => {
    const request = await fetch(
        `https://free.currconv.com/api/v7/convert?q=${baseCurrency}_${currencyToConvertTo}&apiKey=${process.env.CURRENCY_API_KEY}`
    );

    const jsonData = await request.json();
    const { val, id, to, fr } = jsonData.results.USD_BRL;
    return {
        val,
        id,
        to,
        fr,
    };
}

module.exports = getCurrency;
