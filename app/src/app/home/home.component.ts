import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title:string = 'Eindproef Frontend';
  creators:string = 'Jill Wets (Scrum master), Shelsy De Ryck & Vicki Ramsdonck';
  url: string = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?';
  // API-Key: 'b06c21640fmsh438bbf84fa412e8p10cf73jsn777c26bfa573';
	// API-Host: 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  recipes: any [] = []; /* horoscope */
  recipe: any; /* zodiac */
  mySearch: string = '';
  // title: any;

getData() {
  fetch(this.url)
    .then(response => response.json())
    .then(json => {
        this.recipes = json;
        this.recipe = this.recipes.find(recipes => recipes.title.includes(this.mySearch));
      if (this.recipe) {
        console.log('Recipe:', this.recipe);
      } else {
        console.log(`No recipes found for ${this.recipe}`);
      } 
    })
    .catch(err => console.error(err));
}
  ngOnInit() {
    this.getData();
  }
}
