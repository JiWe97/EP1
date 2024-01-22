import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  isLoggedIn() {
    // Implement logic to check if the user is logged in
    // For simplicity, you can return true/false based on a variable or authentication service
    return true; // Placeholder value, update as needed
  }

  getUsername() {
    // Implement logic to get the username of the logged-in user
    // For simplicity, you can return a hardcoded username or retrieve it from an authentication service
    return 'JohnDoe'; // Placeholder value, update as needed
  }
}
