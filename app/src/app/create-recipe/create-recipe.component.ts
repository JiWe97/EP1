import { Component, OnInit } from '@angular/core';
// import { MyRecipesService } from '../../shared/my-recipes.service';
import { FormsModule} from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { MyUsers } from '../my-users.interface';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  imports: [
    FormsModule
    
  ],
  standalone: true,
  providers: [
    // MyRecipesService
  ]
})
export class CreateRecipeComponent implements OnInit {
  title: string = '';
  description: string = '';
  ingredients: string[] = [''];
  steps: string[] = [''];
  loadRecipes: boolean = true;
  ingredientsInput: string[] = [``];
  // ingredientsList: string[] = [];
  stepsInput: string[] = [''];
  // config: Env = {
  //   production: false,
  //   api: 'http://localhost:3000',
  //   version: "1.0.0"
    
  // }

  // recipesObservable = this.recipeService.getRecipes();

  myRecipes: any[] = [];
  dbURL: string = '../../db/db.json';
  pageURL: string = 'http://localhost:3000/recipes';
  constructor(
    // private recipeService: MyRecipesService,
    // private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchMyData();
    // console.log(this.recipesObservable)
  }

  fetchMyData() {
    // this.recipeService.getRecipes().subscribe(recipes => {
    //   this.recipes = recipes;
    // }, error => {
    //   console.error('Error fetching recipes:', error);
    // });
    fetch(this.pageURL)
    .then(response => response.json())
    .then(json => {

      this.myRecipes = json;
      console.log(json);
    }
    )
    .catch(
      error => console.error('Error fetching recipes:', error)
    );
  }
  showRecipes()
  {
    this.loadRecipes = !this.loadRecipes;
  }

  postData() {
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
      body: JSON.stringify({
        title: this.title,
        // owner: " ",
        // owner: this.owner,
        description: this.description,
        ingredients: [this.ingredients],
        steps: [this.steps]
      })
    }; 

    fetch('http://localhost:3000/recipes', data)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.error(error));

    this.fetchMyData();
    this.showRecipes();
  }

  addIngredient()
  {
    //<input type="text" class="form-control" id="ingredients{{ingredientsList.length}}" [(ngModel)]="ingredientsList" name="ingredient">
    this.ingredientsInput.push(``);
  }

  addStep(){
    this.stepsInput.push('');
  }
  // deleteTodo(id: number) {
  //   this.http.delete('http://localhost:4200/recipes/' + id)
  //     .subscribe(response => {
  //       console.log('Todo deleted successfully!');
  //       this.fetchMyData();
  //     }, error => console.error(error));
  // }

  // doneTodo(id: number) {
  //   const data = { done: true };

  //   this.http.patch('http://localhost:4200/recipes/' + id, JSON.stringify(data))
  //     .subscribe(response => {
  //       console.log('Todo marked as done successfully!');
  //       this.fetchMyData();
  //     }, error => console.error(error));
  // }


  
}
