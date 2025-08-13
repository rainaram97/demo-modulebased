import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrl: './demo1.component.scss'
})
export class Demo1Component {
  rowData = [
    { name: 'Alice', age: 30, country: 'USA', job: 'Engineer', salary: 50000, dept: 'IT', gender: 'Female', status: 'Active', city: 'NYC', joined: '2022' },
    { name: 'Bob', age: 35, country: 'UK', job: 'Manager', salary: 60000, dept: 'HR', gender: 'Male', status: 'Inactive', city: 'London', joined: '2021' },
    { name: 'Charlie', age: 28, country: 'Germany', job: 'Analyst', salary: 55000, dept: 'Finance', gender: 'Male', status: 'Active', city: 'Berlin', joined: '2023' },
  ];

  allColumns: ColDef[] = [
    { field: 'name' },
    { field: 'age' },
    { field: 'country' },
    { field: 'job' },
    { field: 'salary' },
    { field: 'dept' },
    { field: 'gender' },
    { field: 'status' },
    { field: 'city' },
    { field: 'joined' },
  ];

  selectedFields: any[] = this.allColumns.slice(0, 5).map(col => col.field!);

  gridApi!: GridApi;

  get visibleColumns(): ColDef[] {
    return this.allColumns.filter(col => this.selectedFields.includes(col.field!));
  }

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit(); // Fit columns initially
  }

  // Watch changes in selection and resize columns
  // onColumnSelectionChanged() {
  //   setTimeout(() => {
  //     this.gridApi.sizeColumnsToFit();
  //   });
  // }


  // selectedFields: string[] = [];
  searchText: string = '';
  selectAllChecked: boolean = false;

  // Filter columns based on search text
  filteredColumns() {
    const text = this.searchText.trim().toLowerCase();
    return this.allColumns.filter((col:any) =>
      col.field.toLowerCase().includes(text)
    );
  }

  // Handle select all / deselect all
  onToggleSelectAll() {
    if (this.selectAllChecked) {
      this.selectedFields = this.filteredColumns().map(col => col.field);
    } else {
      this.selectedFields = [];
    }
  }

  // Update "Select All" checkbox state on selection change
  onColumnSelectionChanged() {
    const visibleFields = this.filteredColumns().map(col => col.field);
    this.selectAllChecked =
      visibleFields.length > 0 &&
      visibleFields.every(f => this.selectedFields.includes(f));
  }
}