import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamenComponent } from './examen/examen.component';
import { ProfesorComponent } from './profesor/profesor.component';


const routes: Routes = [
  {
    path: 'examen', component: ExamenComponent
  },
  {
    path: '', component: ProfesorComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }

