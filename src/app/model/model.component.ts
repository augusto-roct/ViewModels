import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Dataset {
  title: String;
  models: [];
  info: [];
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  datasets: Dataset[];
  url: string;
  dataset: Array<Object> = [];

  displayedColumns: string[] = [];

  constructor(private http: HttpClient) {
    this.url = "/api"

    this.datasets = [{
      title: 'test-scores-of-students',
      models: [],
      info: []
    }];

    http.get(this.url + '/test-scores-of-students/models', {responseType: 'text'}).subscribe(data => {
      this.datasets[0]['models'] = JSON.parse(data)
    })

    http.get(this.url + '/test-scores-of-students/info', {responseType: 'text'}).subscribe(data => {
      this.datasets[0]['info'] = JSON.parse(data)
    })
   }

  ngOnInit(): void {
    
  }

  getModel(chooseDataSet: Dataset): void {    
    this.displayedColumns = Object.keys(chooseDataSet.models);

    const valuesColumns = Object.values(chooseDataSet.models)
    
    this.displayedColumns.forEach((key, index) => {
      const metrics = valuesColumns[index]

      const metricsKey = Object.keys(metrics)
      const metricsValue = Object.values(metrics)

      metricsKey.forEach((_, index2) => {
        let dataset = {'name': ''}

        if (index2 == 0) dataset = {'name': key}

        const nameMetric = metricsKey[index2]

        const assignData = {nameMetric, 'value': metricsValue[index2]};

        Object.assign(dataset, assignData);

        this.dataset.push(dataset)
      })
    });

    console.log(this.dataset);
    this.displayedColumns = Object.keys(this.dataset[0]);
  }
}
