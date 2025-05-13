import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ListColumn } from './list-column.model';

@Component({
  selector: 'fury-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Input() columns: ListColumn[];

  @ViewChild('filter') filter: ElementRef;
  @Output() filterChange = new EventEmitter<string>();

  @Input() hideHeader: boolean;

  cssTable: string = 'width-monitor';

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(){
    if(this.name == 'monitor'){
      this.cssTable = 'width-monitor';
    }else{
      this.cssTable = 'width-monitor-100';
    }
  }

  ngAfterViewInit() {
    if (!this.hideHeader) {
      fromEvent(this.filter.nativeElement, 'keyup').pipe(
        distinctUntilChanged(),
        debounceTime(150)
      ).subscribe(() => {
        this.filterChange.emit(this.filter.nativeElement.value);
      });
    }
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
    this.cd.markForCheck();
  }
}
