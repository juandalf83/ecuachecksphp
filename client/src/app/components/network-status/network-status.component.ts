import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 

@Component({
  selector: 'fury-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.scss']
})
export class NetworkStatusComponent implements OnInit {

  netStatus: string = '';
  constructor() { }

  ngOnInit() {
    fromEvent(window, 'offline').pipe(
      debounceTime(100)
    ).subscribe((event: Event) => {
      this.netStatus = event.type;
    });

    fromEvent(window, 'online').pipe(
      debounceTime(100)
    ).subscribe((event: Event) => {
      this.netStatus = event.type;
    });
  }
}
