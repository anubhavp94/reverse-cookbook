import { Router } from 'express';
import { IngredientController } from '../controllers/ingredientController';

const router = Router();
const ingredientController = new IngredientController();

router.get('/', ingredientController.getAllIngredients);
router.get('/categories', ingredientController.getIngredientsByCategory);
router.get('/search', ingredientController.searchIngredients);
router.get('/:id', ingredientController.getIngredient);

export { router as ingredientRoutes };