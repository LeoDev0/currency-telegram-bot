import fetch from 'node-fetch';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
import Redis from 'ioredis';
import formatValue from './formatValue';

dotenv.config();
const redis = new Redis(process.env.REDIS_URL);

const baseCurrency = 'USD';
const currencyToConvertTo = 'BRL';

interface CurrencyAPIResponse {
    val: number;
    id: string;
    to: string;
    fr: string;
}

const getCurrency = async (): Promise<CurrencyAPIResponse> => {
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

        let currencyValue: number;

        await redis.get('currency', (error, result) => {
            if (result) {
                currencyValue = Number(result);
            }
        });

        if (!currencyValue) {
            const response = await getCurrency();
            redis.set('currency', response.val, 'EX', 600);
            currencyValue = response.val;
        }

        return `O dólar hoje, ${dateNow}, está cotado em *${formatValue(
            currencyValue,
        )}*`;
    } catch (error) {
        console.error(error);
        return `Oops. Algo deu errado no nosso servidor! Tente novamente mais tarde.`;
    }
};

export default dollarNow;
