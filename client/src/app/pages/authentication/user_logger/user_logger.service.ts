import { Injectable } from '@angular/core';
import { UserLogger } from './user_logger.model';
import { SidenavService } from '../../../layout/sidenav/sidenav.service';
// import { SidenavItem } from '../../../core/layout/sidenav/sidenav-item/sidenav-item.interface';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserLoggerService {

  private isUserLoggedIn;
  public usserLogged:UserLogger;
  public typesTests: [] = [];
  // public menu: SidenavItem[] = [];
  public notifications:number;

  position_menu: number = 5;

  constructor(private sidenavService: SidenavService) { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:UserLogger) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    var ciphertext  = CryptoJS.AES.encrypt(JSON.stringify(user), 'integritas');
    localStorage.setItem('currentUser', ciphertext.toString());
  
  }

  getUserLoggedIn() {
    let decryptedData: any = '';
    if(localStorage.getItem('currentUser') != null){
      let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'integritas');
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(decryptedData);
      // let user_json = this.replaceAll(decryptedData, '\'', '\"')
      // console.log(user_json);
      // decryptedData = JSON.parse(user_json)
      // console.log(decryptedData);
    }
    return decryptedData;
  }

  deleteUserLogged(){
      this.usserLogged = <UserLogger>{};
      localStorage.removeItem('currentUser');
      localStorage.removeItem('typesTests');
      // localStorage.removeItem('notifications');
  }

  deleteOnlyUserLogged(){
    this.usserLogged = <UserLogger>{};
    localStorage.removeItem('currentUser');
}

  isLogged(){
      return this.isUserLoggedIn;
  }

  setLogged(flag:Boolean){
      this.isUserLoggedIn = flag;
  }

  setTypesTests(menu){
    this.typesTests = menu;
    var ciphertext  = CryptoJS.AES.encrypt(JSON.stringify(menu), 'integritas');
    localStorage.setItem('typesTests', ciphertext.toString());
  }

  getTypesTests(){
    let menu: any = '';
    if(localStorage.getItem('typesTests') != null){
      let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('typesTests'), 'integritas');
      menu = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return menu;
  }

  generateMenu(user){
    this.sidenavService.deleteItem();
    let position_evaluation = 1;
    let position = 5;
    let menus = [];
    
    if(user.rol_id == 1){
      menus.push(
        {
          name: 'Empresas',
          routeOrFunction: 'admin/companies',
          icon: 'icon-mis-reportes',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Planes',
          routeOrFunction: 'admin/plans',
          icon: 'icon-evaluados-ingresados',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Planes empresa',
          routeOrFunction: 'admin/contracts',
          icon: 'icon-evaluados-ingresados',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Sistema reglas',
          routeOrFunction: 'admin/rules',
          icon: 'icon-evaluados-ingresados',
          position: this.positionSum(),
          pathMatchExact: true
        },
      );
    }

    if(user.rol_id == 2 || user.rol_id == 3){
      menus.push(
        {
          name: 'Nueva consulta',
          routeOrFunction: 'company/query',
          icon: 'icon-nueva-solicitud',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Consultas masivas',
          routeOrFunction: 'company/massive_queries',
          icon: 'icon-inicio',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Informes',
          routeOrFunction: 'company/reports',
          icon: 'icon-mis-reportes',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Glosario de términos',
          routeOrFunction: 'company/glossary',
          icon: 'icon-mis-reportes',
          position: this.positionSum(),
          pathMatchExact: true
        },
        {
          name: 'Video tutotiales',
          routeOrFunction: 'company/videos',
          icon: 'icon-mis-reportes',
          position: this.positionSum(),
          pathMatchExact: true
        },
      )
    }
    
    this.position_menu = position_evaluation;
    this.sidenavService.addItems(menus);
  }

  positionSum(){
    this.position_menu = this.position_menu + 5;
    return this.position_menu;
  }

  changeCapitaltext(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  replaceAll(text, busca, reemplaza) {
    while (text.toString().indexOf(busca) !== -1)
        text = text.toString().replace(busca, reemplaza);
    return text;
  }
}
