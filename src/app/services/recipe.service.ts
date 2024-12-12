// src/app/services/recipe.service.ts
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private storageKey = 'recipes';

  constructor() {
    const savedRecipes = localStorage.getItem(this.storageKey);
    this.recipes = savedRecipes ? JSON.parse(savedRecipes) : [];
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.saveRecipes();
  }

  updateRecipe(updatedRecipe: Recipe): void {
    const index = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    if (index !== -1) {
      this.recipes[index] = updatedRecipe;
      this.saveRecipes();
    }
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveRecipes();
  }

  private saveRecipes(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
  }
}
