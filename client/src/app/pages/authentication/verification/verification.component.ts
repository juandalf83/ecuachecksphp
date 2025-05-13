import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

import { LoginService } from '../login/login.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../apps/alerts/alerts.service';

@Component({
  selector: 'fury-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  animations: [fadeInUpAnimation]
})
export class VerificationComponent implements OnInit {

  user: any = '';
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private alerts: AlertService,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    let token = this._route.snapshot.paramMap.get('token');
    this.userService.getUserActive(token).subscribe({
      next: res => {
        if(res['status'] == 1){
          this.user = res['text'];
        }
      },
      error: error => {
        console.error(error)
      }
    })
  }

  activeUser(){
    this.loginService.resetPassword(this.user.email).subscribe(
      res => {
        if(res['status'] == '1'){
          this.alerts.infoMessage('Gracias por tu verificación, hemos enviado un correo con tu usuario y contraseña');
          this.router.navigateByUrl('/login');
        }else{
          this.alerts.dangerMessage(res['text']);
        }
      }
    )
  }
}
