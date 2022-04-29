import { Router } from 'express';

const itemsRouter = Router()

import {
    getAllItemsController,
    getItemByIdController,
} from '../controllers/items-controller.js'

itemsRouter.get('/', getAllItemsController)
itemsRouter.get('/:id', getItemByIdController)


export default itemsRouter