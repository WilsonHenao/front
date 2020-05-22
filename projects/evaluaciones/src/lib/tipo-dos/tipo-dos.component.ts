import { Component, OnInit, EventEmitter, Output, AfterViewChecked, Input } from '@angular/core';
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
  bandera = false;

  @Output()
  formStatus = new EventEmitter<any>();

  @Input() indexQuestion: any;

  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this.formBuilder.group({
      options: ['', Validators.required],
    });
    this.optionFormGroup = this.formBuilder.group({
      id: '',
      options: this.formBuilder.array([this.valuesFormArray]),
      correctAnswer: [[], Validators.required],
      question: ''
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.onFormStatus();
    }, 5000);
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

  onFormStatus() {
    if (this.optionFormGroup.valid) {
      if(this.optionFormGroup.value.correctAnswer.length > 1){
        let correctAnswer = '';
        this.optionFormGroup.value.correctAnswer.forEach(option => {
          correctAnswer = correctAnswer + option + ',';
        });
        this.optionFormGroup.value.correctAnswer = correctAnswer;
        this.formStatus.emit({ indexQuestion: this.indexQuestion, answers: this.optionFormGroup.value });
      }
      this.formStatus.emit({ indexQuestion: this.indexQuestion, answers: this.optionFormGroup.value });
    } else if (!this.optionFormGroup.valid) {
      this.formStatus.emit({ indexQuestion: this.indexQuestion, answers: null });
    }
  }
}
