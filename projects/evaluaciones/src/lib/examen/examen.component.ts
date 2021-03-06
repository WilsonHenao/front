import { Option } from './../model/option.model';
import { Question } from './../model/question.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../model/note.model';

@Component({
  selector: 'lib-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css'],
})
export class ExamenComponent implements OnInit {

  examFormGroup: FormGroup;
  tipos: any;
  examen: any;
  question: any;
  option: any;
  optiont: any;
  note: any;
  idOptions: number;
  idExamen: number;
  idQuestion: number;
  idNote: number;
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
  noteModel: Note = {
    id: undefined,
    idTeacher: undefined,
    idStudent: undefined,
    idExam: undefined,
    finalNote: undefined,
  };
  optionsLocal: FormArray;

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private alerta: MatSnackBar) {
  }

  questionFormGroup = this.formBuilder.group({
    questions: this.formBuilder.array([this.createQuestion()])
  });

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
    this.getNote();
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      description: ['', Validators.required],
      image: ['', Validators.required],
      assessment: ['', Validators.required],
      typeOfResponse: ['', Validators.required],
      answers: this.formBuilder.group({
        options: this.formBuilder.array([this.createOption()]),
        correctAnswer: ['', Validators.required],
      })
    });
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      option: ['', Validators.required]
    });
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

  getNote() {
    this.service.getAllNotes().subscribe(success => {
      this.note = success;
      this.idNote = this.note.length + 1;
      console.log('Nota' + this.idNote);
    });
  }

  get questions(): FormArray {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  getOptions(i): FormArray {
    return this.questions.at(i).get('answers').get('options') as FormArray;
  }

  addOption(i) {
    this.getOptions(i).push(this.createOption());
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  getOptionsCA(i): Array<any> {
    return (this.questions.at(i).value.answers.options);
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
    this.getOptions(i).removeAt(this.getOptions(i).length - 1);
  }

  validateTypeOfReponse(index) {
    setTimeout(() => {
      const question = this.questions.at(index) as FormGroup;
      if (this.questions.at(index).get('typeOfResponse').value === 3) {
        const correctAnswerFC = question.get('answers').get('correctAnswer') as FormControl;
        correctAnswerFC.clearValidators();
        correctAnswerFC.updateValueAndValidity();
        const optionFC = question.get('answers').get('options').get('0').get('option') as FormControl;
        optionFC.clearValidators();
        optionFC.updateValueAndValidity();
      }
    }, 2000);
  }

  saveExam() {
    if (this.examFormGroup.valid && this.questionFormGroup.valid) {
      let valoracion = 0;
      this.questionFormGroup.value.questions.forEach(element => {
        // tslint:disable-next-line: radix
        valoracion = parseInt(element.assessment) + valoracion;
        console.log(valoracion);
      });

      if (valoracion === 100) {
        this.examFormGroup.controls.id.setValue(this.idExamen);
        this.service.postExam(this.examFormGroup.value).subscribe(success => {
          const exam = success;
          this.contOption = this.getOption();
          this.saveNote(exam.id);
          this.saveQuestion(exam.id, this.contOption);
        }, error => {
          console.error(error);
        });
      } else {
        this.openAlerta();
      }
    }
    console.log(this.questionFormGroup.valid);
  }

  openAlerta() {
    this.alerta.open('La valoracion del examen debe sumar 100', null, {
      duration: 2000,
    });
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
      if (element.answers.correctAnswer.length > 1) {
        let correctAnswers = '';
        element.answers.correctAnswer.forEach(option => {
          correctAnswers = correctAnswers + option + ',';
        });
        this.questionModel.correctAnswer = correctAnswers;
      } else {
        this.questionModel.correctAnswer = element.answers.correctAnswer;
      }
      this.questionModel.exam = idExam;
      this.service.postQuestion(this.questionModel).subscribe(success => {
        const quest = success;
        if (quest.typeOfResponse !== 3) {
          idOpt = this.saveOption(quest.id, element.answers, idOpt);
        }
      });
    });
  }

  saveOption(idOption: number, item: any, index: number): any {
    item.options.forEach(answer => {
      index = index + 1;
      this.answerModel.id = index;
      this.answerModel.options = answer.option;
      this.answerModel.question = idOption;
      this.service.postOption(this.answerModel).subscribe(success => {
      });
    });
    return index;
  }

  saveNote(idExam: number) {
    this.noteModel.id = this.idNote;
    this.noteModel.idTeacher = 1;
    this.noteModel.idStudent = 2;
    this.noteModel.idExam = idExam;
    this.service.postNote(this.noteModel).subscribe(success => {
      const nota = success;
      console.log(nota);
    }, error => {
      console.log(error);
    });
  }

}
