import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']

})
export class SignInComponent {
  credentials = {
    email: '',
    password: ''
  };
  error: string | null = null;  // Declare the error property here

  constructor(private userService: UserService, private router: Router) {}

  signIn(form: NgForm) {
    if (form.valid) {
      this.userService.loginUser(this.credentials).subscribe({
        next: (response) => {
          console.log('User logged in', response);
          this.router.navigate(['/']);
          this.error = null; // Clear any previous error
        },
        error: (error) => {
          console.error('Error logging in', error);
          this.error = 'Invalid email or password'; // Set your error message here
        }
      });
    }
  }
}