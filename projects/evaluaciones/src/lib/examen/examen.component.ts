import { Option } from './../model/option.model';
import { Question } from './../model/question.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'lib-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css'],
})
export class ExamenComponent implements OnInit {

  examFormGroup: FormGroup;
  questionFormGroup: FormGroup;
  tipos: any;
  examen: any;
  question: any;
  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;
  typeResponse: number;
  idExamen: number;
  idQuestion: number;
  validateFormAnswerFlag = true;
  questionModel: Question;
  answerModel: Option;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.optionFormGroup = this.formBuilder.group({
      options: [[], Validators.required],
      correctAnswer: ['', Validators.required]
    });
    this.valuesFormArray = this.formBuilder.group({
      description: ['', Validators.required],
      image: ['', Validators.required],
      assessment: ['', Validators.required],
      typeOfResponse: [''],
      answers: this.optionFormGroup
    });
    this.questionFormGroup = this.formBuilder.group({
      id: '',
      questions: this.formBuilder.array([this.valuesFormArray]),
      exam: ''
    });
  }

  ngOnInit() {
    this.examFormGroup = this.formBuilder.group({
      id: '',
      introduction: ['', Validators.required],
      maximumNote: ['', Validators.required]
    });
    this.getTypes();
    this.getExam();
    this.getQuestion();
  }

  addQuestion() {
    this.questions.push(this.formBuilder.group({
      description: ['', Validators.required],
      image: ['', Validators.required],
      assessment: ['', Validators.required],
      typeOfResponse: [''],
      answers: this.optionFormGroup
    }));
  }

  getTypes() {
    this.service.getAllTypeOfResponse().subscribe(success => {
      this.tipos = success;
    }, error => {
      console.log(error);
    });
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
  get questions(): FormArray {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  getQuestion() {
    this.service.getAllQuestion().subscribe(success => {
      this.question = success;
      this.idQuestion = this.question.length + 1;
      console.log('Pregunta ' + this.idQuestion);
    }, error => {
      console.log(error);
    });
  }

  removeQuestion() {
    this.questions.removeAt(this.questions.length - 1);
  }

  saveExam() {
    if (this.examFormGroup.valid && this.questionFormGroup.valid) {
      this.examFormGroup.controls.id.setValue(this.idExamen);
      this.service.postExam(this.examFormGroup.value).subscribe(success => {
        const exam = success;
        this.saveQuestion(exam.id);
      }, error => {
        console.error(error);
      });
      //this.questionFormGroup.value.questions.forEach(question => {
      //  this.questionModel.id = this.idQuestion;
      //this.questionModel.assessment = question.assessment;
      //this.questionModel.correctAnswer = question.answers.correctAnswer;
      //this.service.postExam(this.examFormGroup).subscribe(success => {
      //question.answers.options.forEach(answer => {
      //this.answerModel.id = 1;
      //this.answerModel.option = answer.option;
      //this.answerModel.question = this.idQuestion;
      //});
      //})
      // console.log(question);
      //});
    }
  }

  saveQuestion(idExam: number) {
    this.questionFormGroup.value.questions.forEach(element => {
      this.questionModel.id = this.idQuestion;
      this.questionModel.description = element.description;
      this.questionModel.image = element.image;
      this.questionModel.assessment = element.assessment;
      this.questionModel.typeOfResponse = element.typeOfResponse;
      this.questionModel.correctAnswer = element.answer.correctAnswer;
      this.questionModel.exam = idExam;

      this.service.postQuestion(this.questionModel).subscribe(success => {
        console.log(success);
      })
    });
  }

  validateFormAnswer(event) {
    if (event.answers !== null) {
      this.questions.at(event.indexQuestion).get('answers').get('correctAnswer').setValue(event.answers.correctAnswer);
      this.questions.at(event.indexQuestion).get('answers').get('options').setValue(event.answers.options);
    } else {
      this.questions.at(event.indexQuestion).get('answers').get('correctAnswer').setValue('');
      this.questions.at(event.indexQuestion).get('answers').get('options').setValue([]);
    }
  }

}
