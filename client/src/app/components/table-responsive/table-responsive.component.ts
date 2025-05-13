import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fury-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})
export class  TableResponsiveComponent implements OnInit {

  @Input() data: any = [];
  @Input() header: any = [];
  @Input() titleMovil: any = [];
  @Output() public functionCell = new EventEmitter<any>();
  @Output() public functionCellTextAction = new EventEmitter<any>();

  constructor(
  ) {}

  ngOnInit() {}

  actionCell(index, item){
    this.functionCell.emit({item: item, index: index});
  }

  actionCellText(index, item){
    this.functionCellTextAction.emit({item: item, index: index});
  }
}
