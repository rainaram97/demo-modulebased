import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoRoutingModule } from './demo-routing.module';
import { Demo3Component } from './demo3/demo3.component';
@NgModule({
  declarations: [  
  ],
  imports: [
    CommonModule,
    RouterModule,
    DemoRoutingModule  ]
})
export class DemoModule { }
