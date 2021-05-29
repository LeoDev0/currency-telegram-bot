import express, { Request, Response } from 'express';
import bot from './app';

const app = express();

const port = process.env.PORT || 3000;
app.get('/', (request: Request, response: Response) =>
    response.send('App is running!'),
);
app.listen(port, () => console.log(`Listening on port ${port}`));

bot.launch();
