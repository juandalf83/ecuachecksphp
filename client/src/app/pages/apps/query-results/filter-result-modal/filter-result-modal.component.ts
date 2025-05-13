import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlertService } from '../../alerts/alerts.service';

@Component({
  selector: 'fury-filter-result-modal',
  templateUrl: './filter-result-modal.component.html',
  styleUrls: ['./filter-result-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterResultModalComponent implements OnInit {

  listFilters = [
    {id: 1, name: 'Bases de datos ecuatorianas'},
    {id: 2, name: 'Bases de datos internacionales'},
  ]

  filtersToApply = [];
  appliedFilters = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<FilterResultModalComponent>,
    private alerts: AlertService
  ) {}

  ngOnInit() {
    this.appliedFilters = this.defaults
    let optionsList = {}
    this.appliedFilters.forEach(item => {
      if(item){
        optionsList[item.id] = item
      }
    })
    this.listFilters.forEach(item => {
      if(!optionsList[item.id]){
        this.filtersToApply.push(item)
      }
    })
  }

  closeModal(){
    this.dialogRef.close(false);
  }

  removeChip(item, origin): void {
    if(origin == 'toApply'){
      this.transferChips(item, this.filtersToApply, this.appliedFilters);
    }else{
      this.transferChips(item, this.appliedFilters, this.filtersToApply);
    }
  }

  transferChips(item, source, destination){
    const index = source.indexOf(item);
    if (index >= 0) {
      source.splice(index, 1);
      destination.push(item);
    }
  }

  applyFilters(){
    console.log(this.appliedFilters.length)
    if(this.appliedFilters.length == 0){
      this.alerts.warningMessage('Debe seleccionar almenos un filtro');
    }else{
      this.closeModal();
    }
  }
}
