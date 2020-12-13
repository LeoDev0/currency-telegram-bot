const { Telegraf } = require('telegraf');
const { Markup, markdown, HTML } = require('telegraf/extra')

const moment = require('moment');

const getCurrency = require('./utils/getCurrency'); 
const formatValue = require('./utils/formatValue');
const sanitizeUserInput = require('./middlewares/sanitizeUserInput');

const { telegramApiKey } = require('./config/auth');

let dateNow = moment().locale('pt-br').format('LLLL');

const dollarNow = async () => {
    const response = await getCurrency();
    return `O dólar hoje, ${dateNow}, está cotado em ${formatValue(response.val)}`;
}

const bot = new Telegraf(telegramApiKey);

bot.use(sanitizeUserInput);

bot.start((ctx) => ctx.reply("Olá! Quer saber sobre o dólar nesse momento? Digite 'dolarhoje' ou 'dolarhj' para receber a cotação atual nessa data e hora."));
bot.hears('dolarhoje', async (ctx) => ctx.reply(await dollarNow()));
bot.hears('dolarhj', async (ctx) => ctx.reply(await dollarNow()));
bot.hears('dólarhoje', async (ctx) => ctx.reply(await dollarNow()));
bot.hears('dólarhj', async (ctx) => ctx.reply(await dollarNow()));
bot.launch();
