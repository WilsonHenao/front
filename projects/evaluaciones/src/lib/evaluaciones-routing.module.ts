import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesorComponent } from './profesor/profesor.component';
import { TipoUnoComponent } from './tipo-uno/tipo-uno.component';

const routes: Routes = [
  {
    path: '', component: ProfesorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }

