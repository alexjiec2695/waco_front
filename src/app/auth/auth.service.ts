import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor() { }

  isAuthenticated() {
    if (localStorage["login"] == "true") {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
    return this.isLoggedIn;
  }

}

