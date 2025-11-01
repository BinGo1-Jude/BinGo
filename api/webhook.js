const { Telegraf } = require('telegraf');

// This token is pulled from Vercel's settings for security.
const bot = new Telegraf(process.env.BOT_TOKEN);

// --- Bot Commands ---

bot.start((ctx) => {
    const user = ctx.from;
    const username = user.username || user.first_name || 'User';
    ctx.reply(`Welcome, ${username}! Your bot is now running on Vercel. Try /test`);
});

bot.command('test', (ctx) => {
    ctx.reply('Success! The Vercel backend is receiving messages.');
});

// --- Vercel Serverless Function Export ---

// This function handles all incoming Telegram updates via the webhook.
module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body, res);
    } catch (err) {
        console.error(err);
        // Respond 200 to Telegram to prevent retries.
        res.statusCode = 200;
        res.end('Success');
    }
};
