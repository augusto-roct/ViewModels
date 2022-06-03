import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

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
  dataset: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  displayedColumns: string[] = [];

  constructor(private http: HttpClient) {
    this.url = "/api"

    this.datasets = [{
      title: 'test-scores-of-students',
      models: [],
      info: []
    }];

    http.get(this.url + '/metrics/test-scores-of-students', {responseType: 'text'}).subscribe(data => {
      this.datasets[0]['models'] = JSON.parse(data)
    })
   }

  ngOnInit(): void {
    
  }

  getModel(chooseDataSet: Dataset): void {    
    const nameList = Object.keys(chooseDataSet.models);
    Object.values(chooseDataSet.models).map((obj, index) => {
      // @ts-ignore
      obj['model'] = nameList[index];

      // let keys = Object.keys(obj);

      // for (let index = keys.length-1; index > -1; index--) {
      //   const key = keys[index];
      //   delete Object.assign(obj, {[key+'2']: obj[key] })[key];
      // }

      
      
      // // @ts-ignore
      delete Object.assign(obj, {['score2']: obj['score'] })['score'];
      delete Object.assign(obj, {['mae2']: obj['mae'] })['mae'];
      delete Object.assign(obj, {['rmse2']: obj['rmse'] })['rmse'];
      delete Object.assign(obj, {['rmsle2']: obj['rmsle'] })['rmsle'];

      delete Object.assign(obj, {['score']: obj['score2'] })['score2'];
      delete Object.assign(obj, {['mae']: obj['mae2'] })['mae2'];
      delete Object.assign(obj, {['rmse']: obj['rmse2'] })['rmse2'];
      delete Object.assign(obj, {['rmsle']: obj['rmsle2'] })['rmsle2'];
      

      return obj;
    });

    
    
    this.dataset.data = Object.values(chooseDataSet.models);
    // @ts-ignore
    this.displayedColumns = Object.keys(chooseDataSet.models['svm']);
  }
}
