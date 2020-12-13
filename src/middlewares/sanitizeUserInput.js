module.exports = function sanitizeUserInput(ctx, next) {
    if (ctx.message && typeof ctx.message.text !== 'undefined') {
        ctx.message.text = ctx.message.text.replace(' ', '');
        ctx.message.text = ctx.message.text.toLowerCase();
    }
    return next(ctx);
};