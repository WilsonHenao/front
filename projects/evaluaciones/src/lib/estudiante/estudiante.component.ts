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
    data: { exam : this.examen[i].introduction}});
    console.log(this.examen[i].introduction);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  ngOnInit(): void {
    this.getExam();
  }

  getExam() {
    this.service.getAllExam().subscribe(success => {
      this.examen = success;
      this.idExamen = this.examen.length + 1;
      this.getIdExam(this.examen);
      console.log('Examen ' + this.idExamen);
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
      this.getIdQuestion(this.question);
      console.log(this.question);
      this.idQuestion = this.question.length;
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
      this.idOptions = this.option.length;
    }, error => {
      console.log(error);
    });
  }
}

