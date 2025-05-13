import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { CompaniesCreateUpdateComponent } from './companies-create-update/companies-create-update.component';
import { CompaniesService } from '../../../services/companies.service';
import { AlertService } from './../alerts/alerts.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'fury-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  companies: any[];
  userLogger: any;

  titularAlert: string = '';
  campoPrueba: string = '';

  @Input()
  columns: ListColumn[] = [
    { name: 'Empresa', property: 'name', visible: true, isModelProperty: true, width: '20%' },
    { name: 'Datos de contacto', property: 'user_name', visible: true, isModelProperty: true, width: '20%' },
    { name: 'Fecha registro', property: 'create_at', visible: true, isModelProperty: true, width: '15%' },
    { name: 'Créditos', property: 'credits_company', visible: true, isModelProperty: true, width: '8%' },
    { name: 'C. disponibles', property: 'credits_available', visible: true, isModelProperty: true, width: '8%' },
    { name: 'Agregar créditos', property: 'add_credits', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Tipo', property: 'status_name', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true, width: '9%' },
    // { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  
  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private companiesService: CompaniesService,
              private alerts: AlertService,
              private userLoggerService: UserLoggerService,
              private layoutService: LayoutService,
              private contractsService: ContractsService,
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
    ).subscribe((companies) => {
      this.companies = <any[]> companies;
      this.dataSource.data = <any[]> companies;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeStatusCompany(company) {
    console.log(company.status)
    this.alerts.confirm('Esta seguro de cambiar el estado de esta empresa?')
    .afterClosed().subscribe(result =>{
      if(result){
        let status = 0
        if(company.status){
          status = 1
        }
        let data = {
          id: company.id,
          status: status,
          author_id: this.userLogger.token
        }
        this.companiesService.updateStatus(data).subscribe({
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
        company.status = !company.status
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
    this.companiesService.searchObjects().subscribe({
      next:res => {
        if(res['status'] == 1){
          let data = res;
          console.log(data);
          data.forEach(element => {
            element.add_credits = 0
            if(element.status == 0){
              element.status = false
            }else{
              element.status = true
            }
            
            element.status_name = 'Nuevo'
            if(element.num_contracts > 1){
              element.status_name = 'Recurrente'
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

  onlyNumbers(event){
    return (event.charCode >= 48 && event.charCode < 58) || event.charCode == 46
  }

  changeAddCredits(row){
    this.alerts.confirm('Esta seguro de agregar creditos?')
    .afterClosed().subscribe(result =>{
      if(result){
        console.log(row);
        let data = {
          data: row,
          author_id: this.userLogger.token
        }
        this.contractsService.updateCredits(data).subscribe({
          next: res => {
            console.log(res)
          },
          error: error => {
            console.error(error)
          }
        })
      }else{
        row.add_credits = 0
      }
    })
  }
}
