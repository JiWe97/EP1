import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.css'
})
export class MyRecipeComponent {
  url: string = 'http://localhost:8000/api/recipes';
  title: string = '';
  ingredient: string = '';
  step: string = '';
  userId: string = '';
  recipes: any[] = [];
  fieldsArray = ['', ''];
  myRecipes: any[] = [];
  mySearch: string = '';
  search: any;
  showSearchInformation: boolean = true;
  showAddRecipe: boolean = false;
  showSearchResults: boolean = false;

  constructor(private toastr: ToastrService,private router: Router) { }

  // Retrieve user_id from local storage
  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in local storage');
      return;
    } else {
      console.log('Token found in local storage:', token);
    }
  }

  // Show input fields to add recipe
  plus() {
    this.showSearchInformation = false;
    this.showAddRecipe = true;
  }

  // Go back to overview of favorites
  goBack() {
    this.showSearchInformation = true;
    this.showAddRecipe = false;
    this.showSearchResults = false;
    this.postRecipe();
  }

  // Displaying added recipes
  postRecipe() {
    const token = localStorage.getItem('token');
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.recipes = json;
        this.myRecipes = this.recipes.filter(recipe => recipe.user_id === Number(token));
        if (this.myRecipes) {
          console.log('Recipes:', this.myRecipes);
        } else {
          console.log('No recipes found');
        }
      })
      .catch(err => console.error(err));
  }

  deleteRecipe (id: any) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' }
    };
    fetch(this.url + '/delete/' + id, options)
    // TODO: Dit nog vragen aan Massimo
      // .then(response => response.json())
      // .then(response => console.log(response))
      .then(() => {
        this.toastr.success('Your recipe has bean deleted', '', {})
        this.myRecipes = this.myRecipes.filter(recipe => recipe.id !== id);
      })
      .catch(err => console.error(err));
  }
  // Add recipe to database
  submit() {
    this.toastr.success('Berry nice, you have added this recipe to your collection.', '', {
    })
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify({
        "title": this.title,
        "ingredient": this.ingredient,
        "step": this.step,
        "user_id": token
      })
    };
    console.log('Options before fetch: ' + JSON.stringify(options));
    fetch(this.url, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.title;
        this.ingredient;
        this.step;
      })
      .catch(err => console.error(err));
    // Clear the fields
    this.title = '';
    this.ingredient = '';
    this.step = '';
  }

  // Search through recipes in API based on title
  searchRecipe() {
    this.showSearchInformation = false;
    this.showAddRecipe = false;
    this.showSearchResults = true;
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.recipes = json;
        this.search = this.recipes.filter(recipes => recipes.title.includes(this.mySearch));
        if (this.search) {
          console.log('Recipes:', this.search);
        } else {
          console.log(`No recipes found for ${this.search}`);
        }
      })
      .catch(err => console.error(err));
  }

  // Display recipe information
  /* getRecipe(id: any) {
    this.hideSearchInformation = false;
    this.hideRecipeInformation = true;

  } */



  /* addField() {
      // Add a new field
      this.fieldsArray.push('');
    }
  
    submitForm() {
      // making use of the destructor again ;) yay
      const values = [...this.fieldsArray];
      console.log(values);
  
      // clear the fields;
      this.fieldsArray = ['', ''];
  
      alert(values.join('\n'));
    } */

  ngOnInit() {
    this.postRecipe();
  }
} 
