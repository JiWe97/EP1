import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName!: string;
  password!: string;
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  async onSubmit() {
    
    const token = await this.userService.login(this.userName, this.password);
    if (token) {
      //Store token in local storage
      localStorage.setItem('userName', this.userName.toString());
      localStorage.setItem('token', token);
      //Redirect to protected component
      this.router.navigate(['/home']);
      console.log('Login successful for user:', this.userName);

    } else {
      alert('Invalid username or password.');
    }

    //console.log('Login successful for user:', this.userName);
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
// logout method
	logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    console.log('Logged out successfully');
    }
}
