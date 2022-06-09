import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Models } from '../_shared/interfaces/models';
import { Datasets } from '../_shared/interfaces/datasets';
import { Counts } from '../_shared/interfaces/Counts';

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
  dataSourceModels: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  dataSourceCounts: Array<MatTableDataSource<any>> = [];
  displayedColumns: string[] = [];
  displayedColumnsCounts: Array<string[]> = [];
  informationCounts: Array<string> = [];

  constructor(private http: HttpClient) {
    this.analysis = [];
    this.title = "";
    this.url = "/api";

    this.datasets = [
      {
        title: 'test-scores-of-students',
        analysis: ['models', 'counts']
      }
    ];
  }

  ngOnInit(): void {
  }

  getModel(chooseDataSet: Datasets): void {
    this.title = chooseDataSet.title;
    this.analysis = chooseDataSet.analysis;
  }

  getAnalysis(chooseAnalysis: string): void {
    if(this.title != "") {
      console.log(this.url + '/' + this.title + '/' + chooseAnalysis);
      this.http.get(this.url + '/' + this.title + '/' + chooseAnalysis, { responseType: 'text' }).subscribe(data => {

        if(chooseAnalysis == 'models') {
          const models: Array<Models> = JSON.parse(data);

          this.dataSourceModels.data = models;
          this.displayedColumns = Object.keys(models[0]);
          this.dataSourceCounts = [];
        } else if(chooseAnalysis == 'counts') {
            const counts: Array<Counts> = JSON.parse(data);
          
            for (let index = 0; index < counts.length; index++) {
              const element = counts[index];
              this.dataSourceCounts.push(new MatTableDataSource<any>([]));
              this.dataSourceCounts[index].data = element.value;

              const column = element.column? element.column : '';

              this.informationCounts.push(column);
              delete element.column;

              this.displayedColumnsCounts.push(Object.keys(element.value[0]));
            }

            this.dataSourceModels = new MatTableDataSource<any>([]);
          }
        });
    }
  }
}
