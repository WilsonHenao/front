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
import { MatTabsModule} from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule} from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ExamenComponent } from './examen/examen.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { RealizarExamenComponent } from './realizar-examen/realizar-examen.component';
import { ListarexamenComponent } from './listarexamen/listarexamen.component';
import { ListarExamenComponent } from './listar-examen/listar-examen.component';
import { VerExamenComponent } from './ver-examen/ver-examen.component';




@NgModule({
  declarations: [
    ExamenComponent,
    EstudianteComponent,
    ProfesorComponent,
    RealizarExamenComponent,
    ListarexamenComponent,
    ListarExamenComponent,
    VerExamenComponent
  ],
  entryComponents: [
    RealizarExamenComponent
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
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
})
export class EvaluacionesModule { }
