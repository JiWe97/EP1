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
   apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8';  /* Key Jill */
   //apiKey: string = 'apiKey=8c32bde673c647bea5690466e6f0e444'; /* Key Vicki */
   savedRecipes: any [] = [];
   user_id: string = '';
   recipe_id: any;
   id: any;
   results: any;
   hideRecipeInformation: boolean = true;
   hideSearchInformation: boolean = false;
   

   getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in local storage');
      return;
    } else {
      console.log('Token found in local storage:', token);
    }
  }
  getFavorites() {
    const token = localStorage.getItem('token');
    fetch(this.url)
    .then(response => response.json())
    .then(json => {
        this.savedRecipes = json;
        this.favoritesFromDB = this.savedRecipes.filter(favorite => favorite.user_id === Number(token));
      if (this.favoritesFromDB) {
        console.log('Favorites:', this.favoritesFromDB);
        this.favorite_recipes = this.favoritesFromDB.map((favoriteFromDB) => this.postFavorites(favoriteFromDB.recipe_id));
        
      } else {
        console.log('No favorites found');
      }
    })
    .catch(err => console.error(err));
  }

  postFavorites(id: any) {
    const options = {method: 'GET', headers: {'User-Agent': 'insomnia/8.4.5'}};
    console.log('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey);
    
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(err => console.error(err));
  }

  /* getRecipe(id: any) {
     this.hideRecipeInformation = false;
    this.hideSearchInformation = true;
  } */

  goBack() {
    this.hideRecipeInformation = true;
    this.hideSearchInformation = false;
  }

  ngOnInit() {
    this.getFavorites();
  }
}
