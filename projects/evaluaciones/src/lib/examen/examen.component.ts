import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface Tipos {
  value:  number;
  viewValue: string;
}

@Component({
  selector: 'lib-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css'],
})
export class ExamenComponent implements OnInit {
  
  tipos: Tipos[] = [
    {value: 1, viewValue: 'Selección múltiple con única respuesta'},
    {value: 2, viewValue: 'Selección múltiple con multiple respuesta'},
    {value: 3, viewValue: 'Respuesta abierta'}
  ]

  examFormGroup: FormGroup;
  questionFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.examFormGroup = this._formBuilder.group({
      descriptionCtrl: ['', Validators.required],
      noteCtrl: ['',Validators.required]
    });
    this.questionFormGroup = this._formBuilder.group({
      descriptionQCtrl: ['', Validators.required],
      imageCtrl: ['', Validators.required],
      assessmentCtrl: ['', Validators.required]
    });
  }

}
