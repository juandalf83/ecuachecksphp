import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fury-results-query',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() option: any = '';
  @Input() resultOption: any = [];
  
  constructor() { }

  ngOnInit() {
    if(this.resultOption['ant']){
      this.resultOption['ant'].forEach(item => {
        let expedition_date = item.expedition_date.split(' ');
        item.expedition_date = expedition_date[0];

        let expiration_date = item.expiration_date.split(' ');
        item.expiration_date = expiration_date[0];
      })
    }
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
}
