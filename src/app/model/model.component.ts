import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Dataset {
  value: string;
  url: string;
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  urlSafe: SafeResourceUrl | undefined;

  datasets: Dataset[] = [
    {value: 'Test Scores of Students', url: "http://localhost:8000/testScoresOfStudents/notebook/analisys.html" }
  ];

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  getModel(dataset: Dataset): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(dataset.url);
  }
}
