import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  // data for "manual pivot"
  pivotedData: any[] = [];
  fuelTypes: string[] = [];

  pivotOptions = [
  { label: 'Fuel Type', value: 'fuel' },
  { label: 'Country', value: 'country' },
  { label: 'Make', value: 'make' },
];

selectedPivot = ''; // default


  rawData = [
  {
    make: 'Toyota',
    country: 'Japan',
    model: 'Camry',
    year: 2022,
    fuel: 'Petrol',
    horsepower: 203,
    price: 30000
  },
  {
    make: 'Honda',
    country: 'Japan',
    model: 'Accord',
    year: 2021,
    fuel: 'Hybrid',
    horsepower: 212,
    price: 28000
  },
  {
    make: 'Ford',
    country: 'USA',
    model: 'Fusion',
    year: 2020,
    fuel: 'Petrol',
    horsepower: 175,
    price: 27000
  },
  {
    make: 'BMW',
    country: 'Germany',
    model: '3 Series',
    year: 2023,
    fuel: 'Diesel',
    horsepower: 255,
    price: 45000
  },
  {
    make: 'Tesla',
    country: 'USA',
    model: 'Model 3',
    year: 2023,
    fuel: 'Electric',
    horsepower: 283,
    price: 50000
  },
  {
    make: 'Hyundai',
    country: 'South Korea',
    model: 'Elantra',
    year: 2022,
    fuel: 'Petrol',
    horsepower: 147,
    price: 19000
  }
];


  columnDefs1 : any = [
    {
      headerName: 'Make',
      field: 'make'
    },
    {
      headerName: 'Country',
      field: 'country',
      enableRowGroup: true
    },
    { field: 'model', sortable: true, filter: true },
    {
      headerName: 'Fuel',
      field: 'fuel',
      filter: true
    },
    {
      headerName: 'Year',
      field: 'year',
      sortable: true
    },
    {
      headerName: 'Horsepower',
      field: 'horsepower',
      valueFormatter: (params:any) => `${params.value} HP`
    },
    {
      headerName: 'Price',
      field: 'price',
      valueFormatter: (params:any) => `$${params.value.toLocaleString()}`,
      filter: 'agNumberColumnFilter'
    }
  ];
  

  gridOptions : any = {
    groupIncludeFooter: true,
    animateRows: true,
    enableRangeSelection: true,
    pagination: true,
    paginationPageSize: 5,
    autoGroupColumnDef: {
      headerName: 'Manufacturer',
      field: 'make',
      cellRendererParams: { suppressCount: false }
    }
  };
  

  onGridReady(event: GridReadyEvent) {
    event.api.sizeColumnsToFit();
  }


ngOnInit() {
  this.pivotedData = this.rawData
  this.columnDefs = this.columnDefs1;
}

onPivotChange() {
  const pivoted = this.createManualPivot(this.rawData, this.selectedPivot);
  this.pivotedData = pivoted;
  this.columnDefs = this.generateColumns();
  setTimeout(() => {
      this.agGrid.api.setColumnDefs(this.columnDefs);
      this.agGrid.api.setRowData(this.pivotedData);
  });
}

columnDefs : any = [
  { field: 'Make', pinned: 'left', cellStyle: { fontWeight: 'bold' } },
  ...this.fuelTypes.map(fuel => ({
    field: fuel,
    headerName: fuel,
    filter: true
  }))
];

generateColumns() {
  return [
    { field: 'Make', pinned: 'left', cellStyle: { fontWeight: 'bold' } },
    ...this.fuelTypes.map(fuel => ({
      field: fuel,
      headerName: fuel,
      filter: true
    }))
  ];
}

createManualPivot(data: any[], pivotField: string) {
  const rowField = 'make'; // rows
  const columnField = pivotField;

  const grouped: { [key: string]: any } = {};
  const columnValues = new Set<string>();

  data.forEach(item => {
    const rowKey = item[rowField];
    const colKey = item[columnField];
    columnValues.add(colKey);

    if (!grouped[rowKey]) {
      grouped[rowKey] = { Make: rowKey };
    }

    if (!grouped[rowKey][colKey]) {
      grouped[rowKey][colKey] = { total: 0, count: 0 };
    }

    grouped[rowKey][colKey].total += item.price;
    grouped[rowKey][colKey].count += 1;
  });

  const columnKeys = Array.from(columnValues);
  this.fuelTypes = columnKeys;

  const result = [];

  for (const rowKey in grouped) {
    const row: any = { Make: rowKey };
    columnKeys.forEach(col => {
      const data = grouped[rowKey][col];
      row[col] = data ? `$${Math.round(data.total / data.count)}` : '-';
    });
    result.push(row);
  }

  return result;
}

}
