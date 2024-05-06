import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HistoryService} from "../history/history.service";
import {ChartComponent, ChartOptions, ChartType} from 'chart.js';
// @ts-ignore
import { SingleDataSet } from 'ng2-charts';
import {CanvasJS, CanvasJSChart} from "@canvasjs/angular-charts";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart') chartComponent:ChartComponent ;

  public chartOptions: any = {
    animationEnabled: true,
    //theme: "dark2",
    //exportEnabled: true,
    title: {
      text: "Statut des Transferts"
    },
    subtitles: [{
      text: "Répartition des statuts"
    }],
    data: [{
      type: "pie",
      indexLabel: "{name}: {y}%",
      dataPoints: [
        { name: "Overhead", y: 9.1 },
        { name: "Problem Solving", y: 3.7 },
        { name: "Debugging", y: 36.4 },
        { name: "Writing Code", y: 30.7 },
        { name: "Firefighting", y: 20.1 }
      ]
    }]
  };

  constructor(private historyService: HistoryService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.historyService.getAlltransactions().subscribe(transferts => {
      const statutCounts = this.countStatuts(transferts);
      this.updateChartData(statutCounts);
      //console.log("jjj "+ statutCounts);
      //console.log(this.chartOptions.data[0].dataPoints)
      console.log("Données brutes des transferts :", transferts);
      console.log("Statuts comptés :", statutCounts);
      console.log("Nombre total de transferts :", transferts.length);
      console.log("Nombre total de statuts :", Object.keys(statutCounts).length);
      console.log("Données affectées à la charte :", this.chartOptions.data[0].dataPoints);



    });
  }

  countStatuts(transferts: any[]): { name: string, y: number }[] {
    const statutCounts: { [key: string]: number } = {};
    transferts.forEach(transfer => {
      const statut = transfer.status; // Supposons que le statut est stocké sous la propriété "status"
      statutCounts[statut] = (statutCounts[statut] || 0) + 1;
    });

    // Convertir les résultats en tableau d'objets {name, y} pour être compatible avec les dataPoints du graphique
    return Object.keys(statutCounts).map(statut => ({ name: statut, y: statutCounts[statut] }));
  }

  updateChartData(dataPoints: { name: string, y: number }[]): void {
    // Mettre à jour les dataPoints du graphique avec les nouvelles données
    this.chartOptions.data[0].dataPoints = dataPoints;

    // Forcer une mise à jour du composant de la charte
    const chartElement = this.elementRef.nativeElement.querySelector("#chartContainer2");

    // Mettez à jour le graphique en utilisant la bibliothèque CanvasJS directement
    if (chartElement) {
      const chart = new CanvasJS.Chart(chartElement, this.chartOptions);
      chart.render();
    }

  }
}
