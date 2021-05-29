import { Telegraf } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import { markdown, HTML } from 'telegraf/extra';

import dotenv from 'dotenv';

import dollarNow from './utils/getCurrency';
import sanitizeUserInput from './middlewares/sanitizeUserInput';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.use(sanitizeUserInput);

const dollarTodayCommands = ['dolarhoje', 'dolarhj'];

bot.start((ctx: TelegrafContext) =>
    ctx.reply(
        "Olá! Quer saber sobre o dólar nesse momento? Digite 'dolarhoje' ou 'dolarhj' para receber a cotação atual nessa data e hora.",
    ),
);
bot.hears(dollarTodayCommands, async (ctx: TelegrafContext) =>
    ctx.reply(await dollarNow(), markdown()),
);

export default bot;
