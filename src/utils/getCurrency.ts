import fetch from 'node-fetch';
require('dotenv').config();

const baseCurrency = 'USD';
const currencyToConvertTo = 'BRL';

interface getCurrencyDTO {
    val: number;
    id: string;
    to: string;
    fr: string;
}

const getCurrency = async (): Promise<getCurrencyDTO> => {
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

export default getCurrency;
