import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  async register(userName:any, password:any, firstName:any, lastName:any, email:any) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      userName: userName,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    const result = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return result.json();
  }
  
  
  constructor() { }
  // //Dummy users to replace later.
  // users = [
  //   { id: 1, username: 'johndoe', password: 'password' },
	//   { id: 2, username: 'janedoe', password: 'password' },
  // ];

  // Returns all users

	async getUsers() {
      return  (await fetch('http://localhost:3000/users')).json()
    }
  
    // Checks user credentials and returns a valid token or null
    async  login(userName:  string, password:  string) {
      let users = await this.getUsers();
		let user = users.find((u: { username: string; }) => u.username === userName);
		if (!user || user.password !== password) {
			return null;
		}
		return user.id.toString();
    }
}
