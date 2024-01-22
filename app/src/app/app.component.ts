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
    console.log('You are logged in');
    
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
}
