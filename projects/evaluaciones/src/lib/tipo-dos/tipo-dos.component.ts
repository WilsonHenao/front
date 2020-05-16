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

  constructor(private formBuilder: FormBuilder) {
    this.valuesFormArray = this.formBuilder.group({
      answerCtrl: ['', Validators.required],
    });
    this.optionFormGroup = this.formBuilder.group({
      options: this.formBuilder.array([this.valuesFormArray]),
      optionCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addOption() {
    const option = this.optionFormGroup.controls.options as FormArray;
    option.push(this.formBuilder.group({
      answerCtrl: ['', Validators.required]
    }))
  }

  get options(): FormArray {
    return this.optionFormGroup.get('options') as FormArray;
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
  }
}
