import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

import { QueryService } from 'src/app/services/query.service';
import { HelperService } from 'src/app/guards/helper.service';
import { FilterResultModalComponent } from './filter-result-modal/filter-result-modal.component';
import { JudicialProcessesModalComponent } from './judicial-processes-modal/judicial-processes-modal.component';
import { ConsultationsService } from 'src/app/services/consultations.service';
import { RulesService } from 'src/app/services/rules.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { AlertService } from '../alerts/alerts.service';
import { urlpath } from 'src/app/guards/appSettings';

@Component({
  selector: 'fury-query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss']
})

export class QueryResultsComponent implements OnInit {

  user: any;
  register: any;
  statusQuery: any;
  rules: any;
  targets = [];
  showSearch = false;
  filters = [
    {id: 1, name: 'Bases de datos ecuatorianas'},
    {id: 2, name: 'Bases de datos internacionales'},
  ]

  consultations = [];
  controlOrganisms = [];
  
  typesAlertsMessage = [
    {type: 'Alerta', color: '#ff0000', backgroud: '#ff00001f'}, 
    {type: 'Revisar', color: '#FF8000', backgroud: '#FF80001f'}, 
    {type: 'Limpio', color: '#00ff00', backgroud: '#00ff001f'},
    {type: 'Informativo', color: '#04B486', backgroud: '#04B4861f'}, 
  ]

  headerTableControlOrganisms = [
    {title: 'Organismo de control', field: 'organims', type: 'text', width: '25%'},
    {title: 'Consulta realizada', field: 'consultation', type: 'text', width: '25%'},
    {title: 'Nota', field: 'note', type: 'text_action', icon: 'assets/img/icons/actualizar.svg', width: '25%'},
    {title: 'Mensaje', field: 'message', type: 'alert', types_alerts: this.typesAlertsMessage, width: '13%'},
    {title: 'Evidencia', field: 'action', type: 'button', text_button: 'Ver', width: '12%'},
  ]

  headerTableCriminalRecords = [
    {title: 'Nombre', field: 'name', type: 'text', width: '30%'},
    {title: 'Tipo de documento', field: 'id_number', type: 'text', width: '20%'},
    {title: 'Número de documento', field: 'doc_type', type: 'text', width: '20%'},
    {title: 'Posee antecedentes', field: 'background', type: 'text', width: '20%'},
    {title: '', field: 'action', type: 'button', text_button: 'Ver', width: '10%'},
  ]

  headerTableExitImpediment = [
    {title: 'Apellidos y nombres', field: 'name', type: 'text', width: '33%'},
    {title: 'Nacionalidad', field: 'nacionalidad', type: 'text', width: '34%'},
    {title: 'Tiene impedimento', field: 'background', type: 'text', width: '33%'},
    
  ]

  headerParticipants = [
    {title: 'Obligado principal', field: 'legal_representative'},
    {title: 'Representante legal', field: 'primary_obligator'}
  ]

  headerTableSUPA = [
    {title: 'Código de tarjeta', field: 'card_code', type: 'text', width: '10%'},
    {title: 'No. Proceso Judicial', field: 'judicial_process', type: 'text', width: '10%'},
    {title: 'Dependencia Jurisdiccional', field: 'jurisdictional_depency', type: 'text', width: '25%'},
    {title: 'Tipo de pensión', field: 'type_alimony', type: 'text', width: '15%'},
    {title: 'Intervinientes', field: 'participants', type: 'array', headerArray: this.headerParticipants, width: '35%'},
    {title: 'Detalle', field: 'action', type: 'button', text_button: 'Ver', width: '5%'},
  ]

  headerTableSri = [
    {title: 'RUC / Cédula', field: 'cedula', type: 'text', width: '50%'},
    {title: 'Razón Social / Apellidos y nombres', field: 'full_name', type: 'text', width: '50%'},
  ]

  headerTableSriPendingObligations = [
    {title: 'Deudas firmes', field: 'firm_debts', type: 'text', width: '33%'},
    {title: 'Deudas impugnadas', field: 'disputed_debts', type: 'text', width: '34%'},
    {title: 'Facilidades de pago', field: 'payment_facilities', type: 'text', width: '33%'},
  ]

