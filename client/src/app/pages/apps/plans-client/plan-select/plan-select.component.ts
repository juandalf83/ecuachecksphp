import { Component, OnInit, Input } from '@angular/core';
import { Options, ChangeContext } from 'ngx-slider-v2'

import { UserLoggerService } from '../../../authentication/user_logger/user_logger.service';
import { ContractsService } from 'src/app/services/contracts.service';
import { AlertService } from '../../alerts/alerts.service';

@Component({
  selector: 'fury-plan-select',
  templateUrl: './plan-select.component.html',
  styleUrls: ['./plan-select.component.scss']
})
export class PlanSelectComponent implements OnInit {

  @Input() plans: any = [];
  @Input() type: string = '';

  userLogger: any;
  value: number = 10;
  credits = 0;
  additional = 0;
  pay_value = 0;
  titleChecks = ''
  selectedPlan: any
  options: Options = {
    showTicksValues: true,
    showSelectionBar: true,
    stepsArray: []
  };
  
  constructor(
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private contractsService: ContractsService
  ) { }

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.selectedPlan = []
    this.options.stepsArray = []
    this.plans.forEach(plan => {
      this.options.stepsArray.push({value: plan.credits})
    })
    this.selectPlan(this.plans[0]); 
  }

  onPlanChange(changeContext: ChangeContext){
    this.plans.forEach(plan => {
      if(plan.credits == changeContext.value){
        this.selectPlan(plan)
      }
    })
  }

  selectPlan(plan){
    this.selectedPlan = plan
    this.credits = this.selectedPlan.credits
    this.additional = this.selectedPlan.additional
    this.pay_value = this.selectedPlan.month_value
    this.titleChecks = 'mes'
    if(this.type == 'A'){
      this.credits = this.selectedPlan.credits * 12
      this.additional = this.selectedPlan.additional * 12
      this.pay_value = this.selectedPlan.year_value
      this.titleChecks = 'año'
    }
  }

  applyNow(){
    
    let data = {
      company_id: this.userLogger.company_id,
      plan_id: this.selectedPlan.id,
      credits: this.credits,
      additional: this.additional,
      pay_value: this.pay_value,
      type: this.type,
      author_id: this.userLogger.token
    }
    console.log(this.type, data)

    this.contractsService.createContractCompany(data).subscribe(
      res => {
        this.value = 10
        this.selectedPlan = []
        this.selectPlan(this.plans[0])
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text']);
        }else{
          this.alerts.warningMessage(res['text']);  
        }
      },
      error => {
        console.error(error)
      }
    )
  }
}
