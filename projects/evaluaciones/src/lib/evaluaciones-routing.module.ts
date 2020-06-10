import { ListarExamenComponent } from './listar-examen/listar-examen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesorComponent } from './profesor/profesor.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

const routes: Routes = [
  {
    path: '', component: ProfesorComponent
  },
  {
    path: 'estudiante', component: EstudianteComponent
  },
  {
    path: 'examenes', component: ListarExamenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }

