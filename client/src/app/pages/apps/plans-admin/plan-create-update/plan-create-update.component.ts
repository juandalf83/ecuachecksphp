import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { AlertService } from '../../alerts/alerts.service';
import { UserLoggerService } from '../../../authentication/user_logger/user_logger.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'fury-Plan-create-update',
  templateUrl: './Plan-create-update.component.html',
  styleUrls: ['./Plan-create-update.component.scss']
})
export class PlanCreateUpdateComponent implements OnInit {

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
    private plansService: PlansService,
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private layoutService: LayoutService,
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
      this.titlePanel = 'Actualizar plan';
    } else {
      this.defaults = {} as any;
      this.titlePanel = 'Nuevo plan';
    }
    console.log(this.defaults)
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.form = this.fb.group({
      name: this.defaults.name || '',
      credits: this.defaults.credits || 0,
      month_value: this.defaults.month_value || 0,
      year_value: this.defaults.year_value || 0,
      additional: this.defaults.additional || 0,
      additional_value: this.defaults.additional_value || 0
    });
    
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
    this.saveClient('0', user);
  }

  updateUser() {
    const user = this.form.value;
    this.saveClient(this.defaults.id, user);
  }

  saveClient(id, data){
    let dataSave = {
      id: id,
      data: data,
      author_id: this.userLogger.token
    }
    console.log(dataSave);
    this.plansService.save(dataSave).subscribe({
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

  onlyNumbers(event){
    return (event.charCode >= 48 && event.charCode < 58) || event.charCode == 46
  }
}