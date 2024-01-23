import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName:string ='';
  lastName:string='';
  email:string='';
  password:string='';
  userName:string='';
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.router.navigate(['/login']);
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
    
    fetch('http://localhost:8000/api/users', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      
    console.log('You have been registered:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      userName: this.userName
    });

    // acces the service and send username and password
    this.userService.register(this.userName, this.password, this.firstName, this.lastName, this.email);
    alert('Registration successful!'); // Show a notification
    console.log('You have been registered'); // Log to console
  
      // clear the fields;
      this.userName = '';
      this.password = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}

