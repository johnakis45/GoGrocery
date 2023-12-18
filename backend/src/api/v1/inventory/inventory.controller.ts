import { Request, Response, NextFunction, Router } from 'express';
import { Iinventory, InventoryModel } from './inventory.model';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';
export class InventoryController extends ResourceController<Iinventory>{
    private logger: Logger = new Logger();
    constructor() {
        super(InventoryModel);
    }
    /**
     * Apply all routes for inventory items
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getInventory)
            .get('/:id', this.getInventoryById)
            .post('/', this.postInventory)
            .put('/:id', this.updateInventory)
            .delete('/:id', this.deleteInventory);

        return router;
    }

    /**
     * In all of the methods below, we are using the super class methods to perform the CRUD operations.
     * Request and Response are passed to the super class methods so that they can be extracted and used.
     * In case you need to do any preprocessing (e.g., filter a body's field) you can do it before calling the super class methods.
     */
    /**
     * Sends a message containing all tasks back as a response
     * @param req
     * @param res 
     */
    getInventory = async (req: Request, res: Response) => {
        this.logger.debug('getInventory request');
        // you can pre-process the request here before passing it to the super class method
        const allTasks = await this.getAll(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allTasks);
    }

    /**
     * Creates a new task
     * @param req
     * @param res
     */

    postInventory = async (req: Request, res: Response) => {
        this.logger.debug('postInventory request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.create(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Delete task by id
     * @param req 
     * @param res 
     */
    deleteInventory = async (req: Request, res: Response) => {
        this.logger.debug('deleteInventory request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.delete(req.params.id, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);

    }

    /**
     * Update task by id
     * @param req 
     * @param res 
     */
    updateInventory = async (req: Request, res: Response) => {
        this.logger.debug('updateInventory request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.update(req.params.id, req.body.blacklist, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Get single task by id
     * @param req 
     * @param res 
     */
    getInventoryById = async (req: Request, res: Response) => {
        this.logger.debug('getInventoryById request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.getOne(req.params.id, req, res);

        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }
    
}
