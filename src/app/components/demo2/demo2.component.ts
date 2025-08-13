import { Component } from '@angular/core';
import type { AgPieSeriesOptions, AgChartOptions, AgBarSeriesOptions, AgCartesianAxisOptions, AgCartesianSeriesOptions } from 'ag-charts-community';


@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrl: './demo2.component.scss'
})
export class Demo2Component {

  cards = [
  { title: 'Card 1', value: 60 },
  { title: 'Card 2', value: 142 },
  { title: 'Card 3', value: 125 },
  { title: 'Card 4', value: 226 }
];
  tasks = Array(10).fill('Dummy List Values');


  semiDonut1ChartOptions: AgChartOptions = {
    title: {
      text: 'Semi Donut 1'
    },
    data: [
    { label: 'Used', value: 35 }, //2nd
    { label: 'Free', value:10 }, //3rd
    { label: 'Free', value: 90 }, //full bottom
    { label: 'dummy', value: 45 } // 1st
  ],
  series: [{
    type: 'pie',
    angleKey: 'value',
    labelKey: 'label',
    innerRadiusRatio: 0.6,
    fills: ['#60a5fa', '#f97316', 'transparent'],
    strokes: ['white', 'white', 'transparent'],
    highlightStyle: { item: { fill: undefined, stroke: undefined } },
    tooltip: { enabled: true },
    calloutLabel: { enabled: false },
    innerLabels: [
            {
                text: '',
                fontWeight: 'bold',
            },
            {
                text: '98%',
                spacing: 4,
                fontSize: 48,
                color: 'green',
            },
        ],
  } as AgPieSeriesOptions],
};



semiDonut2ChartOptions: AgChartOptions = {
  title: {
      text: 'Semi Donut 2'
    },
  data: [
    { label: 'Used', value: 35 }, //2nd
    { label: 'Free', value:10 }, //3rd
    { label: 'Free', value: 90 }, //full bottom
    { label: 'dummy', value: 45 } // 1st
  ],
  series: [{
    type: 'pie',
    angleKey: 'value',
    labelKey: 'label',
    innerRadiusRatio: 0.85,
    fills: ['#60a5fa', '#c8e1ffff', 'transparent'],
    strokes: ['transparent', 'transparent'],
    calloutLabel: { enabled: false },
        tooltip: { enabled: false },
    innerLabels: [
            {
                text: '',
                fontWeight: 'bold',
            },
            {
                text: '97%',
                spacing: 4,
                fontSize: 48,
                color: 'green',
            },
    ],
    sectorLabel: { enabled: false },
    highlightStyle: { item: { fill: undefined, stroke: undefined } }
  } as AgPieSeriesOptions],
  background: {
    fill: 'transparent',
  }
};


  pieChartOptions: AgChartOptions = {
    data: [
      { category: 'Dummy1', value: 62 },
      { category: 'Dummy 2', value: 38 }
    ],
    series: [   {
          type: 'pie',
          angleKey: 'value',
          labelKey: 'label',
          innerRadiusRatio: 0.6,  
          showInLegend: true,
        } as AgPieSeriesOptions],
    title: { text: 'Dummy 1 vs Dummy2 - Total: 100' },
  };

  barChartMonthlyOptions: AgChartOptions = {
    data: [
      { month: 'JAN', count: 2 }, { month: 'FEB', count: 7 },
      { month: 'MAR', count: 6 }, { month: 'APR', count: 6 },
      { month: 'MAY', count: 5 }, { month: 'JUN', count: 2 },
      { month: 'JUL', count: 3 }, { month: 'DEC', count: 7 }
    ],
    series: [{
      type: 'bar',
      xKey: 'month',
      yKey: 'count',
      fill: '#3b82f6',
       item: {
        paddingInner: 0.1, 
        paddingOuter: 0.3
      },
      cornerRadius : 5
    }as AgBarSeriesOptions]
  };

  barChartOptions: AgChartOptions = {
    data: [
      { label: 'Val1', value: 70 },
      { label: 'Val2', value: 60 },
      { label: 'Val3', value: 40 },
      { label: 'Val4', value: 30 },
      { label: 'Val5', value: 50 }
    ],
    series: [{
      type: 'bar',
      xKey: 'label',
      yKey: 'value',
      fill: '#3b82f6', 
      item: {
        paddingInner: 0.1,
        paddingOuter: 0.3
      },    
      cornerRadius: 6,
      grouped: false,
      spacing: 0.5, 
      strokeWidth: 0
    } as AgBarSeriesOptions]
  };
}


