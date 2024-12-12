import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';


const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'edit', component: RecipeEditComponent },
  { path: 'edit/:id', component: RecipeEditComponent },
  { path: 'detail/:id', component: RecipeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
