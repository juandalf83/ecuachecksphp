import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlertService } from '../../alerts/alerts.service';
import { HelperService } from 'src/app/guards/helper.service';

@Component({
  selector: 'fury-judicial-processes-modal',
  templateUrl: './judicial-processes-modal.component.html',
  styleUrls: ['./judicial-processes-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JudicialProcessesModalComponent implements OnInit {

  listFilters = [
    {id: 1, name: 'Bases de datos ecuatorianas'},
    {id: 2, name: 'Bases de datos internacionales'},
  ]

  
  activities = [];

  header = [
    {title: 'Fecha de ingreso', field: 'entry_date', type: 'text', width: '20%'},
    {title: 'Detalle', field: 'title', type: 'text', width: '75%'},
    {title: '', field: 'action', type: 'action', width: '5%'},
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<JudicialProcessesModalComponent>,
    private alerts: AlertService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    console.log(this.defaults);
    if(this.defaults.item.activities.length > 0){
      this.defaults.item.activities.forEach(element => {
        element.expanded = false;
        element.icon = 'assets/img/icons/angulo-hacia-abajo.svg'
        // let entry_date = new Date(element.entry_date);
        // element.entry_date = entry_date.getFullYear()+'-'+entry_date.getMonth()+'-'+entry_date.getDate()+' '+entry_date.getHours()+':'+entry_date.getMinutes();
        element.entry_date = this.helperService.generateDate(element.entry_date, true);
        this.activities.push(element);
      });
    }
  }

  closeModal(){
    this.dialogRef.close(false);
  }

  showDetail(row){
    console.log(row);
    row.expanded = !row.expanded
    if(row.expanded){
      row.icon = 'assets/img/icons/angulo-hacia-arriba.svg'
    }else{
      row.icon = 'assets/img/icons/angulo-hacia-abajo.svg'
    }
  }
}
