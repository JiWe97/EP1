import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
recipe: any;
mySearch: string = '';
search: any;
/* showAddRecipe: boolean = true;
showSearchRecipe: boolean = false; */
constructor(private toastr: ToastrService) { }

getToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found in local storage');
    return;
  } else {
    console.log('Token found in local storage:', token);
  }
}

  addRecipe() {
    this.toastr.success('Berry nice, you have added this recipe to your collection.', '', {
      
    })
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0'},
      body: JSON.stringify({
          "title": this.title,
          "ingredient": this.ingredient,
          "step": this.step,
          "user_id": token
    })
    
     };
     console.log('Options before fetch: '+JSON.stringify(options));
      fetch(this.url, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.title;
        this.ingredient;
        this.step;
      })
      .catch(err => console.error(err));
  } 

  searchRecipe() {
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

  postRecipe() {
   
    const token = localStorage.getItem('token');
    fetch(this.url)
    .then(response => response.json())
    .then(json => {
        this.recipes = json;
        this.recipe = this.recipes.filter(recipe => recipe.user_id === Number(token));
      if (this.recipe) {
        console.log('Recipes:', this.recipe);
      } else {
        console.log('No recipes found');
      }
    })
    .catch(err => console.error(err));
  }



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
