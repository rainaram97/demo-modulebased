import { Component } from '@angular/core';
import { AgChartOptions, AgPieSeriesOptions } from 'ag-charts-community';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrl: './demo3.component.scss'
})
export class Demo3Component {

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [65, 35],
      backgroundColor: ['#00aeffff', '#E0E0E0'],
      hoverBackgroundColor: ['#45A049', '#BDBDBD'],
      borderWidth: 0,
    }],
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    cutout: '90%',
    rotation: -90,
    circumference: 180,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  doughnutChartPlugins = [];

  chartOptions: AgChartOptions = {
    data: [
      { label: 'Value', value: 70 },
      { label: 'Remainder', value: 30 }
    ],
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        labelKey: 'label',
        fills: ['#00C853', '#E0E0E0'],
        strokeWidth: 0,
        innerRadiusRatio: 0.8, // donut thickness
        startAngle: -90,
        endAngle: 90, 
      } as AgPieSeriesOptions
    ],
    title: {
      text: 'Radial Gauge (Simulated)',
    },
    legend: {
      enabled: false,
    },
    padding: {
      top: 0,
      bottom: 0,
    },
    // Simulate half donut

  };

}
