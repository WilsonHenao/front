import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Answer } from '../model/answer.model';

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
  ans: any;
  idAnswer: any;

  answerModel: Answer = {
    id: undefined,
    answer: undefined,
    question: undefined,
    idStudent: undefined
  };

  constructor(private dialogRef: MatDialogRef<RealizarExamenComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private service: ServiceService, private formBuilder: FormBuilder, private alerta: MatSnackBar) {
    dialogRef.disableClose = true;
  }



  ngOnInit(): void {
    this.getQuestions(this.data.exam.id);
    this.examGroup = this.formBuilder.group({
      answers: this.formBuilder.array([])
    });
    this.getAnswer();
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      answer: ['', Validators.required],
      question: ['']
    });
  }

  get answers(): FormArray {
    // tslint:disable-next-line: no-string-literal
    return this.examGroup.controls['answers'] as FormArray;
  }

  save(value, index) {
    const answer = this.answers.at(index) as FormGroup;
    answer.get('question').setValue(value);
  }

  saveAnswer() {
    let cont = 0;
    if (this.examGroup.valid) {
      let idAns = this.idAnswer;
      this.examGroup.value.answers.forEach(element => {
        idAns = idAns + 1;
        this.answerModel.id = idAns;
        if (element.question.typeOfResponse === 3) {
          this.answerModel.answer = element.answer;
          this.answerModel.question = element.question.id;
          cont = cont + 1;
        } else if (element.answer.length > 1) {
          let answers = '';
          element.answer.forEach(ans => {
            answers = answers + ans.options + ',';
            this.answerModel.question = ans.question;
          });
          this.answerModel.answer = answers;
        } else {
          this.answerModel.answer = element.answer.options;
          this.answerModel.question = element.answer.question;
        }
        this.answerModel.idStudent = 2;
        this.service.postAnswer(this.answerModel).subscribe(success => {
        });
      });
    }
    if (cont === 0) {
      this.validateAnswers();
    }
  }

  validateAnswers() {
    // tslint:disable-next-line: prefer-for-of
    let valoracion = 0;
    for (let index = 0; index < this.examGroup.value.answers.length; index++) {
      if (this.examGroup.value.answers[index].question.typeOfResponse !== 3) {
        if (this.examGroup.value.answers[index].answer.question === this.questions[index].id) {
          if (this.examGroup.value.answers[index].answer.options === this.questions[index].correctAnswer) {
            valoracion = ((this.data.exam.maximumNote) * (this.questions[index].assessment * 0.01)) + valoracion;
          }
        }
        this.openAlerta(valoracion);
      }
    }
  }

  openAlerta(valoracion) {
    this.alerta.open('Su nota es ' + valoracion, null, {
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

  getAnswer(): any {
    this.service.getAllAnswers().subscribe(success => {
      this.ans = success;
      this.idAnswer = this.ans.length;
    });
    return this.idAnswer;
  }

  get allAnswers(): FormArray {
    return this.examGroup.get('answers') as FormArray;
  }
}
