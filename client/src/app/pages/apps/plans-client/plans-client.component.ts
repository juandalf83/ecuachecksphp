import { Component, OnInit } from '@angular/core';

import { AlertService } from './../alerts/alerts.service';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'fury-plans-client',
  templateUrl: './plans-client.component.html',
  styleUrls: ['./plans-client.component.scss']
})
export class PlansClientComponent implements OnInit {

  plans: any = []
  showPlans: Boolean = false

  constructor(
    private alerts: AlertService,
    private plansService: PlansService,
  ) {}
  
  ngOnInit() {
    this.getPlans()
  }

  getPlans(){
    this.plansService.searchObjects().subscribe(
      res => {
        if(res['status'] == 1){
          this.plans = res['text']
          this.showPlans = true
          console.log(this.plans)
        }else{
          this.alerts.warningMessage(res['text']);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  

}
