import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { secretToken } from '../constants.ts';
import { UReq, URes } from '../@types/server.js';
import { User } from '../@types/user.js';

const uri = 'mongodb://localhost:27017/private'; 
const USERS_COLLECTION = 'users';
const client = new MongoClient(uri);
const USERS = client.db().collection<User>(`${USERS_COLLECTION}`);


export const listOfUsers = async (req: UReq, res: URes) : Promise<unknown>=> {
    const adminId: string = req.headers.adminId;

    if (adminId !== 'onlyadmin') {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        const users = await USERS.find().toArray();
        return res.status(200).json({ users });
    } catch (error: unknown){
        return res.status(400).json({ error: `Error-BE: ${error}` })
    }
        
};

export const loginUser = async (req: UReq, res: URes) : Promise<unknown>=> {
    const { email, password }: User = req.body;

    try {
        const user = await USERS.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Email or password doesn't match!" });
        }
        const token = jwt.sign({ userId: user._id }, secretToken, { expiresIn: "60d" });

        return res.status(200).json({ message: "Success!", accessToken: token });
    } catch (error: unknown) {
        return res.status(400).json({ error: `Error-BE: ${error}` });
    }
};

export const registerUser = async (req: UReq, res: URes) : Promise<unknown> => {
    const newUser: User = req.body;

    try {
        await USERS.insertOne(newUser);
        return res.status(200).json({ newUser });
    } catch (error: unknown) {
        return res.status(400).json({ error: `Error-BE: ${error}` });
    }
};

export const deleteUser = async (req: UReq, res: URes) : Promise<unknown>=> {
    const adminId = req.headers.adminId;
    const userId = req.query.userId;

    if (adminId !== 'onlyadmin') {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        await USERS.deleteOne({ _id: new ObjectId(userId) });
        return res.status(200).json({ message: 'Success delete!' });
    } catch (error) {
        return res.status(400).json({ error: `Error-BE: ${error}` });
    }
};
