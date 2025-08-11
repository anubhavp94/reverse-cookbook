import { Ingredient, IngredientCategory } from '@reverse-cookbook/shared';

export class IngredientService {
  private ingredients: Ingredient[] = [
    // Proteins
    { id: 'chicken', name: 'Chicken', category: 'protein' },
    { id: 'beef', name: 'Beef', category: 'protein' },
    { id: 'pork', name: 'Pork', category: 'protein' },
    { id: 'fish', name: 'Fish', category: 'protein' },
    { id: 'tofu', name: 'Tofu', category: 'protein' },
    { id: 'eggs', name: 'Eggs', category: 'protein' },
    
    // Vegetables
    { id: 'onion', name: 'Onion', category: 'vegetable' },
    { id: 'garlic', name: 'Garlic', category: 'vegetable' },
    { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    { id: 'bell-pepper', name: 'Bell Pepper', category: 'vegetable' },
    { id: 'carrot', name: 'Carrot', category: 'vegetable' },
    { id: 'broccoli', name: 'Broccoli', category: 'vegetable' },
    { id: 'spinach', name: 'Spinach', category: 'vegetable' },
    { id: 'mushroom', name: 'Mushroom', category: 'vegetable' },
    
    // Grains & Starches
    { id: 'rice', name: 'Rice', category: 'grain' },
    { id: 'pasta', name: 'Pasta', category: 'grain' },
    { id: 'potato', name: 'Potato', category: 'grain' },
    { id: 'bread', name: 'Bread', category: 'grain' },
    { id: 'quinoa', name: 'Quinoa', category: 'grain' },
    
    // Dairy
    { id: 'cheese', name: 'Cheese', category: 'dairy' },
    { id: 'milk', name: 'Milk', category: 'dairy' },
    { id: 'yogurt', name: 'Yogurt', category: 'dairy' },
    { id: 'butter', name: 'Butter', category: 'dairy' },
    
    // Herbs & Spices
    { id: 'basil', name: 'Basil', category: 'herb' },
    { id: 'oregano', name: 'Oregano', category: 'herb' },
    { id: 'thyme', name: 'Thyme', category: 'herb' },
    { id: 'ginger', name: 'Ginger', category: 'spice' },
    { id: 'cumin', name: 'Cumin', category: 'spice' },
    { id: 'paprika', name: 'Paprika', category: 'spice' },
    
    // Pantry
    { id: 'olive-oil', name: 'Olive Oil', category: 'pantry' },
    { id: 'soy-sauce', name: 'Soy Sauce', category: 'pantry' },
    { id: 'vinegar', name: 'Vinegar', category: 'pantry' },
    { id: 'flour', name: 'Flour', category: 'pantry' },
    { id: 'sugar', name: 'Sugar', category: 'pantry' },
    { id: 'salt', name: 'Salt', category: 'pantry' },
  ];

  async getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredients;
  }

  async getIngredientsByCategory(): Promise<IngredientCategory[]> {
    const categories: { [key: string]: Ingredient[] } = {};
    
    this.ingredients.forEach(ingredient => {
      if (!categories[ingredient.category]) {
        categories[ingredient.category] = [];
      }
      categories[ingredient.category].push(ingredient);
    });

    return Object.keys(categories).map(categoryName => ({
      name: this.formatCategoryName(categoryName),
      ingredients: categories[categoryName]
    }));
  }

  async searchIngredients(query: string): Promise<Ingredient[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getIngredientById(id: string): Promise<Ingredient | null> {
    return this.ingredients.find(ingredient => ingredient.id === id) || null;
  }

  private formatCategoryName(category: string): string {
    const categoryNames: { [key: string]: string } = {
      'protein': 'Proteins',
      'vegetable': 'Vegetables',
      'grain': 'Grains & Starches',
      'dairy': 'Dairy',
      'herb': 'Herbs',
      'spice': 'Spices',
      'pantry': 'Pantry Items'
    };

    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  }
}