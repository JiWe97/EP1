import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';

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

  constructor(private userService: UserService) {}

  onSubmit() {
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
  }
}
