import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../history/history.service";
import {forkJoin, of} from "rxjs";
import moment from "moment";
import {CanvasJS} from "@canvasjs/angular-charts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit {
  chartOptions: any = {
    animationEnabled: true,
    title: {
      text: "Évolution des utilisateurs, des transferts et des bénéficiaires par mois"
    },
    axisX: {
      title: "Mois"
    },
    axisY: {
      title: "Nombre"
    },
    data: [
      {
        type: "spline",
        showInLegend: true,
        name: "Initial Users Data",
        dataPoints: []
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Initial Transactions Data",
        dataPoints: []
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Initial Beneficiaries Data",
        dataPoints: []
      }
    ]
  };

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    // Fetch data and update the chart
    forkJoin({
      transactions: this.historyService.getAlltransactions(),
      users: this.historyService.getAllUsers(),
      beneficiaries: this.historyService.getAllBeneficiaries()
    }).subscribe(({ transactions, users, beneficiaries }) => {
      const transactionsPerMonth = this.groupDataByMonth(transactions);
      const usersPerMonth = this.groupDataByMonth(users);
      const beneficiariesPerMonth = this.groupDataByMonth(beneficiaries);
      this.updateChart(usersPerMonth, transactionsPerMonth, beneficiariesPerMonth);
      console.log("Transactions per month:", transactionsPerMonth);
      console.log("Users per month:", usersPerMonth);
      console.log("Beneficiaries per month:", beneficiariesPerMonth);
    });
  }

  groupDataByMonth(data: any[]): { [month: number]: number } {
    const groupedData: { [month: number]: number } = {};
    data.forEach(item => {
      const createTime = moment(item.createTime);
      if (createTime.isValid()) {
        const month = createTime.month() + 1;
        groupedData[month] = (groupedData[month] || 0) + 1;
      }
    });
    // Ajouter les mois manquants avec une valeur de zéro
    for (let month = 1; month <= 12; month++) {
      if (!groupedData.hasOwnProperty(month)) {
        groupedData[month] = 0;
      }
    }
    return groupedData;
  }



  mapDataToArray(data: { [month: number]: number }): { label: string, y: number }[] {
    const dataPoints = [];
    for (const month in data) {
      if (data.hasOwnProperty(month)) {
        dataPoints.push({ label: this.getMonthName(parseInt(month)), y: data[month] });
      }
    }
    return dataPoints;
  }


  updateChart(usersPerMonth: any, transactionsPerMonth: any, beneficiariesPerMonth: any): void {
    // Update chart options with new data
    this.chartOptions.title.text = "Évolution des utilisateurs, des transferts et des bénéficiaires par mois";
    this.chartOptions.axisX.title = "Mois";
    this.chartOptions.axisY.title = "Nombre";
    this.chartOptions.data[0].name = "Updated Users Data";
    this.chartOptions.data[0].dataPoints = this.mapDataToArray(usersPerMonth);
    this.chartOptions.data[1].name = "Updated Transactions Data";
    this.chartOptions.data[1].dataPoints = this.mapDataToArray(transactionsPerMonth);
    this.chartOptions.data[2].name = "Updated Beneficiaries Data";
    this.chartOptions.data[2].dataPoints = this.mapDataToArray(beneficiariesPerMonth);

    // Render the chart with updated options
    if (this.chartOptions.data[0].dataPoints.length > 0 ||
      this.chartOptions.data[1].dataPoints.length > 0 ||
      this.chartOptions.data[2].dataPoints.length > 0) {
      const chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
      chart.render();
    }
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber - 1];
  }
}
