import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoggerService } from 'src/app/pages/authentication/user_logger/user_logger.service';

@Component({
  selector: 'fury-header-plan',
  templateUrl: './header-plan.component.html',
  styleUrls: ['./header-plan.component.scss']
})
export class  HeaderPlanComponent implements OnInit {

  user: any
  constructor(
    private router: Router,
    private userLoggerService: UserLoggerService
  ) {}

  ngOnInit() {
    this.user = this.userLoggerService.getUserLoggedIn()
  }

  goPage(page){
    this.router.navigateByUrl(page);
  }
}
