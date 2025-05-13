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

@Component({
  selector: 'fury-video-tutorials',
  templateUrl: './video-tutorials.component.html',
  styleUrls: ['./video-tutorials.component.scss']
})
export class VideoTutorialsComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  companies: any[];
  userLogger: any;

  titularAlert: string = '';
  campoPrueba: string = '';

  @Input()
  columns: ListColumn[] = [
    { name: 'CEDULA', property: 'identification', visible: true, isModelProperty: true },
    { name: 'NOMBRE', property: 'name', visible: true, isModelProperty: true },
    // { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  
  pageSize = 10;
  dataSource: MatTableDataSource<any> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alerts: AlertService,
    private userLoggerService: UserLoggerService,
    private layoutService: LayoutService,
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
    let mockup = [
      {identification: '1721194593', name: 'Jonathan Toledo 1'},
      {identification: '1721194593', name: 'Jonathan Toledo 2'},
      {identification: '1721194593', name: 'Jonathan Toledo 3'},
      {identification: '1721194593', name: 'Jonathan Toledo 4'},
    ]
    this.subject$.next(mockup);
  }

  
}
