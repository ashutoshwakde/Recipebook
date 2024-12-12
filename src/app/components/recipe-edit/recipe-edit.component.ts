import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  isNewRecipe = true;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;

  constructor( private route: ActivatedRoute, private router: Router, private recipeService: RecipeService, private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const recipeId = +id;
      const existingRecipe = this.recipeService.getRecipe(recipeId);
      if (existingRecipe) {
        this.isNewRecipe = false;
        this.recipeForm.setValue({
          title: existingRecipe.title,
          description: existingRecipe.description,
          ingredients: existingRecipe.ingredients,
          instructions: existingRecipe.instructions
        });
        this.imagePreview = existingRecipe.image || null;
      }
    }
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imageFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onSave(): void {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      if (this.isNewRecipe) {
        const newRecipe: Recipe = {
          id: new Date().getTime(),
          ...formValue,
          image: this.imagePreview as string
        };
        this.recipeService.addRecipe(newRecipe);
      } else {
        const updatedRecipe: Recipe = {
          id: +this.route.snapshot.paramMap.get('id')!,
          ...formValue,
          image: this.imagePreview as string
        };
        this.recipeService.updateRecipe(updatedRecipe);
      }
      this.router.navigate(['/']);
    } else {
      this.recipeForm.markAllAsTouched();
    }
  }
}
