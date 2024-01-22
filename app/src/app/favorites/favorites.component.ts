import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  url: string = 'http://127.0.0.1:8000/api/favorites/';
  apiUrl: string = 'https://api.spoonacular.com/recipes/716428/information';
  favorites: any[] = [];
   /* apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8';  Key Jill*/
   apiKey: string = 'apiKey=8c32bde673c647bea5690466e6f0e444'; /* Key Vicki */
   myFavorite: string = '';
   favorite: any;
   savedRecipes: any [] = [];
   userId: string = '';
   recipeId: string = '';
  getFavorites() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1'},
      body: JSON.stringify({
        "userId": this.userId,
        "recipeId": this.recipeId,
     })
    };
    
    fetch(this.url, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  getSuggestions() {
    fetch(this.url  + this.apiKey + '&query=' + this.myFavorite)
      .then(response => response.json())
      .then(json => {
          this.savedRecipes = json;
          this.favorite = this.savedRecipes.filter(savedRecipes => savedRecipes.title.includes(this.myFavorite));
        if (this.favorite) {
          console.log('Recipes:', this.favorite);
        } else {
          console.log(`No recipes found for ${this.favorite}`);
        }
      })
      .catch(err => console.error(err));
  }
  postRecipe(id: any) {
    const options = {method: 'GET', headers: {'User-Agent': 'insomnia/8.4.5'}};
    fetch('https://api.spoonacular.com/recipes/' + id + '/information?' + this.apiKey, options)
    .then(response => response.json())
    .then(json => {
      this.savedRecipes = json;
    })
    .catch(err => console.error(err));
  }

  ngOnInit() {
    this.getFavorites();
    this.getSuggestions();
  }
}
