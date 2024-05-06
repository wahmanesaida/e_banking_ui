import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {HistoryService} from "../history/history.service";
import {map} from "rxjs";
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit{
   chart: any;

  constructor(private historyService: HistoryService) {
  }
  ngOnInit(): void {
    this.getAllTransferByMonth().subscribe(transfertsPerMonth => {
      const labels = Object.keys(transfertsPerMonth).map(month => this.getMonthName(parseInt(month)));
      const data = Object.values(transfertsPerMonth) as number [];
      this.createChart(labels, data);
      console.log(data);
    });


  }

  getAllTransferByMonth(){
    return this.historyService.getAlltransactions().pipe(
      map(transferts => {
        const transfertsPerMonth = {};
        transferts.forEach(transfer => {
          const month = new Date(transfer.createTime).getMonth() + 1; // Get month (1-12)
          transfertsPerMonth[month] = (transfertsPerMonth[month] || 0) + 1; // Count transfers per month
        });
        return transfertsPerMonth;
        }

      )
    );
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber - 1];
  }

  createChart(labels: string[], data: number[]){

    this.chart = new Chart("MyChart", {

      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {

            label: "Transferts par mois",
            data: data,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

}