  headerTableMinistryEducation = [
    {title: 'No.', field: 'no', type: 'text', width: '4%'},
    {title: 'No. de identifi', field: 'id_number', type: 'text', width: '10%'},
    {title: 'Nombre de titulado', field: 'full_name', type: 'text', width: '20%'},
    {title: 'Institución Educativa', field: 'college', type: 'text', width: '20%'},
    {title: 'Título', field: 'degree', type: 'text', width: '20%'},
    {title: 'Especialidad', field: 'speciality', type: 'text', width: '18%'},
    {title: 'Fecha Grado', field: 'graduation_date', type: 'text', width: '8%'},
  ]

  headerTableSenescyt = [
    {title: 'Título', field: 'title', type: 'text', width: '25%'},
    {title: 'Institución de Educación Superior', field: 'college', type: 'text', width: '25%'},
    {title: 'Tipo', field: 'type', type: 'text', width: '10%'},
    {title: 'Reconocido por', field: 'recognized', type: 'text', width: '15%'},
    {title: 'No. Registro', field: 'register_num', type: 'text', width: '15%'},
    {title: 'Fecha de registro', field: 'register_date', type: 'text', width: '10%'},
  ]

  headerTableANT = [
    {title: 'Cédula', field: 'cedula', type: 'text', width: '50%'},
    {title: 'Nombres', field: 'full_name', type: 'text', width: '50%'},
  ]
  
  headerTableANTLicenses = [
    {title: 'Tipo', field: 'license_type', type: 'text', width: '20%'},
    {title: 'Fecha emisión', field: 'expedition_date', type: 'text', width: '20%'},
    {title: 'Fecha expiración', field: 'expiration_date', type: 'text', width: '20%'},
    {title: 'Puntos', field: 'points', type: 'text', width: '20%'},
    {title: 'Total', field: 'total', type: 'text', width: '20%'},
  ]

  headerTableJudicialProcesses = [
    {title: 'Fecha de ingreso', field: 'entry_date', type: 'text', width: '31%'},
    {title: 'No. Proceso', field: 'no_process', type: 'text', width: '32%'},
    {title: 'Número de documento', field: 'crime_issue', type: 'text', width: '32%'},
    {title: 'Detalle', field: 'action', type: 'button', text_button: 'Ver', width: '5%'},
  ]

  headerJudicialProcesses = [
    {title: 'No.', field: '', type: 'auto_increment', width: '5%'},
    {title: 'Fecha', field: 'entry_date', type: 'text', width: '10%'},
    {title: 'Actores/ Ofendidos', field: 'actors', type: 'array', width: '35%'},
    {title: 'Demandados/ Procesados', field: 'defendants', type: 'array', width: '35%'},
    {title: 'Actuaciones Judiciales', field: 'action', type: 'button', icon_button: 'assets/img/icons/documento.svg', width: '15%'},
  ]

  headerTableAttorneyGeneral = [
    {title: 'Noticia del delito', field: 'no_process', type: 'text', width: '15%'},
    {title: 'Lugar y fecha', field: 'place_date', type: 'text', width: '15%'},
    {title: 'Delito', field: 'crime', type: 'text', width: '35%'},
    {title: 'Especialidad', field: 'unit', type: 'text', width: '35%'},
  ]
  
  constructor(
    private dialog: MatDialog,
    private helperService: HelperService,
    private queryService: QueryService,
    private consultationsService: ConsultationsService,
    private rulesService: RulesService,
    private userLoggerService: UserLoggerService,
    private webSocketService : WebSocketService,
    private alerts: AlertService,
    private chd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.userLoggerService.getUserLoggedIn();
    this.register = this.queryService.getDataResult();
    // this.register = this.dataMockup();
    this.statusQuery = this.queryService.getStatusResult();
    // this.statusQuery['min_educacion'] = 'error';
    console.log(this.register);
    if(this.statusQuery['supa'] == 'finished'){
      this.register['supa'].forEach(supa => {
        supa.participants = [
          {
            legal_representative: supa.legal_representative, 
            primary_obligator: supa.primary_obligator
          }
        ]
      })
    }
    if(this.statusQuery['fis_gen_estado'] == 'finished'){
      this.register['fis_gen_estado'].forEach(item => {
        item.place_date = item.place +'-'+ item.date;
        item.people.forEach(people => {
          if(people.id_number == this.register.document){
            item.person = people
          }
        })
      })
    }
    this.getCompanyRules();
  }

