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
 * Get a single Dish by title
 * @param title
 * @returns {Promise<IDish | null>}
 */
    findByTitle = async (title: string): Promise<IDish | null> => {
        const Dish = DishModel.findOne({ title }).exec();
        return Dish || null; // If Dish is null (not found), return null
    };


    /**
     * Apply all routes for Dishes
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getDishes)
            .get('/:id', this.getDishById)
            .get('/title/:title', this.getDishByTitle)
            .post('/', this.postDish)
            .put('/:id', this.updateDish)
            .delete('/:id', this.deleteDish);

        return router;
    }

    /**
     * In all of the methods below, we are using the super class methods to perform the CRUD operations.
     * Request and Response are passed to the super class methods so that they can be extracted and used.
     * In case you need to do any preprocessing (e.g., filter a body's field) you can do it before calling the super class methods.
     */
    /**
     * Sends a message containing all Dishes back as a response
     * @param req
     * @param res 
     */
    getDishes = async (req: Request, res: Response) => {
        this.logger.debug('getDishes request');
        // you can pre-process the request here before passing it to the super class method
        const allDishes = await this.getAll(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allDishes);
    }

    /**
     * Creates a new Dish
     * @param req
     * @param res
     */

    postDish = async (req: Request, res: Response) => {
        this.logger.debug('postDish request');
        // you can pre-process the request here before passing it to the super class method
        const Dish = await this.create(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(Dish);
    }

    /**
     * Delete Dish by id
     * @param req 
     * @param res 
     */
    deleteDish = async (req: Request, res: Response) => {
        this.logger.debug('deleteDish request');
        // you can pre-process the request here before passing it to the super class method
        const Dish = await this.delete(req.params.id, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(Dish);

    }

    /**
     * Update Dish by id
     * @param req 
     * @param res 
     */
    updateDish = async (req: Request, res: Response) => {
        this.logger.debug('updateDish request');
        // you can pre-process the request here before passing it to the super class method
        const Dish = await this.update(req.params.id, req.body.blacklist, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(Dish);
    }

    /**
     * Get single Dish by id
     * @param req 
     * @param res 
     */
    getDishById = async (req: Request, res: Response) => {
        this.logger.debug('getDishById request');
        // you can pre-process the request here before passing it to the super class method
        const Dish = await this.getOne(req.params.id, req, res);

        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(Dish);
    }

    getDishByTitle = async (req: Request, res: Response) => {
        this.logger.debug('getDishByTitle request');
        // you can pre-process the request here before passing it to the super class method
        try {
            const Dish = await this.findByTitle(req.params.title);
            if (!Dish) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Dish not found' });
            }

            // you can process the data retrieved here before returning it to the client
            return res
                .status(StatusCodes.OK)
                .json(Dish);
        } catch (error) {
            // Handle errors appropriately
            this.logger.error('Error fetching Dish by title', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
        }
    }
}
