import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errorMsg = "";

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.username.trim().length === 0) {
      this.errorMsg = "Username is required";
      return;
    }
    if (this.password.trim().length === 0) {
      this.errorMsg = "Password is required";
      return;
    }
    this.errorMsg = "";
    // console.log(this.username, this.password);
    let res = this.auth.login(this.username, this.password);
    if (res) {
      this.router.navigate(['/home']);
    }
    else {
      this.errorMsg = "Login Failed";
    }
  }
}
