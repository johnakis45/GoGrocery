import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';
import { DishModel, IDish } from './dish.model';

export class DishController extends ResourceController<IDish>{
    private logger: Logger = new Logger();
    constructor() {
        super(DishModel);
    }

    /**
 * Get a single task by title
 * @param title
 * @returns {Promise<ITask | null>}
 */
    findByTitle = async (title: string): Promise<IDish | null> => {
        const task = DishModel.findOne({ title }).exec();
        return task || null; // If task is null (not found), return null
    };


    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getTasks)
            .get('/:id', this.getTaskById)
            .get('/title/:title', this.getTaskByTitle)
            .post('/', this.postTask)
            .put('/:id', this.updateTask)
            .delete('/:id', this.deleteTask);

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
    getTasks = async (req: Request, res: Response) => {
        this.logger.debug('getDishes request');
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

    postTask = async (req: Request, res: Response) => {
        this.logger.debug('postDish request');
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
    deleteTask = async (req: Request, res: Response) => {
        this.logger.debug('deleteDish request');
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
    updateTask = async (req: Request, res: Response) => {
        this.logger.debug('updateDish request');
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
    getTaskById = async (req: Request, res: Response) => {
        this.logger.debug('getDishById request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.getOne(req.params.id, req, res);

        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    getTaskByTitle = async (req: Request, res: Response) => {
        this.logger.debug('getDishByTitle request');
        // you can pre-process the request here before passing it to the super class method
        try {
            const task = await this.findByTitle(req.params.title);
            if (!task) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Task not found' });
            }

            // you can process the data retrieved here before returning it to the client
            return res
                .status(StatusCodes.OK)
                .json(task);
        } catch (error) {
            // Handle errors appropriately
            this.logger.error('Error fetching task by title', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
        }
    }
}
