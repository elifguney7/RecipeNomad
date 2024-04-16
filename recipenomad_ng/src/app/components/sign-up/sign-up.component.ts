// import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent implements OnInit{
//   constructor(private userService: UserService) { }
//   users: any[] = [];
 
//   ngOnInit(): void {
//     this.userService.getUsers().subscribe(
//       (data) => {
//         this.users = data;
//       },
//       (error) => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }

//   createUser() {
//     const user = { username: 'John Doe', email: 'john@example.com', age: 30 };
//     this.userService.createUser(user).subscribe(
//       response => {
//         console.log('User created:', response);
//       },
//       error => {
//         console.error('Error creating user:', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  signUp(form: NgForm) {
    if (form.valid) {
      this.userService.createUser(this.user).subscribe({
        next: (response) => console.log('User created', response),
        error: (error) => console.error('Error creating user', error)
      });
    }
  }
}
