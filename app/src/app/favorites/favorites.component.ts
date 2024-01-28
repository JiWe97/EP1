import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  apiKey: string = 'apiKey=8c32bde673c647bea5690466e6f0e444'; /* Key Vicki */
  //apiKey: string = 'apiKey=396ee1bd3a5849709f010c5c693ea80e'; /*  Key Jill2  */
  //apiKey: string = 'apiKey=2e956ecadaf540638938a49e14e44ee6'; /*  Key Jill3  */
  savedRecipes: any[] = [];
  user_id: string = '';
  recipe_id: any;
  id: any;
  results: any;
  hideCookingInformation: boolean = true;
  hideFavorites: boolean = false;
  likedRecipes: { [key: string]: boolean } = {};
  likedRecipesId: { [key: string]: boolean } = {};

  constructor(private toastr: ToastrService) { }


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
  getFavoritesData() {
    const token = localStorage.getItem('token');
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.savedRecipes = json;
        this.favoritesFromDB = this.savedRecipes.filter(favorite => favorite.user_id === Number(token));

        // Build a map of favorite recipes from the querry result
        this.likedRecipes = this.favoritesFromDB.reduce(function (map, obj) {
          map[obj.recipe_id] = true;
          return map;
        }, {});

        this.likedRecipesId = this.favoritesFromDB.reduce(function (map, obj) {
          map[obj.recipe_id] = obj.id;
          return map;
        }, {});

        if (this.favoritesFromDB) {
          console.log('Favorites:', this.favoritesFromDB);
          this.favoritesFromDB.map((favoriteFromDB) => this.postFavorites(favoriteFromDB.recipe_id));
        } else {
          console.log('No favorites found');
        }
      })
      .catch(err => console.error(err));
  }
  // Posting the favorite recipes
  postFavorites(id: any) {
    this.hideCookingInformation = true;
    this.hideFavorites = false;
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.4.5' } };
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
      .then(response => response.json())
      .then(json => {
        this.favorite_recipes.push(json);
      })
      .catch(err => console.error(err));
  }
  // Showing the instructions of the recipe
  letsCook(id: any) {
    this.hideCookingInformation = false;
    this.hideFavorites = true;
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.4.5' } };
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
      .then(response => response.json())
      .then(json => {
        this.results = json;
      })
      .catch(err => console.error(err));
  }
  // Add or remove favorite
  addOrRemoveFavorite(id: any) {
    console.log("Removing from favorites " + id);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
    }

    fetch('http://localhost:8000/api/favorites/delete/' + this.likedRecipesId[id], options)
      .then(() => {
        this.likedRecipes[id] = false;
        this.favorite_recipes = this.favorite_recipes.filter(recipe => recipe.id !== id);
        this.toastr.success('Donut worry, this recipe was removed from your favorites', '', {})
      })
      .catch(err => console.error(err));
  }

  goBack() {
    this.hideCookingInformation = true;
    this.hideFavorites = false;
  }

  ngOnInit() {
    this.getFavoritesData();
  }
}
