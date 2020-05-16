import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'lib-tipo-uno',
  templateUrl: './tipo-uno.component.html',
  styleUrls: ['./tipo-uno.component.css']
})
export class TipoUnoComponent implements OnInit {

  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.valuesFormArray = this._formBuilder.group({
      answerCtrl: ['', Validators.required],
    });
    this.optionFormGroup = this._formBuilder.group({
      options: this._formBuilder.array([this.valuesFormArray]),
      optionCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addOption() {
    const option = this.optionFormGroup.controls.options as FormArray;
    option.push(this._formBuilder.group({
      answerCtrl: ['', Validators.required],
    }))
  }

  get options(): FormArray {
    return this.optionFormGroup.get('options') as FormArray;
  }

  get option(): FormArray {
    return this.optionFormGroup.get('options.answerCtrl') as FormArray;
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
  }
}
