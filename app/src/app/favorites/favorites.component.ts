import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  url: string = 'http://localhost:8000/api/favorites';
  apiUrl: string = 'https://api.spoonacular.com/recipes/716428/information';
  favoritesFromDB: any[] = [];
  favorite_recipes: any[] = [];
   // apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8'; /* /  Key Jill*/
   // apiKey: string = 'apiKey=8c32bde673c647bea5690466e6f0e444'; /* Key Vicki */
   // apiKey: string = 'apiKey=396ee1bd3a5849709f010c5c693ea80e'; /*  Key Jill2  */
  apiKey: string = 'apiKey=2e956ecadaf540638938a49e14e44ee6'; /*  Key Jill3  */
  savedRecipes: any [] = [];
  user_id: string = '';
  recipe_id: any;
  id: any;
  results: any;
  hideRecipeInformation: boolean = true;
  hideSearchInformation: boolean = false;
   
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
  // Getting the data of the favorite recipes
  getFavorites() {
    const token = localStorage.getItem('token');
    fetch(this.url)
    .then(response => response.json())
    .then(json => {
        this.savedRecipes = json;
        this.favoritesFromDB = this.savedRecipes.filter(favorite => favorite.user_id === Number(token));
      if (this.favoritesFromDB) {
        console.log('Favorites:', this.favoritesFromDB);
        this.favoritesFromDB.map((favoriteFromDB) => this.postFavorites(favoriteFromDB.recipe_id));
        
      } else {
        console.log('No favorites found');
      }
    })
    .catch(err => console.error(err));
  }
// Giving an overview of all the liked recipes
  postFavorites(id: any) {
    const options = {method: 'GET', headers: {'User-Agent': 'insomnia/8.4.5'}};
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
    .then(response => response.json())
    .then(json => {
      this.favorite_recipes.push(json);
    })
    .catch(err => console.error(err));
  }
// Showing the instructions of the recipe
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

  ngOnInit() {
    this.getFavorites();
    this.postFavorites(this.recipe_id);
  }
}
