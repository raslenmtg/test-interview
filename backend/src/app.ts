import express = require('express');
import cors from 'cors';
import "reflect-metadata";
import {Application, json, Request, Response} from 'express';
import {Database} from "./config/db";
import routes from './controllers';

const app: Application = express();

app.use(json());
app.use(cors());

app.use(express.static('public'));
app.use('/api',routes);

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});


app.listen(3000, async () => {
    const database = new Database();
    await database.connect();
    console.log('SERVER IS UP ON PORT:', 3000);
});
