import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  /* title: string = 'Eindproef Frontend'; */
  creators: string = 'Jill Wets (Scrum master), Shelsy De Ryck & Vicki Ramsdonck';
  url: string = 'https://api.spoonacular.com/recipes/complexSearch?';
  recipes: any[] = [];
  results: any;
  search: any;
  title: any;
  i: any;
  id: any;
  element: any;
  searchInput: string = '';
  mySearch: string = '';
  myDiet: string = '{{value}}';
  myCuisine: string = `{{id}}`;
  hideRecipeInformation: boolean = true;
  hideSearchInformation: boolean = false;
  recipeId: string = '';
  likedRecipes: { [key: string]: boolean } = {};
  likedRecipesId: { [key: string]: boolean } = {};
  // apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8'; /* /  Key Jill*/
  // apiKey: string = 'apiKey=8c32bde673c647bea5690466e6f0e444'; /* Key Vicki */
  apiKey: string = 'apiKey=396ee1bd3a5849709f010c5c693ea80e'; /*  Key Jill2  */
  //apiKey: string = 'apiKey=2e956ecadaf540638938a49e14e44ee6'; /*  Key Jill3  */
  apiHost: string = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

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

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null; // Return true if a token is found
  }
  getUsername() {
    // Implement logic to get the username of the logged-in user
    try {
      const userName = localStorage.getItem('userName');
      if (userName) {
        return userName;
      } else {
        // Handle case where userName is not set
        return 'Unknown User'; // Placeholder, update as needed
      }
    } catch (e) {
      console.error('Error accessing local storage:', e);
      return 'Unknown User'; // Placeholder, handle this as per your application's logic
    }
  }

  getSuggestions() {
    fetch(this.url + this.apiKey + '&query=' + this.searchInput)
      .then(response => response.json())
      .then(json => {
        this.recipes = json.results;
        this.search = this.recipes.filter(recipes => recipes.title.includes(this.searchInput));
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
    this.mySearch = this.searchInput;
    this.hideRecipeInformation = true;
    this.hideSearchInformation = false;
    fetch(this.url + this.apiKey + '&query=' + this.searchInput + '&diet=' + this.myDiet + '&cuisine=' + this.myCuisine)
      .then(response => response.json())
      .then(json => {
        this.recipes = json.results;
        this.search = this.recipes.filter(recipes => recipes.title.includes(this.searchInput));
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
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.4.5' } };
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
      .then(response => response.json())
      .then(json => {
        this.results = json;
      })
      .catch(err => console.error(err));
  }

  // Getting the data of the favorite recipes
  getFavorites() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/favorites')
      .then(response => response.json())
      .then(json => {
        let querryResult: any[] = json;

        // Keep only the favorite recipes from the user
        querryResult = querryResult.filter(favorite => favorite.user_id === Number(token));

        // Build a map of favorite recipes from the querry result
        this.likedRecipes = querryResult.reduce(function (map, obj) {
          map[obj.recipe_id] = true;
          return map;
        }, {});

        this.likedRecipesId = querryResult.reduce(function (map, obj) {
          map[obj.recipe_id] = obj.id;
          return map;
        }, {});
      })
      .catch(err => console.error(err));
  }

  goBack() {
    this.hideRecipeInformation = true;
    this.hideSearchInformation = false;
  }

  addOrRemoveFavorite(id: any) {
    const token = localStorage.getItem('token');
    const isFavorite = this.likedRecipes[id];

    if (isFavorite) {
      // Remove liked recipe
      console.log("Removing from favorites " + id);
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' }
      }
      fetch('http://localhost:8000/api/favorites/delete/' + this.likedRecipesId[id], options)
        .then(() => {
          this.likedRecipes[id] = false; // Toggle the state
          // No need to save to localStorage, rely on server state
          this.toastr.success('Removed from favorites', '', {})
        })
        .catch(err => console.error(err));

    } else {
      // Add liked recipe to favorites
      console.log("Adding to favorites " + id);
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
        body: JSON.stringify({
          "user_id": token, // Retrieved from localstorage
          "recipe_id": id
        })
      }

      fetch('http://localhost:8000/api/favorites/', options)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.likedRecipes[id] = true; // Toggle the state
          // No need to save to localStorage, rely on server state
          this.toastr.success('Spec-taco-lar, you have added this recipe to your favorites!', '', {})
        })
        .catch(err => console.error(err));
    }
  }
  /* toggleFavorite(id: any) {
    // fetch the token value from the localstorage and assign to a variable
    const token = localStorage.getItem('token');
    const options = {
       method: this.likedRecipes[id] ? 'DELETE' : 'POST',
       headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
       body: JSON.stringify({
         "user_id": token, // it needs to be retrieved from the localstorage
         "recipe_id": id
       })
    }
   
    fetch(`http://localhost:8000/api/favorites/` + id, options)
       .then(response => response.json())
       .then(response => {
         console.log(response);
         this.likedRecipes[id] = !this.likedRecipes[id]; // toggle the state
         localStorage.setItem('likedRecipes', JSON.stringify(this.likedRecipes)); // save the state
       })
       .catch(err => console.error(err));
   } */

  ngOnInit() {
    /* Renew getSuggestions when opening site to see the suggestions */
    this.getSuggestions();
    this.getFavorites();
  }
}
