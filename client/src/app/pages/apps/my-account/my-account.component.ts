import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

import { AlertService } from '../../apps/alerts/alerts.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'fury-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  animations: [fadeInUpAnimation]
})
export class MyAccountComponent implements OnInit {

  form: FormGroup;
  user: any;
  visible = false;
  cedula: string = '';
  blockButtton: Boolean = false;

  inputType = {
    password: {type: 'password', visible: false}, 
    confirm_password: {type: 'password', visible: false} 
  }

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

  companyErr: string = '';
  isCompanyErr: Boolean = false;
  matcherCompanny = {
    isErrorState: () => {
      return this.isCompanyErr; // return Boolean status value
    }
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.user = this.userLoggerService.getUserLoggedIn();
    this.form = this.fb.group({
      company_name: ['', Validators.required],
      email: [{value: '', disabled: true} || ''],
      phone: ['', Validators.required],
      prefixPhone: [this.prefixPhone],
      active_pass: [false],
      password: '',
      confirm_password: '',
    });
    console.log(this.user);
    this.getUser(this.user.token);
  }

  getUser(token){
    this.userService.getUserActive(token).subscribe({
      next: res => {
        if(res['status'] == 1){
          let data = <any>res['text'];
          console.log(data)
          this.form = this.fb.group({
            company_name: [data.company_name, Validators.required],
            email: [{value: data.email, disabled: true}],
            phone: [data.phone, Validators.required],
            prefixPhone: [{value: this.prefixPhone, disabled:true}],
            active_pass: [false],
            password: '',
            confirm_password: '',
          });
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  save() {
    if(this.form.valid){
      let isUpdate = true;
      if(this.form.value.active_pass){
        if(this.form.value.password){
          if(this.form.value.confirm_password != this.form.value.password){
            isUpdate = false;
            this.alerts.dangerMessage('La contraseña y su confirmación no coiciden');
          }
        }
      }
      if(isUpdate){
        let data = {
          token: this.user.token,
          data: this.form.value,
          company_id: this.user.company_id
        }
        this.userService.saveAccount(data).subscribe({
          next: res => {
            if(res['status'] == 1){
              this.alerts.infoMessage(res['text'])
            }else{
              this.alerts.dangerMessage(res['text'])
            }
          },
          error: error => {
            console.error(error);
            this.alerts.dangerMessage(error.message);
          }
        })
      }
    }else{
      this.alerts.warningMessage('Existen campos con errores')
    }
  }

  onKey(value, field) { 
    value = value.toUpperCase();
    this.form.controls[field].setValue(value) 
  }

  validNumber(){
    this.isPhoneErr = false;
    this.blockButtton = false;
    if(this.form.value.phone != ''){
      if(this.form.value.phone.startsWith('9', 0)){
        if(this.form.value.phone.length == 9){
          this.isPhoneErr = false;
        }else{
          this.phoneErr = 'Error: El número ingresado debe tener 9 dígitos';
          this.isPhoneErr = true;
          this.blockButtton = true;
        }
      }else{
        this.phoneErr = 'Error: El numero no contiene 9 al comienzo';
        this.isPhoneErr = true;
        this.blockButtton = true;
      }
    }
  }

  validCompanyName(){
    this.isCompanyErr = false;
    this.blockButtton = false;
    if(this.form.value.company_name == ''){
      this.companyErr = 'Error: Campo obligatorio';
      this.isCompanyErr = true;
      this.blockButtton = true;
    }
  }

  toggleVisibility(field) {
    if (this.inputType[field].visible) {
      this.inputType[field].type = 'password';
      this.inputType[field].visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType[field].type = 'text';
      this.inputType[field].visible = true;
      this.cd.markForCheck();
    }
  }
}
