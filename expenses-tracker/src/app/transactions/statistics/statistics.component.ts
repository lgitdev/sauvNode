import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {TransactionsService} from "../transactions.service";
import {HighchartsChartModule} from "highcharts-angular";

@Component({
  selector: 'app-statistics',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './statistics.component.html',
  standalone: true,
  styles: ``
})
export class StatisticsComponent implements OnInit {
  Highcharts = Highcharts;

  // Options for charts
  barChartOptions: Highcharts.Options;
  lineChartOptions: Highcharts.Options;
  pieChartOptions: Highcharts.Options;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadBarChart();
    this.loadLineChart();
    this.loadPieChart();
  }

  private loadBarChart(): void {
    this.transactionsService.getExpensesByCategory().subscribe((data) => {
      console.log('Bar Chart Data:', data); // Vérifiez ce que retourne l'API
      const categories = data.map((item) => item.category);
      const totals = data.map((item) => item.total);

      this.barChartOptions = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Expenses by Category',
        },
        xAxis: {
          categories: categories,
          title: {
            text: 'Categories',
          },
        },
        yAxis: {
          title: {
            text: 'Total Expenses ($)',
          },
        },
        series: [
          {
            type: 'bar',
            name: 'Expenses',
            data: totals,
          },
        ],
      };

      console.log('Bar Chart Options:', this.barChartOptions);
    });
  }

  private loadLineChart(): void {
    this.transactionsService.getMonthlyTransactions().subscribe((data) => {
      const months = data.map((item) => item.month);
      const incomes = data.map((item) => item.incomes);
      const expenses = data.map((item) => item.expenses);

      this.lineChartOptions = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Monthly Transactions (Incomes vs Expenses)',
        },
        xAxis: {
          categories: months,
        },
        yAxis: {
          title: {
            text: 'Amount ($)',
          },
        },
        series: [
          {
            type: 'line',
            name: 'Incomes',
            data: incomes,
          },
          {
            type: 'line',
            name: 'Expenses',
            data: expenses,
          },
        ],
      };
    });
  }

  private loadPieChart(): void {
    this.transactionsService.getExpensesByCategory().subscribe((data) => {
      const pieData = data.map((item) => ({
        name: item.category,
        y: item.total,
      }));

      this.pieChartOptions = {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Expense Distribution by Category',
        },
        series: [
          {
            type: 'pie',
            name: 'Expenses',
            data: pieData,
          },
        ],
      };
    });
  }
}
