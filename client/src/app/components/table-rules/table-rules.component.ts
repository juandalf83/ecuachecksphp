import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fury-table-rules',
  templateUrl: './table-rules.component.html',
  styleUrls: ['./table-rules.component.scss']
})
export class  TableRulesComponent implements OnInit {

  @Input() data: any = [];
  @Input() title: any = [];
  @Output() public functionCell = new EventEmitter<any>();

  register = []
  optionsRules = [
    {name: 'Alerta', field: 'alert', color: '#ff0000', background: '#ff00001f'},
    {name: 'Revisar', field: 'review', color: '#FFA500', background: '#FFA5001F'},
    {name: 'Limpio', field: 'clean', color: '#00ff00', background: '#00ff001f'},
    {name: 'Informativo', field: 'informative', color: '#00ff00', background: '#00ff001f'},
  ]

  constructor(
  ) {}

  ngOnInit() {
    if(this.data.length > 0){
      if(this.data[0].group){
        let itemsGroup = []
        let groups = []
        this.data.forEach(item => {
          groups[item.group] = []
        })
        this.data.forEach(item => {
          groups[item.group].push(item)
        })
        let groupKey = Object.keys(groups)
        groupKey.forEach(key => {
          itemsGroup.push({id: '-', consultations_items_id: 0, consultations_items_name: key})
          groups[key].forEach(item => {
            itemsGroup.push(item)
          })
          // groups[item.group].push(item)
        })
        this.register = itemsGroup 
      }else{
        this.register = this.data
      }
    }
  }

  actionCell(field, row){
    this.functionCell.emit({row: row, field: field});
  }
}
