import e, {Request, Response} from 'express';

import {User} from "../models/User.model";
import {IUser} from "../interfaces/User.interface";
import {getManager} from "typeorm";


export class UserController {

    constructor() {
    }


    public async getUsers(req: Request, res: Response): Promise<e.Response<IUser>> {
        try {

            const userRepository = getManager().getRepository(User);
            const users = await userRepository.find();
            return res.json(users);
        } catch (err) {
            console.error('Error fetching users', err);
            return res.status(500).send('Server Error');
        }
    }

    public async addUser(req: any, res: Response): Promise<e.Response<IUser>> {
        try {

            const {name} = req.body;
            let user = new User();
            user.name = name;
            user.passport = req.file.originalname;
            const userRepository = getManager().getRepository(User);
            const Newuser = await userRepository.save(user);
            return res.json(Newuser);
        } catch (err) {
            console.error('Error adding user', err);
            return res.status(500).send('Server Error');
        }
    }
}
















