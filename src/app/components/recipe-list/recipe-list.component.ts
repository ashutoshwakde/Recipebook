import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  onDelete(id: number): void {
    this.recipeService.deleteRecipe(id);
    this.recipes = this.recipeService.getRecipes();
  }

  onView(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
