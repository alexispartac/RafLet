import express from "express";
import { uploadImage, addDiscount, addItem, getItems } from '../api/item.ts';

const router = express.Router();

router.get("/items", getItems);

// adauga imagine
router.post("/upload", uploadImage);

// adauga discount
router.post("/addDiscount", addDiscount);

// adauga item
router.post("/addItem", addItem);


export default router;
