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
  bandera = false;


  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    this.valuesFormArray = this.formBuilder.group({
      options: ['', Validators.required],
    });
    this.optionFormGroup = this.formBuilder.group({
      options: this.formBuilder.array([this.valuesFormArray]),
      correctAnswer: [[], Validators.required]
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
      options: ['', Validators.required],
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
      this.formStatus.emit({ indexQuestion: this.indexQuestion, answers: this.optionFormGroup.value });
    } else if (!this.optionFormGroup.valid) {
      this.formStatus.emit({ indexQuestion: this.indexQuestion, answers: null });
    }
  }
}
