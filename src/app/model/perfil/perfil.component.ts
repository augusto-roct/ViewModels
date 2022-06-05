import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../model.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  constructor(public modelComponent: ModelComponent) { }

  ngOnInit(): void {
  }

}
