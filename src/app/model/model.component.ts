import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Models } from '../_shared/interfaces/models';
import { Datasets } from '../_shared/interfaces/datasets';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  datasets: Datasets[];
  analysis: Datasets["analysis"];
  title: String;
  url: String;
  metrics: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumnsMetrics: string[] = [];

  constructor(private http: HttpClient) {
    this.analysis = [];
    this.title = "";
    this.url = "/api";

    this.datasets = [
      { title: 'test-scores-of-students',
        analysis: ['info', 'metrics'] 
      }
    ];
  }

  ngOnInit(): void {
  }

  getModel(chooseDataSet: Datasets): void {
    this.title = chooseDataSet.title
    this.analysis = chooseDataSet.analysis
  }

  getAnalysis(chooseAnalysi: string): void {
    if(this.title != "") {
      this.http.get(this.url + '/' + chooseAnalysi + '/' + this.title, { responseType: 'text' }).subscribe(data => {
        const models: Array<Models> = JSON.parse(data);
  
        this.metrics.data = models;
        this.displayedColumnsMetrics = Object.keys(models[0]);
      });
    }
  }

  search(): void {

  }
}
