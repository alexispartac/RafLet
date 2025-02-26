import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { secretToken } from '../constants.ts';
import { IReq, IRes } from '../@types/server.js';
import { ItemType } from 'src/frontend/@types/item';

const uri = 'mongodb://localhost:27017/public'; 
const ITEMS_COLLECTION = 'products';
const client = new MongoClient(uri);
const ITEMS = client.db().collection<ItemType>(`${ITEMS_COLLECTION}`);

const VerifyToken = ( accessToken: string | undefined) => {
    if(!accessToken)
        return false;
    const decoded = jwt.verify(accessToken, secretToken) as { userId: string };
    if(!decoded)
        return false;

    return decoded;
}


export const getItems = async(req: IReq, res: IRes): Promise<unknown> => {
    try{
        const items = await ITEMS.find().toArray();

        return res.status(200).json({message: 'Items!', items: items});
    }catch(error: unknown){
        return res.status(400).json({error: 'Produsele nu s au putut incarca!'});
    }

}


export const uploadImage = (req: IReq, res: any) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const image = req.files.image;
    
    // cand voi muta in cloud imaginile le voi pune intr un bucket
    const uploadPath = path.join("src/assets/images", image.name);
    image.mv(uploadPath, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });
};

export const addDiscount = (req: any, res: any) => {
    // const discount  = req.body;
    
    if(VerifyToken(req.headers.accesstoken) )
        return res.status(401).json({ message: 'Unauthorized!' });

    // adauga discount la toate produsele din baza de date

    res.send('Discount added!');
}

export const deleteDiscount = (req: any, res: any) => {
    const { discount } = req.body;
    if(VerifyToken(req.headers.accesstoken) )
        return res.status(401).json({ message: 'Unauthorized!' });

    // sterge discount la toate produsele din baza de date

    res.send('Discount deleted!');
}


export const addItem = (req: any, res: any) => {
    // const  item  = req.body;
    // adauga in baz de date un item
    if(VerifyToken(req.headers.accesstoken) )
        return res.status(401).json({ message: 'Unauthorized!' });

    res.send('Item added!');
}

export const deleteItem = (req: any, res: any) => {
    // const { item } = req.body;
    if(VerifyToken(req.headers.accesstoken) )
        return res.status(401).json({ message: 'Unauthorized!' });

    // sterge din baz de date un item

    res.send('Item deleted!');
}
