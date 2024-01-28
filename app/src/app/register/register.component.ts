import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //Declarations for user registration
  firstName:string ='';
  lastName:string='';
  email:string='';
  password:string='';
  userName:string='';
  showPassword: boolean = false;

  //constructor with dependency injection
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  //method to handle user submission
  onSubmit() {
    //redirect to login
    this.router.navigate(['/login']);
    //Create request options for POST request
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0'},
      body: JSON.stringify({
         "firstname": this.firstName,
         "email": this.email,
         "password": this.password,
         "lastname": this.lastName,
         "username": this.userName
      })
     };
    // Send POST request
    fetch('http://localhost:8000/api/users', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    //Log user registration into console  
    console.log('You have been registered:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      userName: this.userName
    });

    //Use the userService to register the user
    this.userService.register(this.userName, this.password, this.firstName, this.lastName, this.email);// Show a notification
    this.toastr.success('Egg-celent, you have been registered!', '', {
      positionClass: 'toast-bottom-right'
    });
    //log success into console
    console.log('You have been registered'); // Log to console
  
    // clear the fields;
      this.userName = '';
      this.password = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      
  }
  // toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}

