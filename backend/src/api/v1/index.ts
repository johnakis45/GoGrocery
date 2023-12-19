import * as express from 'express';
import { ExampleController } from './example/example.controller';
import { ItemShopController } from './item-shop/item-shop.controller';
import { TaskController } from './task/task.controller';
import { InventoryController } from './inventory/inventory.controller';
import { DishController } from './kitchen/dish.controller';
const apiV1Router = express.Router();


apiV1Router
  // Example routes
  .use(
    '/example',
    new ExampleController().applyRoutes()
  )
  .use(
    '/item-shop',
    new ItemShopController().applyRoutes()
  )
  .use(
    '/list',
    new TaskController().applyRoutes()
  )
  .use(
    '/inventory',
    new InventoryController().applyRoutes()
  )
  .use(
    '/dishes',
    new DishController().applyRoutes()
  );


export { apiV1Router };

