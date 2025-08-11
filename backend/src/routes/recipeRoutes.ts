import { Router } from 'express';
import { RecipeController } from '../controllers/recipeController';

const router = Router();
const recipeController = new RecipeController();

router.post('/generate', recipeController.generateRecipes);
router.get('/search', recipeController.searchRecipes);
router.get('/favorites', recipeController.getFavorites);
router.get('/:id', recipeController.getRecipe);

export { router as recipeRoutes };