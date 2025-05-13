import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

import { LoginService } from '../login/login.service';
import { AlertService } from '../../apps/alerts/alerts.service';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  year = 0;
  registrationCompleted: Boolean = false;
  blockButtton: Boolean = true;

  emailErr: string = '';
  isEmailErr: Boolean = false;
  matcherEmail = {
    isErrorState: () => {
      return this.isEmailErr; // return Boolean status value
    }
  };

  prefixPhone: string = '+593'
  phoneErr: string = '';
  isPhoneErr: Boolean = false;
  matcherPhone = {
    isErrorState: () => {
      return this.isPhoneErr; // return Boolean status value
    }
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService : LoginService,
    private alerts: AlertService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      company_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      prefixPhone: [{value: this.prefixPhone, disabled:true}],
      authorize: [false]
    });
    let date = new Date();
    this.year = date.getFullYear();
  }

  send() {
    this.loginService.register(this.form.value).subscribe(
      res => {
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text'])
          // this.goLogin()
          this.registrationCompleted = true
        }else{
          this.alerts.dangerMessage(res['text'])
        }
      },
      error => {
        console.error(error);
        this.alerts.dangerMessage(error.message);
      }
    )
  }

  goLogin(){
    this.router.navigateByUrl('/login');
  }

  onKey(value, field) { 
    value = value.toUpperCase();
    this.form.controls[field].setValue(value) 
  }

  validEmail(email){
    let result = true;
    this.isEmailErr = false;
    // this.blockButtton = false;
    this.emailErr = '';
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!expr.test(email)){
      result = false;
      this.isEmailErr = true;
      this.emailErr = 'El correo electronico es incorrecto';
      // this.blockButtton = true;
    }else{
      let arrayEmail = email.split('@');
      if(arrayEmail[1].split('.').length > 4){
        result = false;
        this.isEmailErr = true;
        this.emailErr = 'El correo electronico es incorrecto';
        // this.blockButtton = true;
      }
    }
    return result;    
  }

  validNumber(){
    this.isPhoneErr = false;
    if(this.form.value.phone != ''){
      if(this.form.value.phone.startsWith('9', 0)){
        if(this.form.value.phone.length == 9){
          this.isPhoneErr = false;
        }else{
          this.phoneErr = 'Error: El número ingresado debe tener 9 dígitos';
          this.isPhoneErr = true;
        }
      }else{
        this.phoneErr = 'Error: El numero no contiene 9 al comienzo';
        this.isPhoneErr = true;
      }
    }
  }

  authorize(){
    this.blockButtton = !this.form.value.authorize
  }
}
