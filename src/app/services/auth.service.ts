import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem("username");

  }
}
