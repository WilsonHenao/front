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
  valuesFormArray: FormGroup;
  typeResponse: number;
  idExamen: number;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this.formBuilder.group({
      description: ['', Validators.required],
      image: ['', Validators.required],
      assessment: ['', Validators.required],
      typeOfResponse: ['']
    });
    this.questionFormGroup = this.formBuilder.group({
      questions: this.formBuilder.array([this.valuesFormArray])
    });
  }

  ngOnInit() {
    this.examFormGroup = this.formBuilder.group({
      id: this.idExamen + 1,
      introduction: ['', Validators.required],
      maximumNote: ['', Validators.required]
    });
    this.getTypes();
    this.getExam();
  }

  addQuestion() {
    const question = this.questionFormGroup.controls.questions as FormArray;
    question.push(this.formBuilder.group({
      description: ['', Validators.required],
      image: ['', Validators.required],
      assessment: ['', Validators.required],
      typeOfResponse: ['']
    }));
  }

  getTypes() {
    this.service.getAllTypeOfResponse().subscribe(success => {
      this.tipos = success;
    }, error => {
      console.log(error);
    });
  }

  getExam(): void {
    this.service.getAllExam().subscribe(success => {
      this.examen = success;
      this.idExamen = this.examen.length;
      console.log(this.idExamen);
      return this.idExamen as number;
    }, error => {
      console.log(error);
    })
  }

  get questions(): FormArray {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  removeQuestion() {
    this.questions.removeAt(this.questions.length - 1);
  }

  saveExam() {
    if (this.examFormGroup.valid) {
      this.service.postExam(this.examFormGroup.value).subscribe(success => {
        console.log(success);
      }, error => {
        console.error(error);
      });
    }
  }

}
