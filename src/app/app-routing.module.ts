import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './components/demo-routing.module';

const routes: Routes = [
  {path:'',redirectTo:'demo',pathMatch:'full'},
  {
    path:'demo',
    loadChildren: () => import('./components/demo.module').then(m => DemoRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
