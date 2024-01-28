import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //declarations for login
  userName!: string;
  password!: string;
  showPassword: boolean = false;


  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  //method to handle login submission
  async onSubmit() {
    //call userService to attempt login
    const token = await this.userService.login(this.userName, this.password);

    //check if login was successful
    if (token) {
      //Store token in local storage
      localStorage.setItem('userName', this.userName.toString());
      localStorage.setItem('token', token);
      //Redirect to protected component
      this.router.navigate(['/home']);
      console.log('Login successful for user:', this.userName);
      this.toastr.success('We are so hap-pea to see you', this.userName, {
        positionClass: 'toast-bottom-right'
      });
    } else {
      //toastr warning
      this.toastr.warning('Holy guacemoly, you have entered an invalid username or password!', '', {
        positionClass: 'toast-bottom-right'
      });
    }

  }

  // toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
 

  }
}