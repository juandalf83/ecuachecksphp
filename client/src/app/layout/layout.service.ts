import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import * as SimpleBar from 'simplebar';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  scrollbar: SimpleBar;
  cssQuickpanel: string;
  componentRegister: any;
  // valueScroll: Number = 0;
  private valueScroll:Subject<Number> = new BehaviorSubject<Number>(0);

  constructor() {
    this.cssQuickpanel = 'div-company';
  }

  setCssQuickpanel(css){
    this.cssQuickpanel = css;
  }

  getCssQuickpanel(){
    return this.cssQuickpanel;
  }

  setComponentRegister(css){
    this.componentRegister = css;
  }

  getComponentRegister(){
    return this.componentRegister;
  }

  get valueScroll$(){
    return this.valueScroll.asObservable();
  }

  addValueScroll(data:Number) {
    this.valueScroll.next(data);
  }
}
