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
  option: any;
  idOptions: number;
  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;
  idExamen: number;
  idQuestion: number;
  contQuestion: number;
  contOption: number;
  validateFormAnswerFlag = true;
  questionModel: Question = {
    id: undefined,
    description: undefined,
    image: undefined,
    assessment: undefined,
    typeOfResponse: undefined,
    correctAnswer: undefined,
    exam: undefined
  };
  answerModel: Option = {
    id: undefined,
    options: undefined,
    question: undefined
  };

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
    this.getOption();
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

  getQuestion(): any {
    this.service.getAllQuestion().subscribe(success => {
      this.question = success;
      this.idQuestion = this.question.length;
    }, error => {
      console.log(error);
    });
    return this.idQuestion;
  }

  getOption(): any {
    this.service.getAllOptions().subscribe(success => {
      this.option = success;
      this.idOptions = this.option.length;
    }, error => {
      console.log(error);
    });
    return this.idOptions;
  }

  removeQuestion() {
    this.questions.removeAt(this.questions.length - 1);
  }

  saveExam() {
    if (this.examFormGroup.valid && this.questionFormGroup.valid) {
      this.examFormGroup.controls.id.setValue(this.idExamen);
      this.service.postExam(this.examFormGroup.value).subscribe(success => {
        const exam = success;
        this.contOption = this.getOption();
        this.saveQuestion(exam.id, this.contOption);
      }, error => {
        console.error(error);
      });
    }
  }

  saveQuestion(idExam: number, idOpt: number) {
    this.contQuestion = this.getQuestion();
    this.questionFormGroup.value.questions.forEach(element => {
      this.contQuestion = this.contQuestion + 1;
      this.questionModel.id = this.contQuestion;
      this.questionModel.description = element.description;
      this.questionModel.assessment = element.assessment;
      this.questionModel.typeOfResponse = element.typeOfResponse;
      console.log(this.questionModel.typeOfResponse);
      console.log(element.answers.correctAnswer);
      this.questionModel.correctAnswer = element.answers.correctAnswer;
      this.questionModel.exam = idExam;
      this.service.postQuestion(this.questionModel).subscribe(success => {
        const quest = success;
        idOpt = this.saveOption(quest.id, element.answers, idOpt);
      });
    });
  }

  saveOption(idOption: number, item: any, index: number): any {
    item.options.forEach(answer => {
      index = index + 1;
      this.answerModel.id = index;
      this.answerModel.options = answer.options;
      this.answerModel.question = idOption;

      this.service.postOption(this.answerModel).subscribe(success => {
      });
    });
    return index;
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
