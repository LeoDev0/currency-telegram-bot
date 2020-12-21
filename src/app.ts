import { Telegraf } from 'telegraf';
// @ts-ignore
import { markdown, HTML } from 'telegraf/extra';
import express, { Request, Response } from 'express';
import moment from 'moment-timezone';

import getCurrency from './utils/getCurrency';
import formatValue from './utils/formatValue';

import sanitizeUserInput from './middlewares/sanitizeUserInput';

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000
app.get('/', (request: Request, response: Response) => response.send('App is running!'));
app.listen(port, () => console.log(`Listening on port ${port}`));

const dollarNow = async (): Promise<string> => {
    try {
        const dateNow = moment().tz('America/Sao_Paulo').locale('pt-br').format('LLLL');
        const response = await getCurrency();

        return `O dólar hoje, ${dateNow}, está cotado em *${formatValue(response.val)}*`;
    } catch (error) {
        console.log(error);
        return `Oops. Algo deu errado no nosso servidor! Tente novamente mais tarde.`;
    }
}

// @ts-ignore
const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.use(sanitizeUserInput);

const dollarTodayCommands = ['dólarhoje', 'dolarhoje', 'dólarhj', 'dolarhj']

bot.start((ctx) => ctx.reply("Olá! Quer saber sobre o dólar nesse momento? Digite 'dolarhoje' ou 'dolarhj' para receber a cotação atual nessa data e hora."));
bot.hears(dollarTodayCommands, async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.launch();
