import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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


  register() {
    console.log('You have been registered:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });

    alert('Registration successful!'); // Show a notification
    console.log('You have been registered'); // Log to console
  }
}
