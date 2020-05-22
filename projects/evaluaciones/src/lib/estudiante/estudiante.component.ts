import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'lib-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})

export class EstudianteComponent implements OnInit {
  displayedColumns = ['examDescription', 'numberQuestion', 'button'];
  examen: any;
  idExamen: any;

  constructor(private service: ServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getExam();
  }

  getExam() {
    this.service.getAllExam().subscribe(success => {
      this.examen = success;
      this.idExamen = this.examen.length + 1;
      console.log('Examen ' + this.idExamen);
    }, error => {
      console.log(error);
    });
  }

}
