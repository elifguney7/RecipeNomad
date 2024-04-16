import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Failed to load user data', error);
      }
    });
  }

  logout() {
    // Clear the token or any other authentication data
    localStorage.removeItem('token');

    // Redirect to home or sign-in page
    this.router.navigate(['/sign-in']);
  }
}
