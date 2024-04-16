import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {}

  signUp(form: NgForm) {
    if (form.valid) {
      this.userService.createUser(this.user).subscribe({
        next: (response) => {
          console.log('User created', response);
          // Redirect to the sign-in page after successful sign-up
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          console.error('Error creating user', error);
          // Optionally handle errors here (e.g., display an error message)
        }
      });
    }
  }
}
