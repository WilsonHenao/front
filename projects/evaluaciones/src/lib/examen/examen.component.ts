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
  valuesFormArray: FormGroup;
  typeResponse: number;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this.formBuilder.group({
      descriptionQCtrl: ['', Validators.required],
      imageCtrl: ['', Validators.required],
      assessmentCtrl: ['', Validators.required],
      typesCtrl: ['']
    });
    this.questionFormGroup = this.formBuilder.group({
      questions: this.formBuilder.array([this.valuesFormArray])
    });
  }

  ngOnInit() {
    this.examFormGroup = this.formBuilder.group({
      descriptionCtrl: ['', Validators.required],
      noteCtrl: ['', Validators.required]
    });
    this.getTypes();
  }

  addQuestion() {
    const question = this.questionFormGroup.controls.questions as FormArray;
    question.push(this.formBuilder.group({
      descriptionQCtrl: ['', Validators.required],
      imageCtrl: ['', Validators.required],
      assessmentCtrl: ['', Validators.required],
      typesCtrl: ['']
    }));
  }

  getTypes() {
    this.service.getAllTypeOfResponse().subscribe(success => {
      this.tipos = success;
      console.log(success);
    }, error => {
      console.log(error);
    });
  }

  get questions(): FormArray {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  removeQuestion() {
    this.questions.removeAt(this.questions.length - 1);
  }

}
