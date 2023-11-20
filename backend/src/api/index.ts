// import * as express from 'express';
// import { apiV1Router } from './v1';

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

import { Router } from "express";
import itemRouter from "./item/item";

const router = Router();

router.use("/item", itemRouter);

export default router;
