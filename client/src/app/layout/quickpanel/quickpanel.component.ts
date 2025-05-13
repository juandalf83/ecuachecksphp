import { Component, OnInit, Input, AfterViewInit,
  SimpleChanges, ComponentFactoryResolver,
  ViewContainerRef, ViewChild, ComponentRef, ChangeDetectorRef } from '@angular/core';

import { LayoutService } from '../../../app/layout/layout.service';

@Component({
  selector: 'fury-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss']
})
export class QuickpanelComponent implements OnInit, AfterViewInit {

  @Input('component') component: any;
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer: ViewContainerRef;
  

  formData = new FormData();
  fileData: File[] = [];
  company: any;
  companyImage = '';
  mode: 'create' | 'update' = 'create';
  componentChild: any;
  showFooter: Boolean = true; 

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private layoutService: LayoutService,
              private chd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.component != undefined){
      let componentRegister = this.component.component;
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentRegister);
      this.componentContainer.clear();
      const componentInstance: ComponentRef<any> = this.componentContainer.createComponent(factory);
      componentInstance.instance.defaults = this.component.defaults;
      this.componentChild = componentInstance.instance;
      this.mode = 'create';
      if (this.component.defaults) {
        this.mode = 'update';
      }

      if(this.component.showFooter != undefined){
        this.showFooter = this.component.showFooter;
      }else{
        this.showFooter = true;
      }
      componentInstance.instance.functionOrigin = this.component.functionOrigin;
      componentInstance.instance.componentOrigin = this.component.componentOrigin;
      componentInstance.changeDetectorRef.detectChanges();
      this.chd.detectChanges();
    }
  }
  
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  closeWindow(){
    this.layoutService.setCssQuickpanel('div-company');
    this.component.functionOrigin(this.component.componentOrigin);
  }

  goSave(){
    this.componentChild.save();
  }
}