  getCompanyRules(){
    this.rulesService.getRulesCompany(this.user.company_id ).subscribe({
      next: res => {
        if(res){
          if(!res['status']){
            let dataRules = <[]>res;
            this.rules = {};
            dataRules.forEach(rule => {
              this.rules[rule['field']] = rule['items'];
            });
            this.getConsultations();
          }
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getConsultations(){
    this.consultationsService.getConsultations().subscribe({
      next: res => {
        if(res['status'] == 1){
          this.consultations = res['text'];
          this.generateControlOrganisms(this.consultations);
          this.connectWebsocket();
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  generateControlOrganisms(consultations){
    this.controlOrganisms = [];
    consultations.forEach(option => {
      let note = '';
      let message = this.validRules(option);
      // let message = 'Limpio';
      let statusOption = '';

      if(this.statusQuery[option.field]){
        statusOption = this.statusQuery[option.field];
        if(this.statusQuery[option.field] == 'error'){
          note = 'Presentó intermitencias';
          message = '';
        }
      }else{
        note = 'Presentó intermitencias';
        message = '';
        statusOption = 'error';
      }

      let name_search = '';
      if(option.name){
        name_search = ' - '+option.name;
      }

      let name = option.organisms_name + name_search;

      let itemControlOrganisms = {
        organims: option.organisms_name, 
        consultation: option.name, 
        field: option.field, 
        note: note, 
        message: message, 
        action: 'Ver',
        status: statusOption,
        name: name,
        section: option.section
      };
      this.controlOrganisms.push(itemControlOrganisms);
    })
    console.log(this.controlOrganisms);
  }

  validRules(option){
    let statusMessage = {alert: 'Alerta', review	:'Revisar', clean:'Limpio', informative:'Informativo'};
    let message = 'Limpio';
    if(option.field === 'supa' && this.rules[option.field] && this.register[option.field]){
      this.rules[option.field].forEach(rule => {
        if(rule.consultations_items_id ==  18 && this.register[option.field].length > 0){
          message = this.addRule(statusMessage, rule);
        }
        if(rule.consultations_items_id ==  19){
          // let countPaids = 0;
          this.register[option.field].forEach(item => {
            if(parseInt(item.n_pending_alimony) > 1){
              // countPaids++;
              message = this.addRule(statusMessage, rule);
            }
          })
          // if(countPaids >= 2){
          // }
        }
      })
    }

    if(option.field === 'senescyt' && this.rules[option.field] && this.register[option.field]){
      this.rules[option.field].forEach(rule => {
        if(rule.consultations_items_id ==  26 && this.register[option.field].length == 0){
          message = this.addRule(statusMessage, rule);
        }
      })
    }

    if(option.field === 'min_educacion' && this.rules[option.field] && this.register[option.field]){
      this.rules[option.field].forEach(rule => {
        if(rule.consultations_items_id ==  25 && this.register[option.field].length == 0){
          message = this.addRule(statusMessage, rule);
        }
      })
    }

    if(option.field === 'ant' && this.rules[option.field] && this.register[option.field]){
      this.rules[option.field].forEach(rule => {
        let countPoints5 = 0
        let countPoints10 = 0
        let countPoints15 = 0
        let countPoints20 = 0
        let expiration_date = new Date(this.register[option.field][0].expiration_date);
        this.register[option.field].forEach(item => {
          if(item.points <= 5){
            countPoints5++;
          }
          if(item.points > 5 && item.points <= 10){
            countPoints10++;
          }
          if(item.points > 10 && item.points <= 15){
            countPoints15++;
          }
          if(item.points > 15 && item.points <= 20){
            countPoints20++;
          }
          if(expiration_date <= new Date(item.expiration_date)){
            expiration_date = new Date(item.expiration_date);
          }
        })

        if( rule.consultations_items_id == 20 && countPoints5 > 0){
          message = this.addRule(statusMessage, rule);
        }
        if( rule.consultations_items_id == 21 && countPoints10 > 0){
          message = this.addRule(statusMessage, rule);
        }
        if( rule.consultations_items_id == 22 && countPoints15 > 0){
          message = this.addRule(statusMessage, rule);
        }
        if( rule.consultations_items_id == 23 && countPoints20 > 0){
          message = this.addRule(statusMessage, rule);
        }

        if( rule.consultations_items_id == 24){
          let currentDate = new Date();
          let date90 = new Date();
          date90.setDate(currentDate.getDate() + 90); 
          if(expiration_date >= currentDate && expiration_date <= date90){
            message = this.addRule(statusMessage, rule);
          }
        }
      })
    }
    return message;
  }

  addRule(statusMessage, rule){
    let message = '';
    if(rule.alert){
      message = statusMessage.alert;
    }
    if(rule.review){
      message = statusMessage.review;
    }
    if(rule.clean){
      message = statusMessage.clean;
    }
    if(rule.informative){
      message = statusMessage.informative;
    }

    return message;
  }

  connectWebsocket(){
    this.webSocketService.connect().subscribe({
      next: res => {
        if(res){
          console.log('socket 1');
          if(this.helperService.isJson(res)){
            let dataResult = JSON.parse(res);
            if(this.helperService.isObject(dataResult)){
              console.log('socket 2');
              this.initStatusQuery(dataResult);
            }else{
              if(this.statusQuery != ''){
                console.log('socket 3');
                this.generateDataQuery(dataResult);
              }
            }
          }else{
            this.finishedAllQueries(res);
          }
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  initStatusQuery(dataResult){
    if(dataResult){
      this.targets.forEach(target => {
        this.controlOrganisms.forEach(option => {
          if(option.field == target){
            option.status = 'running';
          }
        })
      })
    }
  }
  
  generateDataQuery(dataResult){
    dataResult.forEach(item => {
      if(item){
        this.register[item.type] = item.data;
        this.targets.forEach(target => {
          this.controlOrganisms.forEach(option => {
            if(option.field == target){
              option.status = 'error';
              if(this.register[option.field]){
                option.status = 'finished';
                option.note = '';
                option.message = this.validRules(option);
              }
            }
          })
        })
        console.log('socke 4');
      }
    })
  }

  finishedAllQueries(res){
    if(res == 'finished'){
      this.queryService.setDataResult(this.register);
      console.log(this.register);
      console.log(this.controlOrganisms);
      console.log('socket end');
      this.showSearch = false;
      this.alerts.infoMessage('Consulta finalizada con exito');
    }
  }
  
  selectFilters(){
    this.dialog.open(FilterResultModalComponent, {
      width: '700px',
      data: this.filters
    }).afterClosed().subscribe((factor) => {});
  }

  removeChip(item): void {
    const index = this.filters.indexOf(item);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  actionTableOrganisms(param){
    console.log(param);
  }

  textActionTableOrganisms(param){
    this.targets = [param.item.field]
    console.log(this.targets);
    let message = {
      action: 'run_follow',
      params: {
          search_id: this.register.document,
          targets: this.targets
      }
    }
    this.webSocketService.sendMessage(JSON.stringify(message));
  }
  
  validDebts(item){
    let firm_debts = parseFloat(item.firm_debts)
    let disputed_debts = parseFloat(item.disputed_debts)
    let payment_facilities = parseFloat(item.payment_facilities)

    let result = true
    if(firm_debts <= 0 && disputed_debts <= 0 && payment_facilities <= 0){
      result = false
    }
    return result
  }

  actionTableJudicial(param){
    this.dialog.open(JudicialProcessesModalComponent, {
      width: '800px',
      data: param
    }).afterClosed().subscribe((factor) => {});
  }

  downloadPDF(){
    let data = {
      register: this.register,
      control_organisms: this.controlOrganisms
    }
    this.queryService.queryReport(data).subscribe({
      next: res => {
        window.open(urlpath.path_report+res);
      }
    })
  }

  searchAll(){
    this.showSearch = true;
    let targets = [];
    this.controlOrganisms.forEach(item => {
      if(item.status == 'error'){
        targets.push(item.field);
      }
    })
    console.log(targets);
    let message = {
      action: 'run_follow',
      params: {
          search_id: this.register.document,
          targets: targets
      }
    }
    this.webSocketService.sendMessage(JSON.stringify(message));
  }

  showMinInterior(param){
    console.log(param);
    window.open(param.item.certificate, '_blank');
  }

  dataMockup(){
    let data = {
      name: "TOLEDO CARRION BYRON XAVIER",
      document: "1709026718",
      ant: [
          {
              _id: "655fa7f1f8bd10ca1328f4bb",
              _tid: "655fa7eef8bd10ca1328f4b8",
              cedula: "1709026718",
              expedition_date: "2023-10-25 00:00:00",
              expiration_date: "2028-10-23 00:00:00",
              full_name: "TOLEDO CARRION BYRON XAVIER",
              license_type: "E",
              points: 29.5,
              total: 0
          }
      ],
      senescyt: [
          {
              _id: "655fa801f8bd10ca1328f4bc",
              _tid: "655fa7eef8bd10ca1328f4ba",
              degress: [
                  {
                      area: "EDUCACION",
                      college: "UNIVERSIDAD TECNOLOGICA INDOAMERICA",
                      note: "",
                      recognized: "",
                      register_date: "2011-09-20",
                      register_num: "1045-11-735632",
                      title: "MAGISTER EN DOCENCIA UNIVERSITARIA Y ADMINISTRACION EDUCATIVA",
                      type: "Nacional"
                  },
                  {
                      area: "EDUCACION",
                      college: "UNIVERSIDAD CENTRAL DEL ECUADOR",
                      note: "",
                      recognized: "",
                      register_date: "2004-09-30",
                      register_num: "1005-04-535016",
                      title: "LICENCIADO EN CIENCIAS DE LA EDUCACION MENCION: MECANICA AUTOMOTRIZ",
                      type: "Nacional"
                  },
                  {
                      area: "CIENCIAS",
                      college: "INSTITUTO TECNOLÓGICO SUPERIOR ECUATORIANO DE INFORMÁTICA",
                      note: "",
                      recognized: "",
                      register_date: "2003-03-28",
                      register_num: "2147-03-25136",
                      title: "TECNICO SUPERIOR EN PROCESAMIENTO ELECTRONICO DE DATOS: PROGRAMADOR",
                      type: "Nacional"
                  }
              ],
              full_name: "TOLEDO CARRION BYRON XAVIER",
              gender: "MASCULINO ",
              id_number: "1709026718",
              nacionality: "ECUADOR"
          }
      ],
      min_educacion: null,
      sri: [
          {
              _id: "655fa81ff8bd10ca1328f4bf",
              _tid: "655fa7eef8bd10ca1328f4b9",
              cedula: "1709026718",
              disputed_debts: "0",
              firm_debts: "0",
              full_name: "TOLEDO CARRION BYRON XAVIER",
              message: "El ciudadano / contribuyente no registra deudas firmes, impugnadas o en facilidades de pago.",
              payment_facilities: "0"
          }
      ],
      supa: [
          {
              _id: "655fa87ff8bd10ca1328f4c1",
              _tid: "655fa7eef8bd10ca1328f4b6",
              card_code: "1701-32925",
              current_payment: "$110.63",
              judicial_process: "0419-2011",
              jurisdictional_depency: "Unidad Judicial Cuarta de la Familia, Mujer, Niñez y Adolescencia, con Sede en la parroquia Iñaquito del Distrito Metropolitano de Quito, provincia de Pichincha",
              legal_representative: "ROJAS CALUPIÑA ELIZABETH DEL PILAR",
              n_other_debts: "0",
              n_pending_alimony: "1",
              primary_obligator: "TOLEDO CARRION BYRON XAVIER",
              province: "PICHINCHA / QUITO",
              subtotal_alimony_interest: "$0.39",
              subtotal_alimony_payments: "$110.63",
              total: "$111.02",
              total_alimony_payint: "$111.02",
              total_other_debts: "$0.00",
              type_alimony: "Pensión alimenticia"
          },
          {
              _id: "655fa87af8bd10ca1328f4c0",
              _tid: "655fa7eef8bd10ca1328f4b6",
              card_code: "1701-7662",
              current_payment: "$97.32",
              judicial_process: "1171",
              jurisdictional_depency: "Unidad Judicial Cuarta de la Familia, Mujer, Niñez y Adolescencia, con Sede en la parroquia Iñaquito del Distrito Metropolitano de Quito, provincia de Pichincha",
              legal_representative: "ROJAS CALUPIÑA ELIZABETH DEL PILAR",
              n_other_debts: "0",
              n_pending_alimony: "1",
              primary_obligator: "TOLEDO CARRION BYRON XAVIER",
              province: "PICHINCHA / QUITO",
              subtotal_alimony_interest: "$0.34",
              subtotal_alimony_payments: "$97.32",
              total: "$97.66",
              total_alimony_payint: "$97.66",
              total_other_debts: "$0.00",
              type_alimony: "Pensión alimenticia"
          }
      ]
    }
    return data;
  }
}
