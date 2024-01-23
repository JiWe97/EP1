import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class CreateRecipeComponent implements OnInit {
  title: string = '';
  description: string = '';
  loadRecipes: boolean = true;
<<<<<<< HEAD
  ingredientsInput: any[] = [''];
  // ingredientsList: string[] = [];
  stepsInput: any[] = [''];
  // config: Env = {
  //   production: false,
  //   api: 'http://localhost:3000',
  //   version: "1.0.0"
    
  // }

  // recipesObservable = this.recipeService.getRecipes();
=======
  ingredientsInput = [''];
  stepsInput = [''];
>>>>>>> createRecipe

  myRecipes: any[] = [];
  dbURL: string = '../../db/db.json';
  pageURL: string = 'http://localhost:3000/recipes';
  constructor(
  ) {}

  ngOnInit() {
    this.fetchMyData();
    // console.log(this.recipesObservable)
  }

  fetchMyData() {
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
    console.log(this.ingredientsInput);
    const ingredientValues = [...this.ingredientsInput];
    console.log(ingredientValues);
    this.ingredientsInput = [''];
    alert(ingredientValues.join('\n'));

    const stepValues = [...this.stepsInput];
    console.log(stepValues);
    this.stepsInput = [''];
    alert(stepValues.join('\n'));
    
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
      body: JSON.stringify({
        title: this.title,
        // owner: " ",
        // owner: this.owner,
        description: this.description,
        ingredient: ingredientValues,
        step: stepValues
        // ingredients: [this.ingredients],
        // steps: [this.steps]
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
  

<<<<<<< HEAD
 
}
=======
  
}
>>>>>>> createRecipe
