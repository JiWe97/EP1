import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  /* title: string = 'Eindproef Frontend'; */
  creators:string = 'Jill Wets (Scrum master), Shelsy De Ryck & Vicki Ramsdonck';
  url: string = 'https://api.spoonacular.com/recipes/complexSearch?';
  recipes: any [] = []; 
  results: any [] = [];
  dish: any;
  search: any; 
  title: any;
  i: any;
  id: any;
  element: any;
  mySearch: string = '';
  hideRecipeInformation: boolean = true;
  apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8&query=';
  apiHost: string = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  

  getData() {
    fetch(this.url  + this.apiKey + this.mySearch)
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

  getRecipe(id: any) {
    this.hideRecipeInformation = false;
    const options = {method: 'GET', headers: {'User-Agent': 'insomnia/8.4.5'}};
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
    .then(response => response.json())
    .then(json => {
      this.results = json;
    })
    .catch(err => console.error(err));
  }

ngOnInit() {
  this.getData();
}
}


 

