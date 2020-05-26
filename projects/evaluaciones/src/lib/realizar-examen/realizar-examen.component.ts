import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';

export class Questions {
  question: any;
  option: any;
}
@Component({
  selector: 'lib-realizar-examen',
  templateUrl: './realizar-examen.component.html',
  styleUrls: ['./realizar-examen.component.css'],
})
export class RealizarExamenComponent implements OnInit {
  questions: any;
  options: any;
  question: Array<Questions> = [];
  ngModelOption: any;
  constructor(private dialogRef: MatDialogRef<RealizarExamenComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private service: ServiceService) {
    dialogRef.disableClose = true;
   }



  ngOnInit(): void {
    this.getQuestions(this.data.exam.id);
  }

  getQuestions(i) {
    this.service.getQuestion(i).subscribe(success => {
      this.questions = success;
      this.questions.forEach(element => {
        this.getOptions(element);
      });
    }, error => {
      console.log(error);
    });
  }

  getOptions(element: any) {
    const q = new Questions();
    q.question = element;
    this.service.getOption(element.id).subscribe(success => {
      q.option = success;
      this.question.push(q);
      console.log(this.question);
    }, error => {
      console.log(error);
    });
  }
}
