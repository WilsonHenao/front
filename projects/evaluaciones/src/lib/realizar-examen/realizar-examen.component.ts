import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  examGroup: FormGroup;
  constructor(private dialogRef: MatDialogRef<RealizarExamenComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private service: ServiceService, private formBuilder: FormBuilder, private alerta: MatSnackBar) {
    dialogRef.disableClose = true;
   }



  ngOnInit(): void {
    this.getQuestions(this.data.exam.id);
    this.examGroup = this.formBuilder.group({
      answers: this.formBuilder.array([])
    });
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      answerCtrl: [''],
      questionCtrl: ['']
    });
  }

  save(value){
    console.log(value);
  }

  saveAnswer(){
    this.validateAnswers();
    console.log(this.examGroup.value);
  }

  validateAnswers(){
    // tslint:disable-next-line: prefer-for-of
    let valoracion = 0;
    for (let index = 0; index < this.examGroup.value.answers.length; index++) {
      if (this.examGroup.value.answers[index].answerCtrl.question === this.questions[index].id) {
        if (this.examGroup.value.answers[index].answerCtrl.options === this.questions[index].correctAnswer) {
          valoracion = ((this.data.exam.maximumNote) * (this.questions[index].assessment * 0.01)) + valoracion;
          console.log(valoracion);
        }
      }
    }
    this.openAlerta(valoracion);
  }

  openAlerta(valoracion) {
    this.alerta.open('Su nota es ' +  valoracion, null, {
      duration: 4000,
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

  get allAnswers(): FormArray {
    return this.examGroup.get('answers') as FormArray;
  }
}
