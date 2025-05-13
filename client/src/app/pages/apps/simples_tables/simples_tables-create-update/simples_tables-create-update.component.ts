import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SimplesTables } from './simples_tables.model';
import { SimplesTablesService } from '../simples_tables.service';
import { AlertService } from '../../alerts/alerts.service';

@Component({
  selector: 'fury-simples_tables-create-update',
  templateUrl: './simples_tables-create-update.component.html',
  styleUrls: ['./simples_tables-create-update.component.scss']
})
export class SimplesTablesCreateUpdateComponent implements OnInit {

  static id = 100;

  titularAlert: string = '';
  tableTitle: string = '';

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  paisesJSONData: {};

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<SimplesTablesCreateUpdateComponent>,
              private fb: FormBuilder,
              private simplesTablesService: SimplesTablesService,
              private alerts: AlertService) {
  }

  ngOnInit() {
    this.tableTitle = this.defaults.tabla.replace('_', ' ').toUpperCase();

    if (this.defaults.data) {
      this.mode = 'update';
    } else {
      this.defaults.data = {} as SimplesTables;
    }

    this.form = this.fb.group({
      nombre: [this.defaults.data.nombre, Validators.required],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createSimplesTables();
    } else if (this.mode === 'update') {
      this.updateSimplesTables();
    }
  }

  createSimplesTables() {
    const simplesTables = this.form.value;
    this.simplesTablesService.save(this.defaults.tabla, 0, simplesTables).subscribe(
      res => {
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text']);
          this.dialogRef.close(simplesTables);
        }else{
          if(res['status'] == 2){
            this.alerts.warningMessage(res['text']);
          }
        }
      },
      error => {
        console.error(error);
        this.alerts.dangerMessage(error.message);
      }
    );
  }

  updateSimplesTables() {
    const simplesTables = this.form.value;
    this.simplesTablesService.save(this.defaults.tabla, this.defaults.data.id, simplesTables).subscribe(
      res => {
        if(res['status'] == 1){
          this.alerts.infoMessage(res['text']);
          this.dialogRef.close(SimplesTables);
        }else{
          if(res['status'] == 2){
            this.alerts.warningMessage(res['text']);
          }
        }
      },
      error => {
        console.error(error.message);
        this.alerts.dangerMessage(error.message);
      }
    );
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
