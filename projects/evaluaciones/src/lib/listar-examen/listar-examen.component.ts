import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';
import { VerExamenComponent } from '../ver-examen/ver-examen.component';

export class Exams {
  exam: any;
}
@Component({
  selector: 'lib-listar-examen',
  templateUrl: './listar-examen.component.html',
  styleUrls: ['./listar-examen.component.css']
})
export class ListarExamenComponent implements OnInit {
  answer: any;
  question: any;
  exam: any;
  examArray: Array<Exams> = [];

  constructor(private service: ServiceService, public dialog: MatDialog) { }

  verExamen(i) {
    const dialogRef = this.dialog.open(VerExamenComponent, {
      disableClose: true,
      height: '600px',
      width: '600px',
      data: { exams: this.examArray[i] },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  ngOnInit(): void {
    this.getAnswer();
  }

  getAnswer() {
    this.service.getAllAnswers().subscribe(success => {
      this.answer = success;
      this.answer.forEach(element => {
        this.getQuestion(element);
      });
    });
  }

  getQuestion(element: any) {
    this.service.getIdQuestion(element.question).subscribe(success => {
      this.question = success;
      this.getExam(this.question.exam);
    });
  }

  getExam(element: any) {
    const e = new Exams();
    const i = 0;
    let cont = 0;
    this.service.getIdExam(element).subscribe(success => {
      e.exam = success;

      if (this.examArray.length === 0) {
        this.examArray.push(e);
      } else {
        for (let index = i; index < this.examArray.length; index++) {
          if (e.exam.id === this.examArray[index].exam.id) {
            cont = cont + 1;
          }
        }
        if (cont === 0) {
          this.examArray.push(e);
        }
      }
    });
  }

  obtenerExamen(id){
    for (let index = 0; index < this.examArray.length; index++) {
      if (id === this.examArray[index].exam.id){
        this.verExamen(index);
      }
    }
  }
}
