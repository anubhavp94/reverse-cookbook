import sqlite3 from 'sqlite3';
import { Recipe, RecipeRequest } from '@reverse-cookbook/shared';

export class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    const dbPath = process.env.DB_PATH || './recipes.db';
    this.db = new sqlite3.Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS recipes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        cuisine TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        cooking_time INTEGER,
        servings INTEGER,
        difficulty TEXT,
        description TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS recipe_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredients_hash TEXT NOT NULL,
        cuisine TEXT NOT NULL,
        recipe_ids TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id TEXT NOT NULL,
        user_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async saveRecipe(recipe: Recipe, request?: RecipeRequest): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT OR REPLACE INTO recipes 
        (id, title, cuisine, ingredients, instructions, cooking_time, servings, difficulty, description, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        recipe.id,
        recipe.title,
        recipe.cuisine,
        JSON.stringify(recipe.ingredients),
        JSON.stringify(recipe.instructions),
        recipe.cookingTime,
        recipe.servings,
        recipe.difficulty,
        recipe.description || '',
        JSON.stringify(recipe.tags || [])
      ], (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (request) {
          this.cacheRecipe(recipe.id, request);
        }
        
        resolve(recipe);
      });
    });
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row: any) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!row) {
          resolve(null);
          return;
        }

        resolve(this.mapRowToRecipe(row));
      });
    });
  }

  async searchRecipes(query: string, cuisine?: string): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM recipes WHERE title LIKE ? OR description LIKE ?';
      let params: any[] = [`%${query}%`, `%${query}%`];
      
      if (cuisine) {
        sql += ' AND cuisine = ?';
        params.push(cuisine);
      }
      
      this.db.all(sql, params, (err, rows: any[]) => {
        if (err) {
          reject(err);
          return;
        }
        
        resolve(rows.map(row => this.mapRowToRecipe(row)));
      });
    });
  }

  async findCachedRecipes(request: RecipeRequest): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      const ingredientsHash = this.hashIngredients(request.ingredients);
      
      this.db.get(`
        SELECT recipe_ids FROM recipe_cache 
        WHERE ingredients_hash = ? AND cuisine = ? 
        AND created_at > datetime('now', '-1 hour')
      `, [ingredientsHash, request.cuisine], (err, row: any) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!row) {
          resolve([]);
          return;
        }
        
        const recipeIds = JSON.parse(row.recipe_ids);
        const placeholders = recipeIds.map(() => '?').join(',');
        
        this.db.all(`
          SELECT * FROM recipes WHERE id IN (${placeholders})
        `, recipeIds, (err, rows: any[]) => {
          if (err) {
            reject(err);
            return;
          }
          
          resolve(rows.map(row => this.mapRowToRecipe(row)));
        });
      });
    });
  }

  async getFavoriteRecipes(userId?: string): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT r.* FROM recipes r 
        JOIN favorites f ON r.id = f.recipe_id
      `;
      let params: any[] = [];
      
      if (userId) {
        sql += ' WHERE f.user_id = ?';
        params.push(userId);
      }
      
      this.db.all(sql, params, (err, rows: any[]) => {
        if (err) {
          reject(err);
          return;
        }
        
        resolve(rows.map(row => this.mapRowToRecipe(row)));
      });
    });
  }

  private cacheRecipe(recipeId: string, request: RecipeRequest): void {
    const ingredientsHash = this.hashIngredients(request.ingredients);
    
    this.db.get(`
      SELECT recipe_ids FROM recipe_cache 
      WHERE ingredients_hash = ? AND cuisine = ?
    `, [ingredientsHash, request.cuisine], (err, row: any) => {
      if (err) {
        console.error('Error checking cache:', err);
        return;
      }
      
      if (row) {
        const existingIds = JSON.parse(row.recipe_ids);
        if (!existingIds.includes(recipeId)) {
          existingIds.push(recipeId);
          this.db.run(`
            UPDATE recipe_cache 
            SET recipe_ids = ?, created_at = CURRENT_TIMESTAMP
            WHERE ingredients_hash = ? AND cuisine = ?
          `, [JSON.stringify(existingIds), ingredientsHash, request.cuisine]);
        }
      } else {
        this.db.run(`
          INSERT INTO recipe_cache (ingredients_hash, cuisine, recipe_ids)
          VALUES (?, ?, ?)
        `, [ingredientsHash, request.cuisine, JSON.stringify([recipeId])]);
      }
    });
  }

  private hashIngredients(ingredients: string[]): string {
    return ingredients.sort().join(',').toLowerCase();
  }

  private mapRowToRecipe(row: any): Recipe {
    return {
      id: row.id,
      title: row.title,
      cuisine: row.cuisine,
      ingredients: JSON.parse(row.ingredients),
      instructions: JSON.parse(row.instructions),
      cookingTime: row.cooking_time,
      servings: row.servings,
      difficulty: row.difficulty,
      description: row.description,
      tags: row.tags ? JSON.parse(row.tags) : []
    };
  }
}