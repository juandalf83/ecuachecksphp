import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fury-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class  ProgressSpinnerComponent implements OnInit {

  @Input() percentage = 0;
  @Input() color = '';
  @Input() dimension = 0;
  @Input() stroke = 0;
  @Input() prefix = '';

  cValue = 0;
  ratio = 0;
  lenght_circle = 0;
  value_percentaje = 0;
  value_percentaje1 = 0;
  sizeFont = 0;
  sizeLetter = 0;
  yText = '0';
  xText = 0;
  width = 0;
  sizeText = 0;

  constructor(
  ) {}

  ngOnInit() {
    this.cValue = this.dimension/2;
    this.ratio = this.cValue - 10;
    this.lenght_circle = 2 * this.ratio * 3.14;
    this.value_percentaje = (this.percentage * this.lenght_circle)/100;
    this.value_percentaje1 = (100 * this.lenght_circle)/100;
    this.sizeFont = this.dimension/4;
    if(this.dimension < 60){
      this.sizeFont = this.dimension/5;
    }
    this.sizeLetter = (this.sizeFont*0.3)/0.5;
    this.yText = '58%';
    
    this.width = this.dimension;

    let value = this.percentage+'';
    if(this.prefix != ''){
      value += this.prefix; 
    }
    let sizeText = value.length * this.sizeLetter;
    let pointChar = 0;
    // if(strpos(value, '.') !== false){
    //   this.pointChar = 2;
    // }
    this.xText = this.cValue - (this.sizeText/2) + pointChar;
  }

}
