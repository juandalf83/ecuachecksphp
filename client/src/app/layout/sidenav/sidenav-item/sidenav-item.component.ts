import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavService } from '../sidenav.service';
import { SidenavItem } from './sidenav-item.interface';
import isFunction from 'lodash-es/isFunction';

import { UserLoggerService } from 'src/app/pages/authentication/user_logger/user_logger.service';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'fury-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [
    trigger('dropdownOpen', [
      state('false', style({
        height: 0
      })),
      state('true', style({
        height: '*'
      })),
      transition('false <=> true', animate('300ms cubic-bezier(.35, 0, .25, 1)'))
    ])
  ]
})
export class SidenavItemComponent implements OnInit {

  @Input('item') item: SidenavItem;
  @Input('level') level: number;

  isCollapsed$ = this.sidenavService.collapsed$;
  dropdownOpen$: Observable<boolean>;

  cssProfile: string = "";
  cssProfile1: string = "";
  cssProfile2: string = "";
  cssProfile3: string = "";
  cssCompanyMenu: string = "";

  link_wts: string = '';

  constructor(
    private sidenavService: SidenavService, 
    private router: Router,
    private userLoggerService: UserLoggerService,
    private layoutService: LayoutService
  ) {
    this.dropdownOpen$ = this.sidenavService.currentlyOpen$.pipe(
      map(currentlyOpen => this.item.subItems && this.item.subItems.length > 0 && currentlyOpen.indexOf(this.item) > -1)
    );
  }

  get levelClass() {
    return `level-${this.level}`;
  }

  ngOnInit() {
    this.item.icon = this.item.icon+' icon';
    this.cssProfile = "position-item-footer style-companies";
    this.cssProfile1 = "position-item-footer1 style-companies";
    this.cssProfile2 = "position-item-footer2 style-companies";
    this.cssProfile3 = "position-item-footer3 style-companies";
    this.cssCompanyMenu = "style-companies"
  }

  isFunction(routeOrFunction: string[] | Function) {
    return isFunction(routeOrFunction);
  }

  handleClick() {
    if (this.item.subItems && this.item.subItems.length > 0) {
      this.sidenavService.toggleItemOpen(this.item);
    } else if (typeof this.item.routeOrFunction === 'string' || this.item.routeOrFunction instanceof String) {
      this.router.navigate([this.item.routeOrFunction]);
    } else if (typeof this.item.routeOrFunction === 'function' || this.item.routeOrFunction instanceof Function) {
      this.item.routeOrFunction();
    } else {
      throw Error('Could not determine what to do, Sidenav-Item has no routeOrFunction set AND does not contain any subItems');
    }
  }

  getTextIcon(item: SidenavItem) {
    let result = '';

    if (item) {
      const name = item.name.split(' ');

      if (name.length > 0) {
        result += name[0].charAt(0).toUpperCase();
      }

      if (name.length > 1) {
        result += name[1].charAt(0).toLowerCase();
      }

      if (name.length === 1) {
        result += name[0].charAt(1).toLowerCase();
      }
    }

    return result;
  }

  closeQuickpanel() {
    this.layoutService.setCssQuickpanel('div-company');
  }

  getCssMenu(element){
    let cssReturn = "tooltip-menu";
    let hashLinkOriginal = window.location.hash;
    let hashLink = window.location.pathname.substring(1); 
    // console.log(window.location);
    if(hashLinkOriginal == '/' || hashLinkOriginal == '#/'){
      if(element.routeOrFunction == '/'){
        cssReturn = "tooltip-menu-active";
      }
    }else{
      if(hashLink == element.routeOrFunction){
        cssReturn = "tooltip-menu-active";
      }
    }
    return cssReturn;
  }

  getItemName(name){
    let result = '';
    if(this.sidenavService.getCollapsed()){
      result = name;
    }
    return result;
  }

  selectMenu(item){
    // this.evaluationService.setIsShowForm(false);
    // this.evaluationService.setDataEvaluation('');
    // if(item.name == 'Mi cuenta'){
    //   this.sidenavService.setCollapsed(false);
    // }else{
    //   this.sidenavService.setCollapsed(true);
    // }
  }
}
