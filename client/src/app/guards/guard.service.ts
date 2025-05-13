import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { UserLoggerService } from '../pages/authentication/user_logger/user_logger.service';
import { urlpath } from '../guards/appSettings';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivateChild {

    pathservice = urlpath.path;
    constructor(private authService: UserLoggerService, 
                private router: Router, 
                private http: HttpClient) { }

    canActivateChild() {
        let result = true;
        let user = this.authService.getUserLoggedIn();
        if(user){
            this.validate_login(user).subscribe(
                res => {
                    if(res != 1){
                        this.authService.setLogged(false);
                        this.authService.deleteUserLogged();
                        this.router.navigate(['/login']);
                        result = false;
                    }
                },
                error => {
                    console.error(error);
                    this.authService.setLogged(false);
                    this.authService.deleteUserLogged();
                    this.router.navigate(['/login']);
                    result = false;
                }
            );
        }else{
            this.authService.setLogged(false);
            this.authService.deleteUserLogged();
            this.router.navigate(['/login']);
            result = false;
        }

        return result;
    }

    validate_login(data){
        return this.http.post(this.pathservice+'authentication/validate', {
          data: data
        });
    }

    replaceAll(text, busca, reemplaza) {
        while (text.toString().indexOf(busca) !== -1)
            text = text.toString().replace(busca, reemplaza);
        return text;
    }

}