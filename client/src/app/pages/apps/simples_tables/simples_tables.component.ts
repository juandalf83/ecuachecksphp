import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { SimplesTablesCreateUpdateComponent } from './simples_tables-create-update/simples_tables-create-update.component';
import { SimplesTables } from './simples_tables-create-update/simples_tables.model';
import { SimplesTablesService } from './simples_tables.service';
import { AlertService } from './../alerts/alerts.service';

@Component({
  selector: 'fury-all-in-one-table',
  templateUrl: './simples_tables.component.html',
  styleUrls: ['./simples_tables.component.scss']
})
export class SimplesTablesComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<SimplesTables[]> = new ReplaySubject<SimplesTables[]>(1);
  data$: Observable<SimplesTables[]> = this.subject$.asObservable();
  countries: SimplesTables[];

  titularAlert: string = '';
  tabla: string = '';
  tableTitle: string = '';

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Nombre', property: 'nombre', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  
  pageSize = 10;
  dataSource: MatTableDataSource<SimplesTables> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, 
              private simplesTablesService: SimplesTablesService,
              private _route: ActivatedRoute,
              private alerts: AlertService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.tabla = this._route.snapshot.paramMap.get('tabla');
    this.tableTitle = this.tabla.replace('_', ' ').toUpperCase();

    this.refresh();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((countries: any) => {
      this.countries = countries;
      this.dataSource.data = countries;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createSimplesTables() {
    this.dialog.open(SimplesTablesCreateUpdateComponent, {
      data: { tabla: this.tabla }
    }).afterClosed().subscribe((simplesTables: SimplesTables) => {
      if (simplesTables) {
        this.refresh();
      }
    });
  }

  updateSimplesTables(simplesTables) {
    this.dialog.open(SimplesTablesCreateUpdateComponent, {
      data: { tabla: this.tabla, data: simplesTables }
    }).afterClosed().subscribe((simplesTables) => {
      if (simplesTables) {
        this.refresh();
      }
    });
  }

  deleteSimplesTables(simplesTables) {
    this.alerts.confirm('Esta seguro de eliminar este registro?')
    .afterClosed().subscribe(result =>{
      if(result){
        this.simplesTablesService.delete(this.tabla, simplesTables.id).subscribe(
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
      }
    });    
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

    this.simplesTablesService.searchSimplesTables(this.tabla).subscribe(
      res => {
        this.subject$.next(res);
      },
      error => {
        console.error(error);
      }
    );
  }
}
