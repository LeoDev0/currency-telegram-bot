import fetch from 'node-fetch';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
import formatValue from './formatValue';

dotenv.config();

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
        `https://free.currconv.com/api/v7/convert?q=${baseCurrency}_${currencyToConvertTo}&apiKey=${process.env.CURRENCY_API_KEY}`,
    );

    const jsonData = await request.json();
    const { val, id, to, fr } = jsonData.results.USD_BRL;
    return {
        val,
        id,
        to,
        fr,
    };
};

const dollarNow = async (): Promise<string> => {
    try {
        const dateNow = moment()
            .tz('America/Sao_Paulo')
            .locale('pt-br')
            .format('LLLL');
        const response = await getCurrency();

        return `O dólar hoje, ${dateNow}, está cotado em *${formatValue(
            response.val,
        )}*`;
    } catch (error) {
        console.log(error);
        return `Oops. Algo deu errado no nosso servidor! Tente novamente mais tarde.`;
    }
};

export default dollarNow;
