import { Component, OnInit, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'lib-tipo-dos',
  templateUrl: './tipo-dos.component.html',
  styleUrls: ['./tipo-dos.component.css']
})
export class TipoDosComponent implements OnInit, AfterViewChecked {

  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;
  option: any;
  idOption: number;

  @Output()
  formStatus = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this.formBuilder.group({
      options: ['', Validators.required],
    });
    this.optionFormGroup = this.formBuilder.group({
      id: '',
      options: this.formBuilder.array([this.valuesFormArray]),
      correctAnswer: ['', Validators.required],
      question: ''
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.onFormStatus();
  }

  addOption() {
    const option = this.optionFormGroup.controls.options as FormArray;
    option.push(this.formBuilder.group({
      options: ['', Validators.required]
    }));
  }

  get options(): FormArray {
    return this.optionFormGroup.get('options') as FormArray;
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
  }

  getOption() {
    this.service.getAllOptions().subscribe(success => {
      this.option = success;
      this.idOption = this.option.length + 1;
      console.log('Opcion2 ' + this.idOption);
    }, error => {
      console.log(error);
    });
  }

  saveOption() {
    if (this.optionFormGroup.valid) {
      this.optionFormGroup.controls.id.setValue(this.idOption);
      console.log(this.optionFormGroup.value);
    }
  }

  onFormStatus() {
    if (this.optionFormGroup.valid) {
      this.formStatus.emit(true);
    } else {
      this.formStatus.emit(false);
    }
  }
}
