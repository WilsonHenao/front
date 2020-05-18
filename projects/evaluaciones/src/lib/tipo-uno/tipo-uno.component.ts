import { Component, OnInit, Output, EventEmitter, AfterViewChecked, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'lib-tipo-uno',
  templateUrl: './tipo-uno.component.html',
  styleUrls: ['./tipo-uno.component.css']
})
export class TipoUnoComponent implements OnInit, AfterViewChecked {

  @Input() indexQuestion: any;
  @Output() formStatus = new EventEmitter<any>();
  optionFormGroup: FormGroup;
  valuesFormArray: FormGroup;
  option: any;
  idOption: number;
  bandera = false;


  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this.formBuilder.group({
      options: ['', Validators.required],
    });
    this.optionFormGroup = this.formBuilder.group({
      options: this.formBuilder.array([this.valuesFormArray]),
      correctAnswer: ['', Validators.required]
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
      options: ['', Validators.required],
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
      console.log('Opcion1 ' + this.idOption);
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
      this.formStatus.emit({indexQuestion: this.indexQuestion, answers: this.optionFormGroup.value});
    } else if (!this.optionFormGroup.valid) {
      this.formStatus.emit({indexQuestion: this.indexQuestion, answers: null});
    }
  }
}
