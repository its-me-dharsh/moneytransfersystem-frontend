import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedin = false;
  error: string = '';
  data: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
    if (this.isLoggedin) {
      const user = this.authService.getLoggedinUser();
      if (user && user.account && user.account.id) {
        this.router.navigate(['/dashboard', user.account.id]);
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }
  }

  doLogin() {
    if (this.username && this.password) {
      this.authService.authenticate(this.username, this.password)
        .subscribe({
          next: (user) => {
            this.data = user;
            console.log("Login success:", this.data);

            const accountId = user.account.id;
            this.router.navigate(['/dashboard', accountId]);
          },
          error: () => {
            this.error = "Invalid credentials!";
          }
        });
    } else {
      window.alert("Invalid credentials!!!");
    }
  }
}
