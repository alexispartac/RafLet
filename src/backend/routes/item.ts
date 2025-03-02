import express from "express";
import { uploadImage, addDiscount, addItem, getItems, deleteItem, getItem, getNumberOfItems } from '../api/item.ts';


const router = express.Router();

router.get("/items", getItems);

router.get('/item/:id', getItem);

router.get('/items/number', getNumberOfItems);


//for admin
router.post("/add", addItem);

router.delete("/delete/:id", deleteItem);

router.post("/upload", uploadImage);

router.post("/addDiscount", addDiscount);



export default router;
