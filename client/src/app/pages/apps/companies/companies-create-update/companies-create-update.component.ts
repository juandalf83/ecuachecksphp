import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../../../services/companies.service';
import { AlertService } from '../../alerts/alerts.service';
import { UserLoggerService } from '../../../authentication/user_logger/user_logger.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { RolesService } from '../../../../services/roles.service';

@Component({
  selector: 'fury-companies-create-update',
  templateUrl: './companies-create-update.component.html',
  styleUrls: ['./companies-create-update.component.scss']
})
export class CompaniesCreateUpdateComponent implements OnInit {

  static id = 100;

  titlePanel: string = '';

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  citiesJSONData: {};
  defaults: any;
  userLogger: any;
  functionOrigin: any;
  componentOrigin: any;

  constructor(private fb: FormBuilder,
              private companiesSevice: CompaniesService,
              private alerts: AlertService,
              private userLoggerService: UserLoggerService,
              private rolesService: RolesService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    if (this.defaults) {
      this.mode = 'update';
      this.titlePanel = 'Actualizar empresa';
    } else {
      this.defaults = {} as any;
      this.titlePanel = 'Nuevo empresa';
    }

    // this.getCities();
    let isEstudio = false;
    if(this.defaults.con_estudio == '1'){
      isEstudio = true;
    }
    let isPoligrafo = false;
    if(this.defaults.con_poligrafo == '1'){
      isPoligrafo = true;
    }

    let isSubEmpresas = false;
    if(this.defaults.subempresa == '1'){
      isSubEmpresas = true;
    }

    let tiene_facturas_pendientes = false;
    if(this.defaults.facturas_pendientes > 0){
      tiene_facturas_pendientes = true;
    }
    
    this.form = this.fb.group({
      nombre_empresa: [this.defaults.nombre || '', Validators.required],
      ruc: [this.defaults.ruc || '', Validators.required],
      nombres_usuario: [''],
      apellidos_usuario: [''],
      email: [''],
      cedula: [''],
      estudio: [isEstudio],
      poligrafo: [isPoligrafo],
      costo_estudio: [this.defaults.precio_estudio || 0],
      costo_poligrafo: [this.defaults.precio_poligrafo || 0],
      tiene_facturas_pendientes: [tiene_facturas_pendientes],
      facturas_pendientes: [this.defaults.facturas_pendientes || 0],
      subempresa: [isSubEmpresas],
    });
  }

  // getCities(){
  //   this.simplesTablesService.getSimplesTables('ciudades').subscribe(
  //     res => {
  //       this.citiesJSONData = res;
  //     },
  //     error => {
  //       console.error(error);
  //       this.alerts.dangerMessage(error.message);
  //     }
  //   );
  // }

  save() {
    if(this.form.valid){
      if (this.mode === 'create') {
        this.createUser();
      } else if (this.mode === 'update') {
        this.updateUser();
      }
    }else{
      this.alerts.warningMessage('existen campos obligatorios vacios')
    }
  }

  createUser() {
    const data = this.form.value;
    data.usuario = this.userLogger.api_token;
    // this.companiesSevice.save('0', data).subscribe(
    //   res => {
    //     if(res['status'] == 1){
    //       this.alerts.infoMessage(res['text']);
    //       this.functionOrigin(this.componentOrigin);
    //       this.closeWindow();
    //     }else{
    //       if(res['status'] == 2){
    //         this.alerts.warningMessage(res['text']);
    //       }
    //     }
    //   },
    //   error => {
    //     console.error(error);
    //     this.alerts.dangerMessage(error.message);
    //   }
    // );
  }

  updateUser() {
    const data = this.form.value;
    data.usuario = this.userLogger.api_token;
    // this.companiesSevice.save(this.defaults.id, data).subscribe(
    //   res => {
    //     if(res['status'] == 1){
    //       this.alerts.infoMessage(res['text']);
    //       this.functionOrigin(this.componentOrigin);
    //       this.closeWindow();
    //     }else{
    //       if(res['status'] == 2){
    //         this.alerts.warningMessage(res['text']);
    //       }
    //     }
    //   },
    //   error => {
    //     console.error(error.message);
    //     this.alerts.dangerMessage(error.message);
    //   }
    // );
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

  validChart(event) {
    let key = (document.all) ? event.keyCode : event.which;
    //let key de retroceso para borrar, siempre la permite
    if (key == 8) {
        return true;
    }

    if (key == 32) {
      return true;
    }

    // Patrón de entrada, en este caso solo acepta numeros y letras
    let patter = /[A-Za-z0-9]/;
    let key_end = String.fromCharCode(key);
    return patter.test(key_end);  
  }
  
  changeInvoicePending(){
    let checkInvoice = this.form.value.tiene_facturas_pendientes;
    if(!checkInvoice){
      this.form.value.facturas_pendientes = 0;
    }
  }
}
