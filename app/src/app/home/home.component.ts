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
  search: any; 
  results: any;
  title: any;
  mySearch: string = '';
  apiKey: string = 'apiKey=a1bb1c31a31948c8b57d41dd27e57ee8&query=';
  apiHost: string = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  i: any;
  

  getData() {
    fetch(this.url  + this.apiKey + this.mySearch)
      .then(response => response.json())
      .then(json => {
          this.recipes = json.results;
          this.search = this.recipes.filter(recipes => recipes.title.includes(this.mySearch));
        if (this.search) {
          console.log('Recipe:', this.search);
        } else {
          console.log(`No recipes found for ${this.search}`);
        } 
      })
      .catch(err => console.error(err));
  }
/* 
  postData() {
    for (let i = 0; i < 5; i++) {
      const card = document.createElement("div");
                  card.innerHTML = `
                      <div class="card" style="width: 18rem;" >
                        <img src="{{this.search[i].image}}" class="card-img-top" alt="{{this.search[i].title}}">
                        <div class="card-body">
                          <h5 class="card-title">{{this.search[i].title}}</h5>
                          <a href="#" class="btn btn-primary">Let's cook!</a>
                        </div>
                      </div>
                  `;
    }
  
  } */


ngOnInit() {
  this.getData();
}
}


 

