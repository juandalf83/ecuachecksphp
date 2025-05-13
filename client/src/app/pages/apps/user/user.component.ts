import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { UserService } from '../../../services/user.service';
import { AlertService } from './../alerts/alerts.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'fury-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  users: any[];
  userLogger: any;

  titularAlert: string = '';
  campoPrueba: string = '';

  @Input()
  columns: ListColumn[] = [
    { name: 'EMAIL', property: 'email', visible: true, isModelProperty: true },
    { name: 'ROL', property: 'rol_name', visible: true, isModelProperty: true },
    { name: 'TELEFONO', property: 'phone', visible: true, isModelProperty: true },
    { name: 'ESTADO', property: 'status_name', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  
  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, 
              private userService: UserService,
              private alerts: AlertService,
              private userLoggerService: UserLoggerService,
              private layoutService: LayoutService,
              private chf: ChangeDetectorRef) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.refresh();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((users) => {
      this.users = <any[]> users;
      this.dataSource.data = <any[]> users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createUser() {
    this.openQuickpanel(undefined);
  }

  updateUser(user) {
    let validAdmin = this.userLogger.rol_id == 1 || this.userLogger.rol_id == 2;
    if(validAdmin){
      this.openQuickpanel(user);
    }
  }

  deleteUser(user) {
    let status = '0';
    let message = 'Esta seguro de inactivar este registro?';
    if(user.status == 0){
      status = '1';
      message = 'Esta seguro de activar este registro?';
    }
    this.alerts.confirm(message)
    .afterClosed().subscribe(result =>{
      if(result){
        let data = {id: user.id, status: status, author_id: this.userLogger.token}
        this.userService.updateStatus(data).subscribe({
          next: res => {
            if(res['status'] == '1'){
              this.alerts.infoMessage(res['text']);
            }else{
              this.alerts.warningMessage(res['text']);  
            }
            this.refresh();
          },
          error: error => {
            console.error(error);
            this.alerts.dangerMessage(error.message);
          }
        });
      }
    })
    
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }

  refresh(){
    this.dataSource = new MatTableDataSource();
    this.getUsersCompany();
  }

  getUsersCompany(){
    this.userService.searchUserCompany(this.userLogger.company_id).subscribe({
      next: res => {
        console.log(res)
        if(res['status'] == 1){
          let data = res['text'];
          let finalData = this.generateDataUsers(data);
          this.subject$.next(finalData);
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  generateDataUsers(data){
    let finalData = [];
    let showAllUser = true;
    data.forEach(element => {
      if(this.userLogger.token == element.token){
        element.status_name = 'Activo'
        if(element.status == 0){
          element.status_name = 'Inactivo'
        }
        finalData[0] = element;
      }
    });
    if(showAllUser){
      data.forEach(element => {
        if(this.userLogger.token != element.token){
          let cssInactive = '';
          if(element.status == 0){
            cssInactive = 'text-inactive';
          }
          element.cssStatus = cssInactive;
          element.status_name = 'Activo'
          if(element.status == 0){
            element.status_name = 'Inactivo'
          }
          finalData.push(element);
        }
      });
    }
    return finalData;
  }

  openQuickpanel(user) {
    if(this.layoutService.cssQuickpanel == 'div-company'){
      this.layoutService.setCssQuickpanel('div-company-active');
      let componentRegister = {
        component: UserCreateUpdateComponent,
        functionOrigin: this.ejecuteExternal,
        componentOrigin: this,
        defaults: user
      }
      this.layoutService.setComponentRegister(componentRegister);
    }else{
      this.layoutService.setCssQuickpanel('div-company');
    }
  }

  ejecuteExternal(Component){
    Component.refresh();
    Component.chf.detectChanges();
  }

  resetPassUser(row){
    this.alerts.confirm('Esta seguro de resetar la clave de este usuario?')
    .afterClosed().subscribe(result =>{
      if(result){
        let data = {id: row.id, author_id: this.userLogger.token}
        this.userService.resetPass(data).subscribe({
          next: res => {
            if(res['status'] == 1){
              this.alerts.infoMessage(res['text']);
            }else{
              this.alerts.warningMessage(res['text']);  
            }
            this.refresh();
          },
          error: error => {
            console.error(error);
            this.alerts.dangerMessage(error.message);
          }
        });
      }
    })
  }
}
