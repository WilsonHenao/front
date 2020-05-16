import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'lib-tipo-dos',
  templateUrl: './tipo-dos.component.html',
  styleUrls: ['./tipo-dos.component.css']
})
export class TipoDosComponent implements OnInit {

  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.valuesFormArray = this._formBuilder.group({
      answerCtrl: ['', Validators.required],
      optionCtrl: ['']
    });
    this.optionFormGroup = this._formBuilder.group({
      options: this._formBuilder.array([this.valuesFormArray])
    });
  }

  ngOnInit(): void {
  }

  addOption() {
    const option = this.optionFormGroup.controls.options as FormArray;
    option.push(this._formBuilder.group({
      answerCtrl: ['', Validators.required],
      optionCtrl: ['', Validators.required]
    }))
  }

  get options(): FormArray {
    return this.optionFormGroup.get('options') as FormArray;
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
  }
}
