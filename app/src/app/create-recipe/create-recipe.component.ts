import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyRecipesService } from '../../shared/my-recipes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipesObservable = this.recipeService.getRecipes();
  // recipes: MyRecipesService[];

  // const mappedRecipesObservable = recipesObservable.pipe(
  //   ap((response) => response.data)
  // );

  recipes: any[] = [];


  constructor(
    private http: HttpClient,
    private recipeService: MyRecipesService
  ) {}

  ngOnInit() {
    this.fetchMyData();
  }

  fetchMyData() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    }, error => {
      console.error('Error fetching recipes:', error);
    });
  }

  postData() {
    const data = {}; // Fill this object with your data

    this.http.post('http://localhost:4200/recipes', JSON.stringify(data))
      .subscribe(response => response.json(), error => console.error(error));
  }

  deleteTodo(id: number) {
    this.http.delete('http://localhost:4200/recipes/' + id)
      .subscribe(response => {
        console.log('Todo deleted successfully!');
        this.fetchMyData();
      }, error => console.error(error));
  }

  doneTodo(id: number) {
    const data = { done: true };

    this.http.patch('http://localhost:4200/recipes/' + id, JSON.stringify(data))
      .subscribe(response => {
        console.log('Todo marked as done successfully!');
        this.fetchMyData();
      }, error => console.error(error));
  }
}
