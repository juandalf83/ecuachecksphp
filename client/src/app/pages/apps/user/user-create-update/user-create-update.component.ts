import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { UserService } from '../../../../services/user.service';
import { AlertService } from '../../alerts/alerts.service';
import { UserLoggerService } from '../../../authentication/user_logger/user_logger.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { RolesService } from '../../../../services/roles.service';
import { LoginService } from 'src/app/pages/authentication/login/login.service';
import { CompaniesService } from '../../../../services/companies.service';

@Component({
  selector: 'fury-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  static id = 100;

  titlePanel: string = '';

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  branchOfficesJSONData: {};
  rolesJSONData: {};
  defaults: any;
  userLogger: any;
  functionOrigin: any;
  componentOrigin: any;
  isChangePass: Boolean = false;
  active_pass: Boolean = false;

  inputType = {
    password: {type: 'password', visible: false}, 
    confirm_password: {type: 'password', visible: false} 
  }

  removable = true;
  selectable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  companiesUser: any[] = [];
  allCompanies: any[] = [];
  companiesCtrl = new FormControl();
  filteredCompanies: Observable<any[]>;
  @ViewChild('companiesInput') companiesInput: ElementRef;

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
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private rolesService: RolesService,
    private layoutService: LayoutService,
    private loginService: LoginService,
    private companiesService: CompaniesService
  ) {
    this.filteredCompanies = this.companiesCtrl.valueChanges.pipe(
      startWith(''),
      map((term) => {
        if(term){
          let termLower = term.toString().toLowerCase()
          let result = this.allCompanies.filter(u => {
            let resFilter = u.nombre.toLowerCase().indexOf(termLower) != -1
            return resFilter;
          })
          return result;
        }else{
          return this.allCompanies;
        }
      }))
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.titlePanel = 'Actualizar usuario';
    } else {
      this.defaults = {} as any;
      this.titlePanel = 'Nuevo usuario';
    }
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.validateUser();
    this.getRoles();
    this.form = this.fb.group({
      email: [{value: this.defaults.email, disabled: this.mode == 'update'} || '', [Validators.required, Validators.email]],
      phone: this.defaults.phone || '',
      rol_id: this.defaults.rol_id || '',
      password: this.defaults.password || '',
      confirm_password: this.defaults.password || '',
      active_pass: false,
      prefixPhone: [{value: this.prefixPhone, disabled:true}],
    });
    
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

  validateUser(){
    if(this.userLogger.token == this.defaults.token){
      this.isChangePass = true;
    }else{
      this.isChangePass = false;
    }
  }

  getRoles(){
    this.rolesService.getRoles().subscribe(
      res => {
        
        let data = <any[]>res;
        if(data.length > 0){
          let roles = [1];
          if(this.userLogger.rol_id == '2' || this.userLogger.rol_id == '3'){
            roles = [2, 3];
          }
          console.log(data);
          let finalData = [];
          data.forEach(element => {
            console.log(roles, element)
            if(roles.includes(element.id)){
              finalData.push(element);
            }
          });
          this.rolesJSONData = finalData;
          console.log(this.rolesJSONData);
        }
      },
      error => {
        console.error(error);
        this.alerts.dangerMessage(error.message);
      }
    );
  }

  save() {
    if(this.form.valid){
      if (this.mode === 'create') {
        this.createUser();
      } else if (this.mode === 'update') {
        this.updateUser();
      }
    }else{
      this.alerts.warningMessage('Existen campos con errores')
    }
  }

  createUser() {
    const user = this.form.value;
    user.company_id = this.userLogger.company_id;
    delete user.active_pass;
    delete user.confirm_password;
    delete user.password;
    this.saveClient('0', user);
  }

  updateUser() {
    const user = this.form.value;
    let isUpdate = true;
    if(this.isChangePass){
      if(user.password){
        if(user.confirm_password != user.password){
          isUpdate = false;
          this.alerts.dangerMessage('La contraseña y su confirmación no coiciden');
        }
      }
    }
    if(isUpdate){
      if(!user.email){
        user.email = this.defaults.email;
      }
      this.saveClient(this.defaults.id, user);
    }
  }

  saveClient(id, data){
    let dataSave = {
      id: id,
      data: data,
      author_id: this.userLogger.token
    }
    console.log(dataSave);
    this.userService.save(dataSave).subscribe({
      next: res => {
        console.log(res)
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text']);
          this.functionOrigin(this.componentOrigin);
          this.closeWindow();
        }else{
          this.alerts.warningMessage(res['text']);
        }
      },
      error: error => {
        console.error(error.message);
        this.alerts.dangerMessage(error.message);
      }
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  closeWindow(){
    this.layoutService.setCssQuickpanel('div-company');
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
      // this.form.controls[email].setValue('')
    }else{
      let arrayEmail = email.split('@');
      if(arrayEmail[1].split('.').length > 4){
        result = false;
        this.isEmailErr = true;
        this.emailErr = 'El correo electronico es incorrecto';
        // this.form.controls[email].setValue('')
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
}

function mayus(e) {
  e.value = e.value.toUpperCase();
}
