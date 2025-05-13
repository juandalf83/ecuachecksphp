import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertService } from './../alerts/alerts.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'fury-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  userLogger: any;
  // optionsTab = [
  //   {title: 'Consultas ecuatorianas', css: 'tab-option-active', active: true},
  //   {title: 'Periodo de tiempo', css: 'tab-option', active: false},
  // ]
  optionsTab = [
    {title: 'Consultas ecuatorianas', css: 'tab-option-active', active: true},
  ]

  rules: any
  restartData = false
  titleRestart = 'Restaurar'

  constructor(
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private rulesService: RulesService
  ) {}

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.getRules();
  }

  getRules(){
    if(this.userLogger.rol_id == 1){
      this.getRulesAdmin();
    }else{
      this.getRulesCompany(this.userLogger.company_id);
    }
  }

  getRulesAdmin(){
    this.rulesService.getRules().subscribe({
      next: (res) => {
        if(res){
          this.rules = res
          console.log(this.rules);
          this.rules.forEach(rule => {
            let name = '';
            if(rule.name){
              name = ' - '+rule.name;
            }
            rule.name = rule.organisms_name + name;
          })
        }
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getRulesCompany(company_id){
    this.rulesService.getRulesCompany(company_id).subscribe({
      next: (res) => {
        if(res){
          this.rules = res
        }
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  selectTab(index){
    this.optionsTab.forEach((option, indexO) => {
      if(indexO == index){
        option.active = true;
        option.css = 'tab-option-active'
      }else{
        option.active = false;
        option.css = 'tab-option'
      }
    })
  }

  actionChecks(param){
    let actions = ['alert','review','clean','informative']
    actions.forEach(action => {
      if(param.field == action){
        param.row[action] = true
      }else{
        param.row[action] = false
      }
    })
  }

  save(){
    if(this.userLogger.rol_id == 1){
      this.saveAdmin()
    }else{
      this.saveCompany()
    }
  }

  saveAdmin(){
    let data = {data: this.createData(), author_id: this.userLogger.token};
    this.rulesService.saveAdmin(data).subscribe({
      next: res => {
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text'])
          this.getRules()
        }else{
          this.alerts.infoMessage(res['text'])
        }
      },
      error: error => {
        console.error(error);
      }
    }
    )
  }

  saveCompany(){
    let data = {data: this.createData(), author_id: this.userLogger.token};
    this.rulesService.saveCompany(data).subscribe({
      next: res => {
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text'])
          this.getRules()
        }else{
          this.alerts.infoMessage(res['text'])
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  createData(){
    let data = []
    this.rules.forEach(rule => {
      if(rule.items){
        rule.items.forEach(item => {
          let itemData = {
            id: item.id,
            consultations_items_id: item.consultations_items_id,
            alert: this.changeNumber(item.alert),
            review: this.changeNumber(item.review),
            clean: this.changeNumber(item.clean),
            informative: this.changeNumber(item.informative),
            company_id: this.userLogger.company_id,
          }
          data.push(itemData);
        })
      }
    })
    return data
  }

  changeNumber(value){
    let result = 0
    if(value){
      result = 1
    }
    return result
  }

  restart(){
    this.restartData = !this.restartData
    if(this.restartData){
      this.titleRestart = 'Resetear'
      let rulesAdmin = []
      this.rulesService.getRules().subscribe({
        next: (res) => {
          if(res){
            rulesAdmin = <[]> res;
            let itemsAdmin = {};
            rulesAdmin.forEach(ruleAdmin => {
              if(ruleAdmin['items']){
                ruleAdmin.items.forEach(item => {
                  itemsAdmin[item.consultations_items_id] = item
                })
              }
            })
            
            this.rules.forEach(rule => {
              if(rule['items']){
                rule.items.forEach(item => {
                  item.alert = itemsAdmin[item.consultations_items_id].alert
                  item.review = itemsAdmin[item.consultations_items_id].review
                  item.clean = itemsAdmin[item.consultations_items_id].clean
                  item.informative = itemsAdmin[item.consultations_items_id].informative
                })
              }
            })
          }
        },
        error: (err) => {
          console.error(err)
        }
      })
    }else{
      this.titleRestart = 'Restaurar'
      this.getRules();
    }
    
  }

}
