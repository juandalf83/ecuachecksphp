import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { CompaniesService } from '../../../services/companies.service';
import { AlertService } from './../alerts/alerts.service';
import { UserLoggerService } from '../../authentication/user_logger/user_logger.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'fury-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  companies: any[];
  userLogger: any;

  titularAlert: string = '';
  campoPrueba: string = '';

  @Input()
  columns: ListColumn[] = [
    { name: 'Empresa', property: 'company_name', visible: true, isModelProperty: true, width: '23%' },
    { name: 'Plan', property: 'name', visible: true, isModelProperty: true, width: '25%' },
    { name: 'Tipo', property: 'type_name', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Créditos', property: 'credits', visible: true, isModelProperty: true, width: '10%' },
    { name: 'Créditos adicionales', property: 'additional', visible: true, isModelProperty: true, width: '12%' },
    { name: 'Valor', property: 'value', visible: true, isModelProperty: true, width: '5%' },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true, width: '5%' },
  ] as ListColumn[];
  
  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companiesService: CompaniesService,
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private contractsService: ContractsService,
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

  changeStatus(company) {
    console.log(company.status)
    let msgConfirm = 'Esta seguro inactivar el contrato?'
    if(company.status){
      msgConfirm = 'Esta seguro activar el contrato?'
    }

    this.alerts.confirm(msgConfirm)
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
        this.contractsService.updateStatus(data).subscribe(
          res => {
            if(res['status'] == '1'){
              this.alerts.infoMessage(res['text']);
            }else{
              this.alerts.warningMessage(res['text']);  
            }
            this.refresh();
          },
          error => {
            console.error(error);
            this.alerts.dangerMessage(error.message);
          }
        );
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

  refresh(){
    this.dataSource = new MatTableDataSource();
    this.contractsService.searchObjects().subscribe(
      res => {
        if(res.length > 0){
          let data = res;
          data.forEach(element => {
            console.log(element);
            if(element.status == 0){
              element.status = false
            }else{
              element.status = true
            }

            element.value = '$'+element.month_value
            element.type_name = 'Mensual'
            if(element.type == 'A'){
              element.value = '$'+element.year_value
              element.type_name = 'Anual'
            }
          });
          this.subject$.next(data);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  onlyNumbers(event){
    return (event.charCode >= 48 && event.charCode < 58) || event.charCode == 46
  }
}
