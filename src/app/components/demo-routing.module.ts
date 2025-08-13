import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';
import { Demo3Component } from './demo3/demo3.component';

const routes: Routes = [
  {
    path:'',
    component:DemoComponent,
    pathMatch:'full'
  },
  {
    path:'demo',
    component:DemoComponent,
  },
  {
    path:'demo1',
    component:Demo1Component
  },
  {
    path:'demo2',
    component:Demo2Component
  },
  {
    path:'demo3',
    component:Demo3Component
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
