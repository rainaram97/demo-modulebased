import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { DemoComponent } from './components/demo/demo.component';
import { HttpClientModule } from '@angular/common/http';
// import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Demo1Component } from './components/demo1/demo1.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Demo2Component } from './components/demo2/demo2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Demo3Component } from './components/demo3/demo3.component';
import { NgChartsModule } from 'ng2-charts';

// import { ModuleRegistry,AllCommunityModules  } from 'ag-grid-community';

// ModuleRegistry.registerModules([AllCommunityModules]);


@NgModule({
  declarations: [
    AppComponent,
    DemoPipe,
    DemoDirective,
    DemoComponent,
    Demo1Component,
    Demo2Component,
    Demo3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AgGridAngular,
    AgGridModule, // add your cell renderers here if any
    AgChartsAngularModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
  NgChartsModule ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
