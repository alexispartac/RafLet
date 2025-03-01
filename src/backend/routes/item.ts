import express from "express";
import { uploadImage, addDiscount, addItem, getItems, deleteItem } from '../api/item.ts';

const router = express.Router();

router.get("/items", getItems);

// adauga imagine
router.post("/upload", uploadImage);

// adauga discount
router.post("/addDiscount", addDiscount);

// adauga item
router.post("/addItem", addItem);

// adauga item
router.post("/add", addItem);

// sterge item
router.delete("/delete/:id", deleteItem)


export default router;
