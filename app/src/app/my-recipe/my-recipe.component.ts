import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.css'
})
export class MyRecipeComponent {
title: string = '';
ingredient: string = '';
step: string = '';
userId: string = '';
recipes: any[] = [];
/*   getSuggestions() {
    fetch('http://localhost:8000/api/recipes')
      .then(response => response.json())
      .then(json => {
          this.recipes = json.results;
          this.search = this.recipes.filter(recipes => recipes.title.includes(this.mySearch));
        if (this.search) {
          console.log('Recipes:', this.search);
        } else {
          console.log(`No recipes found for ${this.search}`);
        }
      })
      .catch(err => console.error(err));
  }*/

  fetchMyData() {
    fetch('http://localhost:8000/api/recipes')
      .then(response => response.json())
      .then(json => this.recipes = json)
  }
  addRecipe() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0'},
      body: JSON.stringify({
          "title": this.title,
          "ingredients": this.ingredient,
          "steps": this.step,
          "userId": this.userId
    })
     };
    fetch('http://localhost:8000/api/recipes', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
        this.title = '';
        this.ingredient = '';
        this.step = '';
      })
      .catch(err => console.error(err));
  }

  postRecipe() {
    const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0'},
      body: JSON.stringify({
          "title": this.title,
          "ingredients": this.ingredient,
          "steps": this.step,
          "userId": this.userId
    })
     };
    fetch('http://localhost:8000/api/recipes', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      console.log('Recipe added:', this.title);
  }

  ngOnInit() {
    this.postRecipe();
  }
}
