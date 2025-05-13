import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@fury/services/theme.service';
import { UserLoggerService } from '../../../app/pages/authentication/user_logger/user_logger.service';

@Component({
  selector: 'fury-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  sidenavUserVisible$ = this.themeService.config$.pipe(map(config => config.sidenavUserVisible));

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;
  
  user: any;

  iconExpanded = 'chevron_left';
  textExpanded = 'Contraer'

  constructor(private router: Router,
              private sidenavService: SidenavService,
              private userLoggerService: UserLoggerService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.user = this.userLoggerService.getUserLoggedIn();
    if(this.user){
      if(this.user.status == '1'){
        // let menuData = this.userLoggerService.getMenuUser();
        this.userLoggerService.generateMenu(this.user);
        // this.sidenavService.destroyItem();
        // menuData.forEach(item => this.sidenavService.addItem(item)); 
        this.items$ = this.sidenavService.items$.pipe(
          map((items: SidenavItem[]) => this.sidenavService.sortRecursive(items, 'position'))
        );
      }
    }
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
    this.iconExpanded = 'chevron_left';
    this.textExpanded = 'Contraer'
    if(this.sidenavService.getCollapsed()){
      this.iconExpanded = 'chevron_right';
      this.textExpanded = ''
    }
  }

  // @HostListener('mouseenter')
  // @HostListener('touchenter')
  // onMouseEnter() {
  //   this.sidenavService.setExpanded(true);
  // }

  // @HostListener('mouseleave')
  // @HostListener('touchleave')
  // onMouseLeave() {
  //   this.sidenavService.setExpanded(false);
  // }

  ngOnDestroy() {
  }
}
