import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fury-table-judicial',
  templateUrl: './table-judicial.component.html',
  styleUrls: ['./table-judicial.component.scss']
})
export class  TableJudicialComponent implements OnInit {

  @Input() subject: any = [];
  @Input() process: any = [];
  @Input() header: any = [];
  @Input() titleMovil: any = [];
  @Output() public functionCell = new EventEmitter<any>();

  constructor(
  ) {}

  ngOnInit() {
  }

  actionCell(index, item){
    this.functionCell.emit({item: item, index: index, process: this.process});
  }
}
