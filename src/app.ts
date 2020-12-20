import { Telegraf } from 'telegraf';
const { markdown, HTML } = require('telegraf/extra');
// const fetch = require('node-fetch');

import express, { Request, Response } from 'express';
import moment from 'moment';

const getCurrency = require('./utils/getCurrency'); 
const formatValue = require('./utils/formatValue');
const sanitizeUserInput = require('./middlewares/sanitizeUserInput');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000
app.get('/', (request: Request, response: Response) => response.send('App is running!'));
app.listen(port, () => console.log(`Listening on port ${port}`));

const dollarNow = async () => {
    const dateNow = moment(). locale('pt-br').format('LLLL');
    const response = await getCurrency();

    return `O dólar hoje, ${dateNow}, está cotado em *${formatValue(response.val)}*`;
}

// @ts-ignore
const bot = new Telegraf(process.env.TELEGRAM_API_KEY); 

bot.use(sanitizeUserInput);

bot.start((ctx) => ctx.reply("Olá! Quer saber sobre o dólar nesse momento? Digite 'dolarhoje' ou 'dolarhj' para receber a cotação atual nessa data e hora."));
bot.hears('dolarhoje', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.hears('dolarhj', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.hears('dólarhoje', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.hears('dólarhj', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.launch();
