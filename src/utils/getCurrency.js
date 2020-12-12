const fetch = require('node-fetch');
const { apiKey } = require('../config/auth');

const baseCurrency = 'USD'
const currencyToConvertTo = 'BRL'

const getCurrency = async () => {
    const request = await fetch(
        `https://free.currconv.com/api/v7/convert?q=${baseCurrency}_${currencyToConvertTo}&apiKey=${apiKey}`
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
