import {Connection, createConnection} from 'typeorm';
import dotenv from 'dotenv';
import {User} from "../models/User.model";

dotenv.config();


export class Database {
    private connection!: Connection;

    constructor(){
    }
    public async connect(): Promise<void> {
        try {
            this.connection = await createConnection({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [User],
                synchronize: true
            });

            console.log('db connected')
        } catch (err) {
            console.error('Error connecting to database', err);
            throw err;
        }
    }

}
