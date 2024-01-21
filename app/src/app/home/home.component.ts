import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
 
})
export class HomeComponent {
  /* title: string = 'Eindproef Frontend'; */
  creators:string = 'Jill Wets (Scrum master), Shelsy De Ryck & Vicki Ramsdonck';
  url: string = 'https://api.spoonacular.com/recipes/complexSearch?';
  recipes: any [] = [];
  results: any;
  search: any;
  title: any;
  i: any;
  id: any;
  element: any;
  mySearch: string = '';
  myDiet: string = '{{value}}';
  myCuisine: string = `{{id}}`;
  hideRecipeInformation: boolean = true;
  hideSearchInformation: boolean = false;
  /* apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8';  Key Jill*/
  apiKey: string = 'apiKey=8c32bde673c647bea5690466e6f0e444'; /* Key Vicki */
  apiHost: string = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  
  getSuggestions() {
    fetch(this.url  + this.apiKey + '&query=' + this.mySearch)
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
  }
 /* Search through recipes in API based on user input */
  getData() {
    this.hideRecipeInformation = true;
    this.hideSearchInformation = false;
    fetch(this.url  + this.apiKey + '&query=' + this.mySearch + '&diet=' + this.myDiet + '&cuisine=' + this.myCuisine)
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
  }
 
  /* Search through recipes in API based on id */
  getRecipe(id: any) {
    this.hideRecipeInformation = false;
    this.hideSearchInformation = true;
    const options = {method: 'GET', headers: {'User-Agent': 'insomnia/8.4.5'}};
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
    .then(response => response.json())
    .then(json => {
      this.results = json;
    })
    .catch(err => console.error(err));
  }

  goBack() {
    this.hideRecipeInformation = true;
    this.hideSearchInformation = false;
  }

 addFavorite(id:any) {
   console.log(`Saved`,id,`to favorites`);
 }
 
ngOnInit() {
  /* Renew getSuggestions when opening site to see the suggestions */
  this.getSuggestions();
}
}
 