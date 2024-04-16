// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private http: HttpClient) { }

//   private apiUrl = 'http://localhost:3000/users';

//   createUser(user: any) {
//     return this.http.post<any>('http://localhost:3000/users', user);
//   }

//   deleteUser(userId: string) {
//     return this.http.delete<any>(`http://localhost:3000/users/${userId}`);
//   }

//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
