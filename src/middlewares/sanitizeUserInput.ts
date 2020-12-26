import { NextFunction } from 'express';
import { TelegrafContext } from 'telegraf/typings/context';

function removeAccents(newStringWithAccent: string) {
    let string = newStringWithAccent;
    const accentsMapHex: any = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g,
    };

    for (const letter in accentsMapHex) {
        if (Object.prototype.hasOwnProperty.call(accentsMapHex, letter)) {
            const regularExpression = accentsMapHex[letter];
            string = string.replace(regularExpression, letter);
        }
    }

    return string;
}

export default function sanitizeUserInput(
    ctx: TelegrafContext,
    next: NextFunction,
): void {
    if (ctx.message && typeof ctx.message.text !== 'undefined') {
        ctx.message.text = ctx.message.text.replace(' ', '');
        ctx.message.text = ctx.message.text.toLowerCase();
        ctx.message.text = removeAccents(ctx.message.text);
    }
    return next(ctx);
}
