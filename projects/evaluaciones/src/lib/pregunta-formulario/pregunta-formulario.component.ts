import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'lib-pregunta-formulario',
  templateUrl: './pregunta-formulario.component.html',
  styleUrls: ['./pregunta-formulario.component.css']
})
export class PreguntaFormularioComponent implements OnInit {
  questionFormGroup: FormGroup;
  tipos: any;
  valuesFormArray: FormGroup;

  constructor(private _formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this._formBuilder.group({
      descriptionQCtrl: ['', Validators.required],
      imageCtrl: ['', Validators.required],
      assessmentCtrl: ['', Validators.required],
      typesCtrl: ['']
    });
    this.questionFormGroup = this._formBuilder.group({
      questions: this._formBuilder.array([this.valuesFormArray])
    });
  }

  ngOnInit() {
    this.getTypes();
  }

  addQuestion() {
    const question = this.questionFormGroup.controls.questions as FormArray;
    question.push(this._formBuilder.group({
      descriptionQCtrl: ['', Validators.required],
      imageCtrl: ['', Validators.required],
      assessmentCtrl: ['', Validators.required],
      typesCtrl: ['']
    }))
  }

  getTypes() {
    this.service.getAllTypeOfResponse().subscribe(success => {
      this.tipos = success;
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

}
