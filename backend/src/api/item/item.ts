import { Router } from "express";
import {  createItem,getAllItems } from "../../database/item/item_db";

const router = Router();

router.get("/all",(req,res,next) =>{
  try {
    const services = getAllItems();
    services.then(function(result) {
        res.send(result);
    })
  } catch (error) {
    console.error('An error occurred:', error);
  }
})

router.post("/createItem",async (req,res,next) =>{
  try {
    const { name } = req.body;
    //res.send('Creating!')
    if (!name) return res.status(400).json({ error: 'Name of item is required.' });

    const newitem = await createItem(name);
    console.log(newitem);
    res.json(newitem);
    
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


export default router;