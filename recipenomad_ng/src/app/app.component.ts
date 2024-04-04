import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 constructor(private userService: UserService) { }

  createUser() {
    const user = { username: 'John Doe', email: 'john@example.com', age: 30 };
    this.userService.createUser(user).subscribe(
      response => {
        console.log('User created:', response);
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      response => {
        console.log('User deleted:', response);
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
