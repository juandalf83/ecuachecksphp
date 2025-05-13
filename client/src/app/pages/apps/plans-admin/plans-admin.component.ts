import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AlertService } from './../alerts/alerts.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { PlansService } from 'src/app/services/plans.service';
import { PlanCreateUpdateComponent } from './plan-create-update/plan-create-update.component';

@Component({
  selector: 'fury-plans-admin',
  templateUrl: './plans-admin.component.html',
  styleUrls: ['./plans-admin.component.scss']
})
export class PlansAdminComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  companies: any[];
  userLogger: any;

  titularAlert: string = '';
  campoPrueba: string = '';

  @Input()
  columns: ListColumn[] = [
    { name: 'Nombre de plan', property: 'name', visible: true, isModelProperty: true, width: '20%' },
    { name: 'Créditos', property: 'credits', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Valor mes', property: 'month_value', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Valor año', property: 'year_value', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Valor por check adicional', property: 'additional_value', visible: true, isModelProperty: true, width: '20%' },
    { name: 'Checks adicionales', property: 'additional', visible: true, isModelProperty: true, width: '15%' },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true, width: '8%' },
    { name: 'Actions', property: 'actions', visible: true, width: '7%' },
  ] as ListColumn[];
  
  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private layoutService: LayoutService,
    private plansService: PlansService,
    private chf: ChangeDetectorRef
  ) {}

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    this.refresh();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((companies) => {
      this.companies = <any[]> companies;
      this.dataSource.data = <any[]> companies;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.plansService.searchObjects().subscribe({
      next: res => {
        if(res['status'] == 1){
          let data = res['text'];
          data.forEach(element => {
            if(element.status == 0){
              element.status = false
            }else{
              element.status = true
            }
          });
          this.subject$.next(data);
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  changeStatusPlan(row) {
    console.log(row.status)
    this.alerts.confirm('Esta seguro de cambiar el estado de este plan?')
    .afterClosed().subscribe(result =>{
      if(result){
        let status = 0
        if(row.status){
          status = 1
        }
        let data = {
          id: row.id,
          status: status,
          author_id: this.userLogger.token
        }
        this.plansService.updateStatus(data).subscribe({
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
      }else{
        row.status = !row.status
      }
    })
    
  }

  updatePlan(plan){
    this.openQuickpanel(plan);
  }

  createPlan(){
    this.openQuickpanel(undefined);
  }

  openQuickpanel(plan) {
    if(this.layoutService.cssQuickpanel == 'div-company'){
      this.layoutService.setCssQuickpanel('div-company-active');
      let componentRegister = {
        component: PlanCreateUpdateComponent,
        functionOrigin: this.ejecuteExternal,
        componentOrigin: this,
        defaults: plan
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
  
}
