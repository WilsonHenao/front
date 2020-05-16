import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-examen-formulario',
  templateUrl: './examen-formulario.component.html',
  styleUrls: ['./examen-formulario.component.css']
})
export class ExamenFormularioComponent implements OnInit {

  examFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.examFormGroup = this._formBuilder.group({
      descriptionCtrl: ['', Validators.required],
      noteCtrl: ['', Validators.required]
    });
  }

}
