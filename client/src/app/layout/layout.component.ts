import { Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SidebarDirective } from '../../@fury/shared/sidebar/sidebar.directive';
import { SidenavService } from './sidenav/sidenav.service';
import { filter, map, startWith } from 'rxjs/operators';
import { ThemeService } from '../../@fury/services/theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { checkRouterChildsData } from '../../@fury/utils/check-router-childs-data';
import { LayoutService } from './layout.service';

@Component({
  selector: 'fury-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('configPanel', { static: true }) configPanel: SidebarDirective;

  sidenavOpen$ = this.sidenavService.open$;
  sidenavMode$ = this.sidenavService.mode$;
  sidenavCollapsed$ = this.sidenavService.collapsed$;
  sidenavExpanded$ = this.sidenavService.expanded$;
  quickPanelOpen: boolean;

  sideNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'side'));
  topNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'top'));
  toolbarVisible$ = this.themeService.config$.pipe(map(config => config.toolbarVisible));
  toolbarPosition$ = this.themeService.config$.pipe(map(config => config.toolbarPosition));
  footerPosition$ = this.themeService.config$.pipe(map(config => config.footerPosition));
  
  showMyPanel: boolean = false;
  cssQuickpanel: string;

  previewNotification: any = '';
  notification: any = {
    file: '',
    dateSelect: {start: '', end: ''},
    url: '',
    nombre_btn: ''
  }

  scrollDisabled$ = this.router.events.pipe(
    filter<NavigationEnd>(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.scrollDisabled))
  );

  constructor(
    public el: ElementRef,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private router: Router,
    public layoutService: LayoutService,
  ) {}

  ngOnInit() {
    this.cssQuickpanel = this.layoutService.getCssQuickpanel();
    if(screen.width <= 959){
      this.showMyPanel = true;
    }
  }

  openQuickPanel() {
    this.quickPanelOpen = true;
  }

  openConfigPanel() {
    this.configPanel.open();
  }

  closeSidenav() {
    this.sidenavService.close();
  }

  openSidenav() {
    this.sidenavService.open();
  }

  ngOnDestroy(): void {}

  @HostListener("window:scroll", ['$event'])
  checkScroll(event: Event){
    let dashboard = document.getElementById('div-contenedor');
    event.stopPropagation()
    let valueScroll = dashboard.offsetHeight + event.target['scrollTop']
    if ( valueScroll < dashboard.scrollHeight) {
      this.layoutService.addValueScroll(event.target['scrollTop']);
    }
  }
}

