import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLoggerService } from '../authentication/user_logger/user_logger.service';

@Component({
  selector: 'fury-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  userLogger: any;
  
  constructor(
    private userLoggerService: UserLoggerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userLogger = this.userLoggerService.getUserLoggedIn();
    console.log(this.userLogger);
    if(this.userLogger.rol_id == '1'){
      this.router.navigate(['admin/companies']);
    }else{
      this.router.navigate(['company/query']);
    }
    
  }
}
