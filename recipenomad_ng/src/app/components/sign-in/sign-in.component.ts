import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  constructor(private userService: UserService) { }
  users: any[] = [];
 
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

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
}
