import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

import { LoginService } from './login.service';
import { UserLoggerService } from '../user_logger/user_logger.service';
import { UserLogger } from '../user_logger/user_logger.model';
import { AlertService } from '../../apps/alerts/alerts.service';
import { SidenavItem } from '../../../layout/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from '../../../layout/sidenav/sidenav.service';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;
  year = 0;
  userLogged: any;
  isSendPassword: Boolean = false;
  email: string = '';

  structureForm = {
    login: { emailErr: '', isEmailErr: false, blockButtton: false},
    reset: { emailErr: '', isEmailErr: false, blockButtton: false},
  }
  

  matcherEmail1 = {
    isErrorState: () => {
      return this.structureForm.login.isEmailErr; // return Boolean status value
    }
  };

  matcherEmail2 = {
    isErrorState: () => {
      return this.structureForm.reset.isEmailErr; // return Boolean status value
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private loginService: LoginService,
              private userService : UserLoggerService,
              private alerts: AlertService,
              private sidenavService: SidenavService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    let date = new Date();
    this.year = date.getFullYear();
    this.userLogged = this.userService.getUserLoggedIn();
    if(this.userLogged){
      this.logout(this.userLogged);
    }
  }

  send() {
    if(this.form.valid){
      this.loginService.login(this.form.value).subscribe({
        next: res => {
          if(res['status'] == 1){
            let u = res['text'];   
            this.setTypesTest(u); 
          }else{
            this.alerts.dangerMessage(res.text);
          }
        },
        error: error => {
          console.error(error);
          this.alerts.dangerMessage(error.message);
        }
      })
    }else{
      this.alerts.dangerMessage('Existen errores en los campos');
    }
  }

  navigate() {
    this.router.navigateByUrl('/');
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  logout(user){
    this.loginService.logout(user).subscribe(
      res => {
        this.userService.setLogged(false);
        this.userService.deleteUserLogged();
      },
      error => {
        console.error(error);
      },
      () => this.navigate()
    );
  }

  setTypesTest(user){
    this.userService.setUserLoggedIn(user);
    this.userService.generateMenu(user);
    this.navigate();
  }

  showSendPassword(){
    this.isSendPassword = !this.isSendPassword;
  }

  sendPassword(){
    if(this.email != '' && !this.structureForm.reset.isEmailErr){
      this.loginService.resetPassword(this.email).subscribe(
        res => {
          if(res['status'] == '1'){
            this.email = '';
            this.isSendPassword = !this.isSendPassword;
            this.alerts.infoMessage(res['text']);
          }else{
            this.alerts.dangerMessage(res['text']);
          }
        }
      )
    }else{
      this.alerts.dangerMessage('Debe ingresar un email valido');
    }
  }

  goRegister(){
    this.router.navigateByUrl('/register');
  }

  validEmail(email, field){
    let result = true;
    this.structureForm[field].isEmailErr = false;
    console.log(email)
    this.structureForm[field].blockButtton = false;
    this.structureForm[field].emailErr = '';
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!expr.test(email)){
      result = false;
      this.structureForm[field].isEmailErr = true;
      this.structureForm[field].emailErr = 'El correo electronico es incorrecto';
      this.structureForm[field].blockButtton = true;
      console.log('aqui')
    }else{
      let arrayEmail = email.split('@');
      if(arrayEmail[1].split('.').length > 4){
        result = false;
        this.structureForm[field].isEmailErr = true;
        this.structureForm[field].emailErr = 'El correo electronico es incorrecto';
        this.structureForm[field].blockButtton = true;
      }
      console.log('aca')
    }
    return result;    
  }
}
