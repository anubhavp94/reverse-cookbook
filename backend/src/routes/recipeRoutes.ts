import { Router } from 'express';
import { RecipeController } from '../controllers/recipeController';

const router = Router();
const recipeController = new RecipeController();

router.post('/generate', recipeController.generateRecipes);
router.post('/ingredient-alternatives', recipeController.getIngredientAlternatives);
router.get('/search', recipeController.searchRecipes);
router.get('/favorites', recipeController.getFavorites);
router.get('/:id', recipeController.getRecipe);

export { router as recipeRoutes };