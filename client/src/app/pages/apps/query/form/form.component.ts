import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fury-form-query',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() dataEvaluated: any = {
    documentType: '',
    document: '',
    name: '',
    lastname: '',
    birthday: {
      day: 0,
      month: 0,
      year: 0,
    },
  };
  
  @Output() search = new EventEmitter();
  authorize = false
  
  constructor(
  ) { }

  ngOnInit() {
    this.dataEvaluated.documentType = 'Cédula';
  }

  validateOnlyNumbers(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  validValue(value, type){
    if(type == 'day' && (value <= 0 || value > 12)){
      this.dataEvaluated.birthday.day = 0
    }
    if(type == 'month' && (value <= 0 || value > 12)){
      this.dataEvaluated.birthday.month = 0
    }
    let date = new Date()
    
    if(type == 'day' && (value <= 1990 || value > date.getFullYear())){
      this.dataEvaluated.birthday.year = date.getFullYear()
    }
  }

  goSearch(){
    this.search.emit();
  }
}
