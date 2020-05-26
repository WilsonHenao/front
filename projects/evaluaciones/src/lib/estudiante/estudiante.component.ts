import { Component, OnInit, Injectable } from '@angular/core';
import { ServiceService } from '../services/service.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { RealizarExamenComponent } from '../realizar-examen/realizar-examen.component';

@Component({
  selector: 'lib-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})

export class EstudianteComponent implements OnInit {
  displayedColumns = ['examDescription', 'numberQuestion', 'button'];
  examen: any;
  idExamen: any;
  question: any;
  idQuestion: any;
  option: any;
  idOptions: any;

  constructor(private service: ServiceService, public dialog: MatDialog) { }

  realizarExamen(i) {
    const dialogRef = this.dialog.open(RealizarExamenComponent, {
      disableClose: true,
    data: { exam : this.examen[i],
            quest : this.listQuestions(this.examen[i].id),
          }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  ngOnInit(): void {
    this.getExam();
  }

  listQuestions(id: any){
    console.log(this.question);
  }

  getExam() {
    this.service.getAllExam().subscribe(success => {
      this.examen = success;
      this.getIdExam(this.examen);
    }, error => {
      console.log(error);
    });
  }

  getIdExam(exam: any){
    exam.forEach(element => {
      this.getQuestions(element.id);
    });
  }
  getQuestions(i) {
    this.service.getQuestion(i).subscribe(success => {
      this.question = success;
      console.log(this.question);
      this.getIdQuestion(this.question);
    }, error => {
      console.log(error);
    });
  }

  getIdQuestion(quest: any){
    quest.forEach(element => {
      this.getOptions(element.id);
    });
  }

  getOptions(i) {
    this.service.getOption(i).subscribe(success => {
      this.option = success;
      console.log(this.option);
    }, error => {
      console.log(error);
    });
  }
}

