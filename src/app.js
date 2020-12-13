const { Telegraf } = require('telegraf');
const { markdown, HTML } = require('telegraf/extra')

const express = require('express');
const moment = require('moment');

const getCurrency = require('./utils/getCurrency'); 
const formatValue = require('./utils/formatValue');
const sanitizeUserInput = require('./middlewares/sanitizeUserInput');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('App is running!'));
app.listen(port, () => console.log(`Listening on port ${port}`));

let dateNow = moment().locale('pt-br').format('LLLL');

const dollarNow = async () => {
    const response = await getCurrency();
    // fetch('https://my-currency-telegram-bot.herokuapp.com/') // little hack to avoid heroku iddling from stop the bot from responding
    //     .then(idlePreventResponse => console.log(idlePreventResponse.status))

    // ou

    // const idlePreventResponse = await fetch('https://my-currency-telegram-bot.herokuapp.com')
    // console.log(idlePreventResponse.status)
    
    return `O dólar hoje, ${dateNow}, está cotado em *${formatValue(response.val)}*`;
}

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.use(sanitizeUserInput);

bot.start((ctx) => ctx.reply("Olá! Quer saber sobre o dólar nesse momento? Digite 'dolarhoje' ou 'dolarhj' para receber a cotação atual nessa data e hora."));
bot.hears('dolarhoje', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.hears('dolarhj', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.hears('dólarhoje', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.hears('dólarhj', async (ctx) => ctx.reply(await dollarNow(), markdown()));
bot.launch();
