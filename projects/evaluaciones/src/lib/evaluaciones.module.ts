import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionesRoutingModule } from './evaluaciones-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { ExamenComponent } from './examen/examen.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { TipoUnoComponent } from './tipo-uno/tipo-uno.component';
import { TipoDosComponent } from './tipo-dos/tipo-dos.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    ExamenComponent,
    EstudianteComponent,
    ProfesorComponent,
    TipoUnoComponent,
    TipoDosComponent
  ],
  imports: [
    CommonModule,
    EvaluacionesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule
  ]
})
export class EvaluacionesModule { }
