"use strict";
// import * as express from 'express';
// import { apiV1Router } from './v1';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export class Api {
//     /**
//      * Apply all app routes including models and auth
//      *
//      * @param {express.Application} app
//      * @returns {Promise<express.Router>}
//      */
//     public static async applyRoutes(app: express.Application): Promise<express.Router> {
//         const apiRouter = express.Router();
//         apiRouter.use('/api/', apiV1Router);
//         return apiRouter;
//     }
// }
const express_1 = require("express");
const item_1 = __importDefault(require("./item/item"));
const router = (0, express_1.Router)();
router.use("/item", item_1.default);
exports.default = router;
