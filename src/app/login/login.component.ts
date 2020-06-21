import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../model/korisnik';
import { UserServiceService } from '../services/user-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { KorisnikTokenState } from '../model/korisnik-token-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  htmlString: string;

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private authService: AuthServiceService) { }

  ngOnInit() {
  }

  loginUser() {
    this.userService.loginUser(this.korisnik).subscribe(
      data => {
        this.checkUser(data);
      },
      err => {
        this.handleAuthError(err);
      });

  }

  checkUser(logged) {
    const userToken = logged as KorisnikTokenState;
    if (userToken.accessToken === 'error') {
      this.htmlString = 'Username ili password nije korektan.';
    } else if (userToken.accessToken === 'notActivated') {
      this.htmlString = 'Vas account nije jos aktiviran.';
    } else {
      this.authService.setJwtToken(userToken.accessToken);
      this.userService.getLogged(userToken.accessToken).subscribe(
        data => {
          console.log('return: ' + data);
          window.location.href = 'http://localhost:4202/homepage';
        });
    }
  }

  handleAuthError(err: HttpErrorResponse) {
    if (err.status === 404) {
      alert('Unesen username nije validan!');
    }
  }
}
