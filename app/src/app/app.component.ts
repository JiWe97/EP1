import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  constructor(private toastr: ToastrService) { }

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
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    console.log('Logged out successfully');
    this.toastr.success('We will tira-miss you', '', {
      positionClass: 'toast-bottom-right'
    });
    }
}
