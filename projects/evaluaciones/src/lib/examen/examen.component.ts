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
  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;
  i: any;
  tipos: any;
  examen: any;
  question: any;
  option: any;
  optiont: any;
  idOptions: number;
  idExamen: number;
  idQuestion: number;
  contQuestion: number;
  contOption: number;
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
    this.valuesFormArray = this.formBuilder.group({
      options: ['', Validators.required],
    });
    this.optionFormGroup = this.formBuilder.group({
      id: '',
      options: this.formBuilder.array([this.valuesFormArray]),
      correctAnswer: [[], Validators.required],
      question: ''
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

  addOption(i) {
    console.log(this.questionFormGroup);
    this.optiont = this.getOptions(i);
    console.log(this.optiont);
    console.log(i);
    this.optiont.push(this.formBuilder.group({
      options: ['', Validators.required]
    }))
    
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

  get options(): FormArray {
    return this.optionFormGroup.get('options') as FormArray;
  }

  getOptions(i): FormArray {
    return this.questions.controls[i].get('answers.options') as FormArray;
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

  removeOption(i) {
    this.questions.value[i].answers.options.removeAt(this.questions.value[i].answers.options.length - 1);
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
      console.log(element);
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

}
