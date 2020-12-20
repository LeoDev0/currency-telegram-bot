import { NextFunction } from 'express';
import { TelegrafContext } from 'telegraf/typings/context';

export default function sanitizeUserInput(ctx: TelegrafContext, next: NextFunction): void {
    if (ctx.message && typeof ctx.message.text !== 'undefined') {
        ctx.message.text = ctx.message.text.replace(' ', '');
        ctx.message.text = ctx.message.text.toLowerCase();
    }
    return next(ctx);
};
