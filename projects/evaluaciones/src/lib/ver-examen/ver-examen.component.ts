import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

export class Questions {
  question: any;
  option: any;
}

@Component({
  selector: 'lib-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit {
  questions: any;
  examGroup: FormGroup;
  question: Array<Questions> = [];
  answer: any;

  constructor(private dialogRef: MatDialogRef<VerExamenComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private service: ServiceService, private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    this.getQuestions(this.data.exams.exam.id);
    this.examGroup = this.formBuilder.group({
      answers: this.formBuilder.array([])
    });
    console.log(this.data.exams.exam.id);
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      question: ['']
    });
  }

  getQuestions(i) {
    this.service.getQuestion(i).subscribe(success => {
      this.questions = success;
      this.questions.forEach(element => {
        this.getOptions(element);
        this.allAnswers.push(this.createAnswer());
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
    }, error => {
      console.log(error);
    });
  }

  getAnswer(i): any {
    this.service.getAnswer(i).subscribe(success => {
      this.answer = success;
    });
    return this.answer.answer;
  }

  get allAnswers(): FormArray {
    return this.examGroup.get('answers') as FormArray;
  }

}
