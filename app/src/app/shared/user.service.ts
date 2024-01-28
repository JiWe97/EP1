import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Registers a new user
  async register(userName:any, password:any, firstName:any, lastName:any, email:any) {
    //Generate salt and hash password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //Create user object with hashed password
    const user = {
      userName: userName,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    // Send POST request with user object
    const result = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    // Return result
    return result.json();
  }
  
  //fetches all users with GET request
	async getUsers() {
      return  (await fetch('http://localhost:8000/api/users')).json()
    }
  
    // Checks user credentials and returns a valid token or null
    async  login(userName:  string, password:  string) {
      // Get all users
      let users = await this.getUsers();
      // Find user with matching username
      let user = users.find((u: { username: string; password: string; }) => u.username === userName);
      // Check if user exists and password is correct
      if (user && bcrypt.compareSync(password, user.password)) {
        return user.id.toString();
      }
      // Return null if user does not exist or password is incorrect
      return null;
    }
}
