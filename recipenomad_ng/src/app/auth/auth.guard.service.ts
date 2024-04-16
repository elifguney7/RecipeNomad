import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = localStorage.getItem('token');
    const isLoggedIn = !!authToken;

    if (isLoggedIn) {
      return true;
    } else {
      alert('Only logged in users can see this page!');
      this.router.navigate(['/sign-in']); // Replace 'login' with your login page path
      return false;
    }
  }
}