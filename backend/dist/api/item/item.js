"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_db_1 = require("../../database/item/item_db");
const router = (0, express_1.Router)();
router.get("/all", (req, res, next) => {
    try {
        const services = (0, item_db_1.getAllItems)();
        services.then(function (result) {
            res.send(result);
        });
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
});
router.post("/createItem", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        //res.send('Creating!')
        if (!name)
            return res.status(400).json({ error: 'Name of item is required.' });
        const newitem = yield (0, item_db_1.createItem)(name);
        console.log(newitem);
        res.json(newitem);
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
