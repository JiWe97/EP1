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

  //method to check if user is logged in
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null; 
  }

  //method to get username of logged in user
  getUsername() {
    try {
      //attempt to get username from local storage
      const userName = localStorage.getItem('userName');
      //username present? return it
      if (userName) {
        return userName;
      } else {
        //username not present? return a placeholder
        return 'Unknown User';
      }
    } catch (e) { //error accessing local storage
      console.error('Error accessing local storage:', e);
      return 'Unknown User'; 
    }
  }

  //method to logout
  logout() {
    //clear local storage
    localStorage.clear();
    console.log('Logged out successfully');
    this.toastr.success('We will tira-miss you', '', {
      positionClass: 'toast-bottom-right'
    });
    //reload page
    window.location.reload();
  }
}
