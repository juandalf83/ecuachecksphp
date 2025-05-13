import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';

import { UserLoggerService} from '../../authentication/user_logger/user_logger.service';
import { ConsultationsService } from 'src/app/services/consultations.service';
import { ContractsService } from 'src/app/services/contracts.service';
import { AlertService } from '../alerts/alerts.service';
import { QueryService } from '../../../services/query.service';
import { HelperService } from 'src/app/guards/helper.service';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'fury-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})

export class QueryComponent implements OnInit {

  userLogger: any;
  currentDate = ''
  
  dataEvaluated = {
    documentType: '',
    document: '',
    birthday: {
      day: 0,
      month: 0,
      year: 0,
    },
    author_id: 0,
    company_id: 0
  }

  optionsQuery = [];
  optionSelect = '';
  resultQuery: any = {};
  statusQuery: any = {};
  
  showQuery = false
  showCharge = false;
  showChargeDesktop = false;
  showChargeMobile = false;
  
  charge = 0;
  interval: any;
  generalInterval: any;
  
  querySeconds = 0;
  queryMinutes = 0;
  querySecondsShow = '';
  queryMinutesShow = '';
  countDataIni = 0;
  
  constructor(
    private userLoggerService: UserLoggerService,
    private consultationsService: ConsultationsService,
    private contractsService: ContractsService,
    private queryService: QueryService,
    private helperService: HelperService,
    private router: Router,
    private alerts: AlertService,
    private webSocketService : WebSocketService
  ) {}

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.currentDate = this.helperService.generateDate('', true);
    this.getConsultations();
    this.connectWebsocket();
  }

  getConsultations(){
    this.consultationsService.getConsultations().subscribe({
      next: res => {
        if(res['status'] == 1){
          this.optionsQuery = res['text'];
          this.optionsQuery.forEach(option => {
            option.css = 'btn-gray-stroke';
            let name_search = '';
            if(option.name){
              name_search = ' - '+option.name;
            }
            option.name = option.organisms_name + name_search;
            option.loading = true;
            option.disabled = true;
          })
        }
        console.log(this.optionsQuery);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  connectWebsocket(){
    console.log('aqui');
    this.webSocketService.connect().subscribe({
      next: res => {
        console.log(res);
        if(res){
          if(this.helperService.isJson(res)){
            let dataResult = JSON.parse(res);
            if(this.helperService.isObject(dataResult)){
              this.initStatusQuery(dataResult);
            }else{
              if(this.statusQuery != ''){
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
    this.statusQuery = '';
    if(dataResult){
      if(dataResult['data']){
        let status = {};
        dataResult['data'].forEach(item => {
          status[item.type] = item.status;
        })
        this.statusQuery = status;
      }
    }
  }
  
  generateDataQuery(dataResult){
    dataResult.forEach(item => {
      if(item){
        this.resultQuery[item.type] = item.data;
        this.statusQuery[item.type] = 'error';
        if(item.data){
          this.finishedQuery(item);
        }

        this.optionsQuery.forEach(option => {
          if(option.field == item.type){
            option.loading = false;
            if(this.statusQuery[option.field] == 'finished'){
              option.disabled = false;
            }
          }
        })
      }
    })
  }

  finishedQuery(item){
    this.statusQuery[item.type] = 'finished';
    this.showQuery = true;
    this.charge = 100;
    clearInterval(this.interval);
    this.countDataIni++;
    // if(this.countDataIni == 1){
      if(this.resultQuery){
        if(item.type != 'supa' && item.type != 'expel' && item.type != 'fis_gen_estado'){
          this.resultQuery.name = this.resultQuery[item.type][0].full_name;
          if(item.type == 'ant' || item.type == 'sri'){
            this.resultQuery.document = this.resultQuery[item.type][0].cedula;
          }
          if(item.type == 'senescyt' || item.type == 'min_educacion'){
            this.resultQuery.document = this.resultQuery[item.type][0].id_number;
          }
        }
      }
    // }

    if(this.resultQuery.name){
      this.dataExpel()
    }
  }

  finishedAllQueries(res){
    if(res == 'finished'){
      this.consumeCredits();
      
    }
  }

  search(){
    if(this.dataEvaluated.document){
      this.validCredits();
    }else{
      this.alerts.warningMessage('El campo documento no puede ser vacio');
    }
  }

  initClockGeneral(){
    this.generalInterval = setInterval(() => {
      this.querySeconds++;
      
      if(this.querySeconds == 60){
        this.queryMinutes++;
        this.querySeconds = 0;
      }

      this.querySecondsShow = this.timeWithZero(this.querySeconds);
      this.queryMinutesShow = this.timeWithZero(this.queryMinutes);
    }, 1000)
  }

  initClockCharge(){
    let count = 0;
    this.charge = 0;
    this.interval = setInterval(() => {
      count += 1000;
      this.charge = parseInt(((count * 100)/60000).toFixed(2));
      if(this.charge == 100){
        this.clearSearch();
        this.alerts.warningMessage('Error al realizar la consulta');
      }
    }, 1000)
  }

  runQuery(){
    let targets = [];
    this.optionsQuery.forEach(option => {
      if(!targets.includes(option.field)){
        targets.push(option.field);
    	}
    })
    console.log(targets);
    let message = {
      action: 'run_follow',
      params: {
          search_id: this.dataEvaluated.document,
          targets: targets
      }
    }
    this.webSocketService.sendMessage(JSON.stringify(message));
  }

  downloadPDF(){
    this.router.navigateByUrl('company/query_results');
  }

  back(){
    this.clearSearch();
    this.showCharge = false
    
  }

  selectOption(optionSelect){
    let indexSelect = this.optionsQuery.indexOf(optionSelect)
    optionSelect.css = 'btn-blue'
    this.optionSelect = optionSelect
    this.optionsQuery.forEach((option, index) => {
      if(index != indexSelect){
        option.css = 'btn-gray-stroke'
      }
    })
  }

  timeWithZero(value){
    let result = value.toString();
    if(value < 10){
      result = '0'+value;
    }
    return result;
  }

  dataExpel(){
    let expelDemanding = [];
    let expelDefendant = [];
    if(this.resultQuery['expel']){
      this.resultQuery['expel'].forEach(item => {
        item.movements.forEach(movement => {
          movement.incidents.forEach(incident => {
            if(incident.actors.includes(this.resultQuery.name)){
              console.log('process actor')
              if(!expelDemanding.includes(item)){
                expelDemanding.push(item);
              }
            }
            if(incident.defendants.includes(this.resultQuery.name)){
              console.log('process defendant')
              if(!expelDefendant.includes(item)){
                expelDefendant.push(item);
              }
            }
          })
        })
      })
      delete this.resultQuery['expel'];
      this.resultQuery['expel_demanding'] = expelDemanding
      this.resultQuery['expel_defendant'] = expelDefendant
    }
  }

  validCredits(){
    this.contractsService.getCreditsContracts(this.userLogger.company_id).subscribe({
      next: res => {
        console.log(res);
        if(res['status'] == 1){
          let contract = res['text'];
          if(contract.credits_available > 0 || contract.additional_available > 0){
            this.showCharge = true;
            this.initClockGeneral();
            this.initClockCharge();
            this.runQuery();
          }else{
            this.alerts.warningMessage('No cuenta con creditos suficientes para su solicitud');
          }
        }else{
          this.alerts.warningMessage('No cuenta con creditos suficientes para su solicitud');
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  consumeCredits(){
    let data = {
      author_id: this.userLogger.token,
      company_id: this.userLogger.company_id
    }
    this.contractsService.consumeCredits(data).subscribe({
      next: res => {
        console.log('fin', res);
        if(res['status'] == 1){
          this.queryService.setDataResult(this.resultQuery);
          this.queryService.setStatusResult(this.statusQuery);
          clearInterval(this.generalInterval);
          this.showQuery = true;
          console.log(this.statusQuery, this.resultQuery);
          this.alerts.infoMessage('Consulta finalizada con exito');
        }else{
          this.alerts.dangerMessage(res['text']);
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  clearSearch(){
    clearInterval(this.interval);
    clearInterval(this.generalInterval);
    this.showQuery = false
    this.optionsQuery = [];
    this.resultQuery = [];
    this.statusQuery = [];
    this.queryService.setDataResult([]);
    this.queryService.setStatusResult([]);
  }
}

