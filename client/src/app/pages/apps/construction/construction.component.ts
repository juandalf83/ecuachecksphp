import { Component, OnInit, Input } from '@angular/core';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})

export class ConstructionComponent implements OnInit {

  userLogger: any;
  
  constructor() {
  }

  private _gap = 16;
  gap = `${this._gap}px`;

  ngOnInit() {
  }
}
