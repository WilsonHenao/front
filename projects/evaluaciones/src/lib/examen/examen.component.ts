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

  constructor(private _formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit() {
    this.examFormGroup = this._formBuilder.group({
      descriptionCtrl: ['', Validators.required],
      noteCtrl: ['5', Validators.required]
    });
    this.questionFormGroup = this._formBuilder.group({
      questions: this._formBuilder.array([])
    });
    this.getTypes();
  }

  addQuestion() {
    const question = this.questionFormGroup.controls.questions as FormArray;
    question.push(this._formBuilder.group({
      descriptionQCtrl: ['', Validators.required],
      imageCtrl: [''],
      assessmentCtrl: ['', Validators.required]
    }))
  }

  getTypes() {
    this.service.getAllTypeOfResponse().subscribe(success => {
      this.tipos = success;
    }, error => {
      console.log(error);
    })

  }

}
